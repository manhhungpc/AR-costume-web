<!-- route: /admin/costume -->
<script>
	// @ts-nocheck
	import { stored } from 'base/util/stored.js';
	import AdminForm from 'base/components/AdminForm.svelte';
	import ListCostume from 'base/components/ListCostume.svelte';

	let name,
		description,
		qr_image,
		costumes_img = [],
		err;
	let token,
		loadNewData,
		loading = false;
	stored.subscribe((val) => (token = val));

	async function createNewCostume() {
		if (!name || !description || !qr_image || err) {
			err = 'Có thông tin bị bỏ trống!';
			return;
		}
		loading = true;
		const res = await fetch('/api/admin/costume', {
			method: 'POST',
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

		loading = false;
		loadNewData = true;
	}
</script>

<div class="wrapper">
	<h1 class="text-4xl">Trang dành cho admin</h1>
	<hr />
	<h3 class="text-2xl mt-3">Thêm trang phục mới</h3>
	<div class="wrap-form">
		<AdminForm bind:name bind:description bind:qr_image bind:costumes_img />
		{#if loading}
			<p>Đang tạo ...</p>
		{/if}
		<div class="my-3">
			<i class="fa-solid fa-arrow-up-right-from-square" />
			<a href="https://studio.armedia.it/login" class="costume-link">Vào chỉnh sửa hoặc tạo model</a
			>
		</div>
		{#if err}
			<p class="text-red-600">Lỗi: {err}</p>
		{/if}
		<button on:click={createNewCostume}>Thêm trang phục mới</button>
	</div>
	<hr />
	<h3 class="text-2xl mt-3">
		Danh sách trang phục hiển thị, ấn vào để chỉnh sửa hoặc xem chi tiết
	</h3>
	{#key loadNewData}
		<ListCostume isAdmin={true} />
	{/key}
</div>

<style>
	.wrapper {
		left: 2rem;
		height: 100%;
		margin-bottom: 20px;
	}
	button {
		@apply bg-lime-400 p-3 w-max my-4;
		color: #000;
		border-radius: 8px;
	}
	.costume-link {
		box-shadow: inset 0 0 0 0 rgb(163, 230, 53);
		color: #fff;
		margin: 0 -0.25rem;
		padding: 0 0.25rem;
		transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	}
	.costume-link:hover {
		@apply py-2;
		box-shadow: inset 300px 0 0 0 rgb(163, 230, 53);
		color: #000;
		border-radius: 20px;
	}
</style>
