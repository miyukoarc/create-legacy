#!/usr/bin/env node

import * as fs from 'node:fs'
import * as path from 'node:path'

import minimist from 'minimist'
import prompts from 'prompts'
import { red, green, bold } from 'kolorist'

import renderTemplate from './utils/renderTemplate'
import { postOrderDirectoryTraverse, preOrderDirectoryTraverse } from './utils/directoryTraverse'
import generateReadme from './utils/generateReadme'
import getCommand from './utils/getCommand'
import renderEslint from './utils/renderEslint'
import banner from './utils/banner'

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function canSkipEmptying(dir: string) {
  if (!fs.existsSync(dir)) {
    return true
  }

  const files = fs.readdirSync(dir)
  if (files.length === 0) {
    return true
  }
  if (files.length === 1 && files[0] === '.git') {
    return true
  }

  return false
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }

  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  )
}

async function init() {
  console.log(`\n${banner}\n`)

  const cwd = process.cwd()
  // possible options:
  // --complicated
  // --default
  // --typescript / --ts
  // --jsx
  // --router / --vue-router
  // --pinia
  // --with-tests / --tests (equals to `--vitest --cypress`)
  // --vitest
  // --cypress
  // --playwright
  // --eslint
  // --eslint-with-prettier (only support prettier through eslint for simplicity)
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ['ts'],
      'with-tests': ['tests'],
      router: ['vue-router']
    },
    // all arguments are treated as booleans
    boolean: true
  })

  // if any of the feature flags is set, we would skip the feature prompts
  const isFeatureFlagsUsed =
    typeof (
      argv.default ??
      argv.ts ??
      argv.jsx ??
      argv.router ??
      argv.pinia ??
      argv.complex ??
      // argv.tests ??
      // argv.vitest ??
      // argv.cypress ??
      argv.playwright ??
      argv.eslint
    ) === 'boolean'

  let targetDir = argv._[0]
  const defaultProjectName = !targetDir ? 'vue-project' : targetDir

  const forceOverwrite = argv.force

  let result: {
    projectName?: string
    shouldOverwrite?: boolean
    packageName?: string
    needsTypeScript?: boolean
    needsJsx?: boolean
    needsRouter?: boolean
    needsPinia?: boolean
    format?: string
    needsComplex?: boolean
    // needsVitest?: boolean
    // needsE2eTesting?: false | 'cypress' | 'playwright'
    needsEslint?: boolean
    needsPrettier?: boolean
  } = {}

  let complexTemplate = false

  try {
    // Prompts:
    // - Project name:
    //   - whether to overwrite the existing directory or not?
    //   - enter a valid package name for package.json
    // - Project language: JavaScript / TypeScript
    // - Add JSX Support?
    // - Install Vue Router for SPA development?
    // - Install Pinia for state management?
    // - Add Cypress for testing?
    // - Add Playwright for end-to-end testing?
    // - Add ESLint for code quality?
    // - Add Prettier for code formatting?
    result = await prompts(
      [
        {
          name: 'projectName',
          type: targetDir ? null : 'text',
          message: '项目名称:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSkipEmptying(targetDir) || forceOverwrite ? null : 'confirm'),
          message: () => {
            const dirForPrompt =
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`

            return `${dirForPrompt} is not empty. Remove existing files and continue?`
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values) => {
            if (values.shouldOverwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          }
        },
        {
          name: 'packageName',
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          name: 'needsComplex',
          type: () => (isFeatureFlagsUsed ? null : 'toggle'),
          message: '典型模板?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsTypeScript',
          type: (prev, values) => {
            if (isFeatureFlagsUsed || values.needsComplex) {
              return null
            }
            return 'toggle'
          },
          message: '添加TypeScript?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsJsx',
          type: (prev, values) => (isFeatureFlagsUsed || values.needsComplex ? null : 'toggle'),
          message: '添加JSX支持?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsRouter',
          type: (prev, values) => (isFeatureFlagsUsed || values.needsComplex ? null : 'toggle'),
          message: '添加Vue Router开发单页应用?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsPinia',
          type: (prev, values) => (isFeatureFlagsUsed || values.needsComplex ? null : 'toggle'),
          message: '添加Pinia作为全局状态管理?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsEslint',
          type: (prev, values) => (isFeatureFlagsUsed || values.needsComplex ? null : 'toggle'),
          message: '添加ESLint提高代码质量?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'needsPrettier',
          type: (prev, values) => {
            if (isFeatureFlagsUsed || !values.needsEslint || values.needsComplex) {
              return null
            }
            return 'toggle'
          },
          message: '添加Prettier代码格式化?',
          initial: false,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'format',
          type: (prev, values) =>
            isFeatureFlagsUsed ||
            !values.needsEslint ||
            !values.needsPrettier ||
            values.needsComplex
              ? null
              : 'select',
          message: '风格化?',
          initial: false,
          choices: (prev, answers) => [
            {
              title: 'fline',
              description: 'fline',
              value: 'fline'
            },
            {
              title: 'standard',
              description: 'standard',
              value: 'standard'
            },
            {
              title: 'airbnb',
              description: 'airbnb',
              value: 'airbnb'
            }
          ]
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const {
    projectName,
    packageName = projectName ?? defaultProjectName,
    shouldOverwrite = argv.force,
    needsJsx = argv.jsx,
    needsTypeScript = argv.typescript,
    needsRouter = argv.router,
    needsPinia = argv.pinia,
    format,
    needsComplex = argv.complex,
    // needsVitest = argv.vitest || argv.tests,
    needsEslint = argv.eslint || argv['eslint-with-prettier'],
    needsPrettier = argv['eslint-with-prettier']
  } = result

  // const { needsE2eTesting } = result
  // const needsCypress = argv.cypress || argv.tests || needsE2eTesting === 'cypress'
  // const needsCypressCT = needsCypress && !needsVitest
  // const needsPlaywright = argv.playwright /*|| needsE2eTesting === 'playwright'*/

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  console.log(`\n搭建项目于${root}...`)

  const pkg = { name: packageName, version: '0.0.0' }
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2))

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    renderTemplate(templateDir, root)
  }

  if (needsComplex) {
    // base template
    render('complex')
    // configs
    render('tsconfig/complex')
    // code template
    render('code/complex')
    // entry file
    render('entry/complex')
    // eslint & prettier
    renderEslint(root, {
      needsTypeScript: true,
      format: 'fline',
      needsPrettier: true
    })
  } else {
    // Render base template
    render('base')

    // Add configs.
    if (needsJsx) {
      render('config/jsx')
    }
    if (needsRouter) {
      render('config/router')
    }
    if (needsPinia) {
      render('config/pinia')
    }
    if (needsTypeScript) {
      render('config/typescript')
      // Render tsconfigs
      render('tsconfig/base')
    }

    // eslint配置文件渲染
    if (needsEslint) {
      renderEslint(root, {
        needsTypeScript,
        format,
        /* needsCypress, needsCypressCT ,*/ needsPrettier
      })
    }

    // Render code template.
    // prettier-ignore
    const codeTemplate =
    (needsTypeScript ? 'typescript-' : '') +
    (needsRouter ? 'router' : 'default')
    render(`code/${codeTemplate}`)

    // 渲染入口文件
    if (needsPinia && needsRouter) {
      render('entry/router-and-pinia')
    } else if (needsPinia) {
      render('entry/pinia')
    } else if (needsRouter) {
      render('entry/router')
    } else {
      render('entry/default')
    }

    // Cleanup.

    // We try to share as many files between TypeScript and JavaScript as possible.
    // If that's not possible, we put `.ts` version alongside the `.js` one in the templates.
    // So after all the templates are rendered, we need to clean up the redundant files.
    // (Currently it's only `cypress/plugin/index.ts`, but we might add more in the future.)
    // (Or, we might completely get rid of the plugins folder as Cypress 10 supports `cypress.config.ts`)

    if (needsTypeScript) {
      // Convert the JavaScript template to the TypeScript
      // Check all the remaining `.js` files:
      //   - If the corresponding TypeScript version already exists, remove the `.js` version.
      //   - Otherwise, rename the `.js` file to `.ts`
      // Remove `jsconfig.json`, because we already have tsconfig.json
      // `jsconfig.json` is not reused, because we use solution-style `tsconfig`s, which are much more complicated.
      // 部分js配置文件不需要重命名为ts文件
      const whiteList = [
        '.prettierrc.js',
        'eslintrc.js',
        'windicss.config.js',
        '.versionrc.js',
        'vite.config.js'
      ]
      preOrderDirectoryTraverse(
        root,
        () => {},
        (filepath) => {
          // 白名单存在的文件不作处理
          if (whiteList.findIndex((item) => filepath.includes(item)) < 0) {
            console.log(filepath)
            if (filepath.endsWith('.js')) {
              const tsFilePath = filepath.replace(/\.js$/, '.ts')
              if (fs.existsSync(tsFilePath)) {
                fs.unlinkSync(filepath)
              } else {
                fs.renameSync(filepath, tsFilePath)
              }
            } else if (path.basename(filepath) === 'jsconfig.json') {
              fs.unlinkSync(filepath)
            }
          }
        }
      )

      // Rename entry in `index.html`
      const indexHtmlPath = path.resolve(root, 'index.html')
      const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8')
      fs.writeFileSync(indexHtmlPath, indexHtmlContent.replace('src/main.js', 'src/main.ts'))
    } else {
      // Remove all the remaining `.ts` files
      preOrderDirectoryTraverse(
        root,
        () => {},
        (filepath) => {
          if (filepath.endsWith('.ts')) {
            fs.unlinkSync(filepath)
          }
        }
      )
    }
  }
  // Instructions:
  // Supported package managers: pnpm > yarn > npm
  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  // README generation
  fs.writeFileSync(
    path.resolve(root, 'README.md'),
    generateReadme({
      projectName: result.projectName ?? result.packageName ?? defaultProjectName,
      packageManager,
      needsTypeScript,
      // needsPlaywright,
      /*
      needsVitest,
      needsCypress,
      needsCypressCT,*/
      needsEslint
    })
  )

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  ${bold(green(`cd ${path.relative(cwd, root)}`))}`)
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'install')))}`)
  if (needsPrettier) {
    console.log(`  ${bold(green(getCommand(packageManager, 'lint')))}`)
  }
  console.log(`  ${bold(green(getCommand(packageManager, 'dev')))}`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})
