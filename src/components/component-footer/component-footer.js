
import { publish } from '@scripts/pubsub';
import Component from '@scripts/Component';
import './component-footer.scss';

export default Component('component-footer', {

	onLoad () {

		const editCookiesCta = document.querySelector('.component-footer-edit-cookies');

		if (editCookiesCta) {

			editCookiesCta.addEventListener('click', () => {

				publish('component-cookies.edit');

			}, false);

		}
	}
});
