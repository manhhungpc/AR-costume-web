import { error } from '@sveltejs/kit';

// @ts-ignore
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	console.log('costume/:id/+page.js', params);
	if (params.id === 'c1') {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}
	if (params.id === 'c2') {
		return {
			title: 'Hello 2!',
			content: ' Lorem ipsum dolor sit amet...'
		};
	}

	throw error(404, 'Not found');
}
