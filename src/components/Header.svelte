<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { tokenStore } from 'base/util/stored.js';
	import { decode } from 'base/util/token';
	import { onMount } from 'svelte';

	let token = '',
		user;
	onMount(() => {
		tokenStore.set(localStorage.getItem('token'));
		tokenStore.subscribe((val) => {
			token = val;
			if (token) {
				user = decode(token);
			}
		});
	});

	function logout() {
		tokenStore.set(null);
		localStorage.removeItem('token');
		window.location.href = '/';
	}
</script>

<nav class="border-x-2 text-white flex flex-row justify-between px-3 py-5">
	<ul class="flex flex-row space-x-5 ml-6">
		<li class="logo">
			<img src="/logo.png" alt="logo" width="60px" />
		</li>
		<li class:active={$page.url.pathname === '/'} class="navigate-link">
			<a href="/">Trang chủ</a>
		</li>
		<li class:active={$page.url.pathname.startsWith('/admin')} class="navigate-link">
			<a href="/admin/costume">Admin</a>
		</li>
		<li class:active={$page.url.pathname === '/costume'} class="navigate-link">
			<a href="/costume">Trang phục</a>
		</li>
		<li class:active={$page.url.pathname === '/about'} class="navigate-link">
			<a href="/about">Về chúng tôi</a>
		</li>
	</ul>
	{#if !token}
		<a href="/login" class="mr-6 mt-1 py-1 px-3 bg-white text-black rounded-md">Login</a>
	{:else}
		<div class="h-0 flex flex-row space-x-5 mr-6">
			<div>
				<p class="my-0">Chao xìn, {user.username}</p>
				<small>Signed in as {user.role}</small>
			</div>
			<button class="h-10 w-20 bg-white text-black rounded-md" on:click={logout}>Logout</button>
		</div>
	{/if}
</nav>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	nav {
		border: none;
		background-color: #12181b;
	}

	.navigate-link {
		@apply py-2 px-4;
		vertical-align: middle;
	}

	.navigate-link a {
		text-decoration: none;
	}
	.navigate-link:hover {
		@apply bg-slate-100 text-gray-800 rounded-md;
	}
</style>
