<script>
	import { stored } from 'base/util/stored.js';
	import { decode } from 'base/util/token.js';

	/**
	 * @type {string}
	 */
	let token;
	stored.subscribe((val) => (token = val));
</script>

{#if token}
	<main>
		<slot />
	</main>
{:else}
	<h1>No permission!</h1>
{/if}

<style>
	main {
		min-height: 75vh;
	}
</style>
