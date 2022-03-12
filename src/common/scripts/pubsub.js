
import { helper } from '@scripts/helpers';

const storage = {};

export function publish (subscription, args) {

  /**
  * @method publish
  * @see /src/common/scripts/mixins/pubsub.js
  *
  * @param {String} subscription
  * @param {Array} arguments
  *
  * @description
  * Publish
  *
  *	import { publish } from 'Mixins/pubsub';
  *	publish('what-subscription', [arg1, arg2]);
  */

  args = helper.checkIf('isArray', args, [args]);

  helper.checkIf('isArray', storage[subscription], []).forEach(callback => {

    callback.apply(null, args);

  });

}

export function subscribe (subscription, callback) {

  /**
  * @method subscribe
  * @see /src/common/scripts/mixins/pubsub.js
  *
  * @param {String} subscription
  * @param {Function} callback
  *
  * @return {Array}
  *
  * @description
  * Subscribe
  *
  *	import { subscribe } from 'Mixins/pubsub';
  *	const handler = subscribe('what-subscription', (arg1, arg2) => {
  *
  *	});
  */

  storage[subscription] = storage[subscription] || [];

  if (!storage[subscription].includes(callback)) {

    storage[subscription].push(callback);

  }

  return [subscription, callback];

}

export function unsubscribe (subscription, callback) {

  /**
  * @method unsubscribe
  * @see /src/common/scripts/mixins/pubsub.js
  *
  * @param {String|Array} subscription
  * @param {Function} callback
  *
  * @description
  * Unsubscribe
  *
  *	import { unsubscribe } from 'Mixins/pubsub';
  *	unsubscribe('what-subscription', callback); // If the callback was saved in a variable
  *	unsubscribe(handler); // If pubsub.subscribe was saved in a variable
  */

  callback = helper.isArray(subscription) ? subscription[1] : callback;
  subscription = helper.isArray(subscription) ? subscription[0] : subscription;

  if (helper.isArray(storage[subscription]) && storage[subscription].indexOf(callback) > -1) {

    storage[subscription].splice(storage[subscription].indexOf(callback), 1);

  }

}
