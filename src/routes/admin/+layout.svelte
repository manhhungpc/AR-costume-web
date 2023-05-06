<script>
	import { goto } from '$app/navigation';
	import { tokenStore } from 'base/util/stored.js';
	import { onMount } from 'svelte';

	/**
	 * @type {string}
	 */
	let token;
	tokenStore.subscribe((val) => (token = val));
	onMount(() => {
		if (!token) {
			goto('/login');
		}
	});
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
		display: flex;
		justify-content: flex-start;
		width: 98%;
		min-height: 75vh;
	}
</style>
