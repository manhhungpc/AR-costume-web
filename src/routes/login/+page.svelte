<script>
	// @ts-nocheck
	import { tokenStore } from 'base/util/stored.js';

	let username = '',
		password = '';
	let dataReponse;
	let token;
	tokenStore.subscribe((val) => (token = val));
	async function onLogin() {
		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		dataReponse = await res.json();
		if (dataReponse.status == 200) {
			console.log(dataReponse);
			tokenStore.set(dataReponse.token);
			localStorage.setItem('token', dataReponse.token);
			window.location.href = '/';
		}
	}
</script>

{#if token}
	Đã đăng nhập! Vui lòng refresh lại trang.
{:else}
	<div class="wrapper">
		<h1 class="header">Đăng nhập cho admin</h1>
		{#if dataReponse && dataReponse.err}
			<p>Got error: {dataReponse.err}</p>
		{/if}
		<input placeholder="Username" bind:value={username} class="text-input" />
		<input placeholder="Password" bind:value={password} class="text-input" />
		<button type="button" on:click={onLogin}>Login</button>
	</div>
{/if}

<style>
	.wrapper {
		padding-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-self: center;
		height: 50vh;
	}
	.header {
		@apply text-3xl;
	}
	.text-input {
		@apply my-1 rounded p-1;
		border: 1px solid #444654;
		color: #000;
		width: 100%;
		height: 35px;
	}
	button {
		@apply bg-lime-400 p-3 my-4;
		width: 100%;
		border-radius: 8px;
	}
</style>
