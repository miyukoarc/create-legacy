import { Nullable } from '@/types/helper';

/**
 * @description 深拷贝
 * @param obj
 * @returns
 */
export function deepClone(obj) {
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

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

/**
 * @description 获取指定字段在formOption当中的index
 * @param vm
 * @param args
 * @returns
 */
export const getTableIndexMap = (vm, prop = 'formOption', ...args) => {
  const temp = {};
  for (const key of args) {
    temp[key] = vm[prop].data.findIndex((item) => item.code == key);
  }
  return temp;
};

/**
 * @description 传入index，控制相应formItem
 * @param vm
 * @param index
 * @param odd
 */
export const formControl = (vm, option = 'formOption', index, val: Record<string, any>) => {
  vm.$set(vm[option].data, index, {
    ...vm[option].data[index],
    ...val,
  });
};

/**
 * @description 防抖
 * @param fn
 * @param delay
 */
export const debounce = (fn: (...args) => any, delay = 500) => {
  let isFirst = true;
  let timer: Nullable<number> = null;

  return (...args) => {
    if (timer) {
      window.clearTimeout(timer);
      timer = null;
    }

    if (isFirst) {
      isFirst = false;
      fn(...args);
    } else {
      timer = window.setTimeout(() => {
        fn(...args);
      }, delay);
    }
  };
};
