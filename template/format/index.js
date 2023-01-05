import { stringify } from 'javascript-stringify'

import * as editorconfigs from './editorconfigs.js'

import prettierrcs from './prettierrcs.cjs'
import versionMap from './versionMap.cjs'

const CREATE_ALIAS_SETTING_PLACEHOLDER = 'CREATE_ALIAS_SETTING_PLACEHOLDER'
export { CREATE_ALIAS_SETTING_PLACEHOLDER }

function stringifyJS(value, styleGuide) {
  // eslint-disable-next-line no-shadow
  const result = stringify(
    value,
    (val, indent, stringify, key) => {
      if (key === 'CREATE_ALIAS_SETTING_PLACEHOLDER') {
        return `(${stringify(val)})`
      }
      return stringify(val)
    },
    2
  )

  return result.replace(
    'CREATE_ALIAS_SETTING_PLACEHOLDER: ',
    `...require('@vue/eslint-config-${styleGuide}/createAliasSetting')`
  )
}

const isObject = (val) => val && typeof val === 'object'
const mergeArrayWithDedupe = (a, b) => Array.from(new Set([...a, ...b]))

/**
 * Recursively merge the content of the new object to the existing one
 * @param {Object} target the existing object
 * @param {Object} obj the new object
 */
export function deepMerge(target, obj) {
  for (const key of Object.keys(obj)) {
    const oldVal = target[key]
    const newVal = obj[key]

    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      target[key] = mergeArrayWithDedupe(oldVal, newVal)
    } else if (isObject(oldVal) && isObject(newVal)) {
      target[key] = deepMerge(oldVal, newVal)
    } else {
      target[key] = newVal
    }
  }

  return target
}

// This is also used in `create-vue`
export default function createConfig({
  vueVersion = '2.x', // '2.x' | '3.x' (TODO: 2.7 / vue-demi)

  styleGuide = 'default', // default | airbnb | standard | fline | typescript
  hasTypeScript = false, // js | ts
  needsPrettier = false, // true | false

  additionalConfig = {}, // e.g. Cypress, createAliasSetting for Airbnb, etc.
  additionalDependencies = {} // e.g. eslint-plugin-cypress
}) {
  // This is the pkg object to extend
  const pkg = { devDependencies: {} }
  const addDependency = (name) => {
    // 从基准版本映射中寻找对应版本
    pkg.devDependencies[name] = versionMap[name]
  }

  if (styleGuide !== 'fline') {
    addDependency('eslint')
    addDependency('eslint-plugin-vue')
  }

  // if ((styleGuide !== 'default' || hasTypeScript || needsPrettier) && styleGuide !== 'fline') {
  //   addDependency('@rushstack/eslint-patch')
  // }

  const language = hasTypeScript ? 'typescript' : 'javascript'

  const eslintConfig = {
    root: true,
    extends:
      styleGuide !== 'fline'
        ? [vueVersion.startsWith('2') ? 'plugin:vue/essential' : 'plugin:vue/vue3-essential']
        : []
  }
  // 添加到package.json和eslintConfig
  const addDependencyAndExtend = (name) => {
    addDependency(name)
    eslintConfig.extends.push(name)
  }

  switch (`${styleGuide}-${language}`) {
    case 'fline-javascript':
    case 'fline-typescript':
      addDependencyAndExtend('@fline/eslint-config')
      addDependencyAndExtend('@fline/eslint-config-ts')
      addDependencyAndExtend('@fline/eslint-config-vue')
      eslintConfig.rules = {
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-unused-vars': 0,
        'operator-linebreak': [0, 'before'],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': 0
      }
      eslintConfig.globals = {
        React: true,
        google: true,
        mount: true,
        mountWithRouter: true,
        shallow: true,
        shallowWithRouter: true,
        context: true,
        expect: true,
        jsdom: true,
        JSX: true
      }
      break
    case 'default-javascript':
      eslintConfig.extends.push('eslint:recommended')
      break
    case 'default-typescript':
      eslintConfig.extends.push('eslint:recommended')
      addDependencyAndExtend('@vue/eslint-config-typescript')
      break
    case 'airbnb-javascript':
    case 'standard-javascript':
      addDependencyAndExtend(`@vue/eslint-config-${styleGuide}`)
      break
    case 'airbnb-typescript':
    case 'standard-typescript':
      addDependencyAndExtend(`@vue/eslint-config-${styleGuide}-with-typescript`)
      break
    default:
      throw new Error(
        `unexpected combination of styleGuide and language: ${styleGuide}-${language}`
      )
  }

  if (needsPrettier) {
    addDependency('prettier')
    addDependencyAndExtend('@vue/eslint-config-prettier')
  }

  deepMerge(pkg.devDependencies, additionalDependencies)
  deepMerge(eslintConfig, additionalConfig)

  const files = {
    '.eslintrc.cjs': ''
  }

  if (styleGuide === 'default') {
    // Both Airbnb & Standard have already set `env: node`
    files['.eslintrc.cjs'] += '/* eslint-env node */\n'

    // Both Airbnb & Standard have already set `ecmaVersion`
    // The default in eslint-plugin-vue is 2020, which doesn't support top-level await
    eslintConfig.parserOptions = {
      ecmaVersion: 'latest'
    }
  }

  if (pkg.devDependencies['@rushstack/eslint-patch']) {
    files['.eslintrc.cjs'] += "require('@rushstack/eslint-patch/modern-module-resolution')\n\n"
  }

  // if (styleGuide !== 'fline') {
  files['.eslintrc.cjs'] += `module.exports = ${stringifyJS(eslintConfig, styleGuide)}\n`
  // }

  // .editorconfig & .prettierrc.json
  // if (editorconfigs[styleGuide]) {
  //   files['.editorconfig'] = editorconfigs[styleGuide]
  // }
  if (needsPrettier) {
    if (styleGuide === 'fline') {
      files[
        '.npmrc'
      ] = `@fline:registry=http://vuecomponents.fline88.com:4873/\n@fl:registry=http://vuecomponents.fline88.com:4873/\nregistry=https://registry.npm.taobao.org\n
      `
      files['.prettierrc.js'] = `module.exports = require('@fline/rules/prettier');`
    } else {
      // Prettier recommends an explicit configuration file to let the editor know that it's used.
      files['.prettierrc.json'] = `${prettierrcs[styleGuide]}` || '{}'
    }
  }

  return {
    pkg,
    files
  }
}
