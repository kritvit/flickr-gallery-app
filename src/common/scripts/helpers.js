
export function sanitize (input) {

  const doc = new DOMParser().parseFromString(input, 'text/html');

  return doc.body.textContent || '';

}

export function hasLocalStorage() {

  const name = 'hasLocalStorage';

  try {

    localStorage.setItem(name, name);

    localStorage.removeItem(name);

    return true;

  } catch (e) {

    return false;

  }

}

export function createElementFromHTML(htmlString) {

  const div = document.createElement('div');

  div.innerHTML = htmlString.trim();

  return div.firstChild;

}

export const helper = {
  checkIf (util, value, defaultValue) {

    util = this.isFunction(this[util]) ? this[util] : false;

    return util && util.call(this, value) ? value : defaultValue;

  },
  isArray (value) {
    return value instanceof Array;
  },
  isFunction (check) {
    return typeof check === 'function';
  },
  isNumber (value) {
    return typeof value === 'number' && !isNaN(value);
  },
  isString (value) {
    return typeof value === 'string';
  },
  isNotEmptyString (value) {
    value = 'string' === typeof value ? value.trim() : false;
    return value !== false && '' !== value;
  },
  isNotEmptyObjectLiteral (obj) {
    return obj && Object.entries(obj).length > 0 && obj.constructor === Object;
  },
  isDefined(value) {
    return typeof value !== 'undefined';
  },
  isUndefined(value) {
    return typeof value === 'undefined';
  }
};
