<!-- route: /admin/costume/:id -->
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
		const res = await fetch('/api/admin/costume/:id', {
			method: 'PUT',
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

		console.log(res.json());
	}
</script>

<h1>Costume {$page.params.id}</h1>
<input placeholder="name" bind:value={name} />
<input placeholder="description" bind:value={description} />
<div>
	<label for="qr_image">QR image: </label>
	<input id="qr_image" type="file" accept="image/*" on:change={uploadQrImage} />
</div>
{#if qr_image}
	<img src={qr_image} alt="QR" />
{/if}
<button on:click={createNewCostume}>Update costume</button>
