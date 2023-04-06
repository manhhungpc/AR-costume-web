<!-- route: /admin/costume/:id -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { stored } from 'base/util/stored.js';
	import { convertToBase64 } from 'base/util/base64.js';
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

<div class="wrapper">
	{#await getCostumeData($page.params.id)}
		<p>Loading ...</p>
	{:then costume}
		{#if err}
			<!-- {console.log(costume)} -->
			<p>Trang phục không tồn tại</p>
		{:else}
			<h1 class="text-2xl">Chỉnh sửa trang phục {name}</h1>
			<hr />
			<div class="wrapper-form">
				<div class="wrap-input">
					<label for="name">Tên trang phục: </label>
					<input class="text-input" placeholder="name" bind:value={name} id="name" />
				</div>
				<div class="wrap-input mb-4">
					<label for="desc">Mô tả trang phục: </label>
					<input class="text-input" placeholder="description" bind:value={description} id="desc" />
				</div>
				<div class="mb-3">
					<label for="qr_image">Ảnh mã QR của trang phục: </label>
					<input id="qr_image" type="file" accept="image/*" on:change={uploadQrLocal} />
				</div>
				{#if qr_image}
					<img src={qr_image} alt="QR" width="300px" />
				{/if}
				<div>
					<button on:click={updateCostume($page.params.id)}>Update costume</button>
					<button on:click={deleteCostume($page.params.id)}>Delete costume</button>
				</div>
			</div>
		{/if}
	{/await}
</div>

<style>
	.wrapper {
		position: absolute;
		left: 2rem;
	}
	.text-input {
		@apply my-1 rounded;
		border: 1px solid #444654;
		width: 70%;
		height: 35px;
	}
	.wrapper-form {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
	}
	button {
		@apply bg-lime-400 p-2 w-max my-4 mx-2;
		border-radius: 8px;
	}
	.wrap-input {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
