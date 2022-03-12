
import global from '@scripts/global';
import { helper, hasLocalStorage } from '@scripts/helpers';

const useLocalStorage = hasLocalStorage();

export function getCache (key) {

  let returnValue = null;

  if (helper.isNotEmptyString(key) && useLocalStorage) {

    returnValue = JSON.parse(localStorage.getItem(key));

  }

  return returnValue;

}

export function setCache(key, value) {

  if (useLocalStorage && global.state.cookiesAcceptedFunctional && helper.isNotEmptyString(key) && helper.isDefined(value)) {

    localStorage.setItem(key, JSON.stringify(value));

  }

}

export function deleteCache(key) {

  if (useLocalStorage) {

    localStorage.removeItem(key);

  }

}