<!-- route: /admin/costume/:id -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { stored } from 'base/util/stored.js';
	import { convertToBase64 } from 'base/util/base64.js';
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	let name, description, qr_image;
	let token, err;
	stored.subscribe((val) => (token = val));

	async function getCostumeData(id) {
		const res = await fetch(`/api/admin/costume/${id}`, {
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});
		const data = await res.json();
		// console.log(costume);
		if (data.err) {
			err = data.err;
			return;
		}
		name = data.costume.name;
		description = data.costume.description;
		qr_image = data.costume.qr;
		return data.costume;
	}

	function uploadQrLocal(e) {
		convertToBase64(e, (response) => {
			qr_image = response;
		});
		console.log(qr_image);
		// if (qr_image.err) {
		// 	console.log(err);
		// }
	}

	async function updateCostume(id) {
		const res = await fetch(`/api/admin/costume/${id}`, {
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

		console.log(await res.json());
	}

	async function deleteCostume(id) {
		const res = await fetch(`/api/admin/costume/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});
		const data = await res.json();
		if (data.err) {
			err = data.err;
			return;
		}
		goto('/admin/costume');
	}
</script>

{#await getCostumeData($page.params.id)}
	<p>Loading ...</p>
{:then costume}
	{#if err}
		<!-- {console.log(costume)} -->
		<p>Trang phục không tồn tại</p>
	{:else}
		<h1>Costume: {costume.name}</h1>
		<input placeholder="name" bind:value={name} />
		<input placeholder="description" bind:value={description} />
		<div>
			<label for="qr_image">QR image: </label>
			<input id="qr_image" type="file" accept="image/*" on:change={uploadQrLocal} />
		</div>
		{#if qr_image}
			<img src={qr_image} alt="QR" width="300px" />
		{/if}
		<div>
			<button on:click={updateCostume($page.params.id)}>Update costume</button>
			<button on:click={deleteCostume($page.params.id)}>Delete costume</button>
		</div>
	{/if}
{/await}
