<script>
	// @ts-nocheck
	import { stored } from 'base/util/stored.js';
	import { decode } from 'base/util/token.js';
	let username = '',
		password = '';
	let dataReponse;
	let token;
	stored.subscribe((val) => (token = val));
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
			stored.set(dataReponse.token);
		}
	}

	// $: token && console.log(decode(token));
</script>

{#if token}
	<h1>Hi me</h1>
{:else}
	<h1>Login</h1>
	{#if dataReponse && dataReponse.err}
		<p>Got error: {dataReponse.err}</p>
	{/if}
	<input placeholder="username" bind:value={username} />
	<input placeholder="password" bind:value={password} />
	<button type="button" on:click={onLogin}>Login</button>
{/if}
