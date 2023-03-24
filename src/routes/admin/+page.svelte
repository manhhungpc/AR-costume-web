<!-- route: /admin/costume -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { stored } from 'base/util/stored.js';

	let name, description, qr_image;
	let token;
	stored.subscribe((val) => (token = val));

	function uploadQrImage(e) {
		const qrImage = e.target?.files?.[0];
		if (!qrImage) return;
		// URL.createObjectURL() creates a temporary URL for the image we can use as src for an img tag
		qr_image = URL.createObjectURL(qrImage);
	}

	async function createNewCostume() {
		const res = await fetch('/api/admin/costume', {
			method: 'POST',
			body: JSON.stringify({
				name,
				description,
				qr_image
			}),
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});

		console.log(await res.json());
	}
</script>

<h1>Admin page, required login</h1>
<div id="new-costume-form">
	<input placeholder="name" bind:value={name} />
	<input placeholder="description" bind:value={description} />
	<div>
		<label for="qr_image">QR image: </label>
		<input id="qr_image" type="file" accept="image/*" on:change={uploadQrImage} />
	</div>
	{#if qr_image}
		<img src={qr_image} alt="QR" />
	{/if}
	<button on:click={createNewCostume}>Create new costume</button>
</div>
<h3>Edit costume:</h3>
<ul>
	<li><a href="admin/costume/c1">Costume 1</a></li>
	<li><a href="admin/costume/c2">Costume 2</a></li>
	<li><a href="admin/costume/c3">Costume 3</a></li>
	<li><a href="admin/costume/c4">Costume 4</a></li>
</ul>

<style>
	#new-costume-form {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
