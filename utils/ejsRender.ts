export type EjsRenderOptions = {
  needsStore: boolean
}

// 匹配形如 /*ejs-needsPinia code*/

//
// const genRegExp = (param: string) => new RegExp(`(?<=\\/\\*ejs-${param})\\\S+(?=\\*\\/)`)
// TODO 细化配置
export const ejsRender = () => {}
