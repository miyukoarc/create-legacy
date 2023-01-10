/**
 * @description 深拷贝
 * @param obj
 * @returns
 */
export function deepClone(obj: any) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags: Array<string> = [];
    if (obj.global) {
      flags.push('g');
    }
    if (obj.multiline) {
      flags.push('m');
    }
    if (obj.ignoreCase) {
      flags.push('i');
    }

    return new RegExp(obj.source, flags.join(''));
  }

  const result = Array.isArray(obj)
    ? []
    : obj.constructor
    ? new obj.constructor()
    : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

/**
 * @description 生成随机id
 * @returns
 */
export function uniqueId() {
  return Math.random().toString(36).slice(2, 10);
}

/**
 *
 * @param list 数组(树形)
 * @param callback 回调函数
 * @param target 目标深度
 * @param deep 起始深度，默认从0开始
 */
export const flatByDeep = (
  list: Array<any>,
  callback: (...args: any) => any,
  target: number,
  deep = 0
): Array<any> => {
  return list.reduce((sum, curr) => {
    return sum.concat(
      target == deep
        ? callback({ ...curr })
        : Array.isArray(curr.children)
        ? flatByDeep(curr.children, callback, target, deep + 1)
        : []
    );
  }, []);
};

/* eslint-disable */
export function filterTree(
  tree: Array<any> = [],
  validate: Function,
  callback: Function,
  parentNode: any = null,
  arr: Array<any> = [],
  deep: number = 0
) {
  if (!tree.length) return [];
  for (const item of tree) {
    if (!validate.apply(null, [item, parentNode])) continue;
    const node = {
      ...callback({ ...item }, parentNode, deep),
      children: [],
    };
    arr.push(node);
    if (item.children && item.children.length)
      filterTree(
        item.children,
        validate,
        callback,
        item,
        node.children,
        deep + 1
      );
  }
  return arr;
}
