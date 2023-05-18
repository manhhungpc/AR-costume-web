<!-- route: /admin/costume/:id -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { tokenStore } from 'base/util/stored.js';
	import { goto } from '$app/navigation';
	import AdminForm from 'base/components/AdminForm.svelte';

	let name,
		description,
		costumes_img = [],
		qr_image,
		marker_image;
	let token, err;
	tokenStore.subscribe((val) => (token = val));

	async function getCostumeData(id) {
		const res = await fetch(`/api/admin/costume/${id}`, {
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});
		const data = await res.json();
		console.log(data);
		if (data.err) {
			err = data.err;
			return;
		}
		name = data.costume.name;
		description = data.costume.description;
		qr_image = data.costume.qr;
		costumes_img = data.costume.costumes_img;
		marker_image = data.costume.marker_img;
		return data.costume;
	}

	async function updateCostume(id) {
		console.log(costumes_img);
		const res = await fetch(`/api/admin/costume/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				name,
				description,
				qr_image,
				costumes_img
			}),
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});

		console.log(await res.json());
		goto('/admin/costume');
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
			<AdminForm bind:name bind:description bind:qr_image bind:marker_image bind:costumes_img />
			<div class="p-1">
				<button on:click={updateCostume($page.params.id)}>Cập nhật trang phục</button>
				<button on:click={deleteCostume($page.params.id)}>Xóa trang phục này</button>
			</div>
		{/if}
	{/await}
</div>

<style>
	.wrapper {
		position: relative;
		left: 1rem;
	}
	button {
		@apply bg-lime-400 p-2 w-max my-4 mx-2;
		border-radius: 8px;
	}
</style>
