/**
 * 设置localStorage
 * @param key
 */
export function getLocalStorage (key) {
  let value = window.localStorage.getItem(key);
  if(value === undefined){
    return null;
  }
  return JSON.parse(value);
}

/**
 * 获取相对于整个文档的X坐标
 */
export function getMousePageX (e) {
  return e.pageX;
}

/**
 * 获取相对于整个文档的Y坐标
 */
export function getMousePageY (e) {
  return e.pageY;
}

/**
 * 获取localStorage
 * @param key
 * @param value
 */
export function setLocalStorage (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * getComputedStyle
 */

export function getComputedStyle () {

}

/**
 * 对象浅拷贝
 */
export function Bitwiseopy (obj) {

}

/**
 * 对象深拷贝
 */
export function MemberwiseCopy () {

}