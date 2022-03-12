
import { helper } from '@scripts/helpers';

function init (component) {

  if (component.onLoad) {

    if (document.readyState === 'loading') {

      document.addEventListener('readystatechange', event => {

        if (event.target.readyState === 'interactive') {

          component.onLoad(document.querySelectorAll(component.selector));

        }

      });

    } else {

      component.onLoad(document.querySelectorAll(component.selector));

    }

  }

}

class Component {

  constructor (name, params) {

    if (!helper.isNotEmptyString(name)) {

      return;

    }

    this.name     = name;
    this.selector = '.'+name;
    this.onLoad = helper.checkIf('isFunction', params.onLoad, null);

    // Add all other properties to the block
    Object.keys(params).forEach(key => {

      if (helper.isUndefined(this[key])) {

        this[key] = params[key];

      }

    });

    init(this);

  }
}

export default (name, params) => {

  return new Component(name, params);

};
