<!-- route: /admin/costume -->
<script>
	// @ts-nocheck
	import { stored } from 'base/util/stored.js';
	import { convertToBase64 } from 'base/util/base64.js';

	let name, description, qr_image, err;
	let token,
		loadData,
		loading = false;
	stored.subscribe((val) => (token = val));

	loadData = getAllCostume();

	async function getAllCostume() {
		const res = await fetch('/api/admin/costume', {
			headers: {
				'content-type': 'application/json',
				authorization: 'Bearer ' + token
			}
		});
		const { costumes } = await res.json();
		return costumes;
	}

	function uploadQrLocal(e) {
		convertToBase64(e, (response) => {
			if (response.err) {
				err = response.err;
				return;
			}
			err = null;
			qr_image = response;
		});
	}

	async function createNewCostume() {
		loading = true;
		if (!name || !description || !qr_image || err) {
			err = 'Có thông tin bị bỏ trống!';
			return;
		}
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

		// console.log(await res.json());
		loading = false;
		loadData = getAllCostume();
	}
</script>

<h1 class="text-4xl">Trang dành cho admin</h1>
<hr />
<h3 class="text-2xl mt-3">Thêm trang phục mới</h3>
<div id="new-costume-form">
	<input class="text-input" placeholder="Tên trang phục" bind:value={name} required />
	<input class="text-input" placeholder="Mô tả về trang phục" bind:value={description} required />
	<div>
		<label for="qr_image">Hình ảnh mã QR: </label>
		<input id="qr_image" type="file" accept="image/*" on:change={uploadQrLocal} required />
	</div>
	{#if qr_image}
		<img src={qr_image} alt="QR" width="300px" />
	{/if}
	{#if loading}
		<p>Creating ...</p>
	{/if}
	<div class="my-3">
		<i class="fa-solid fa-arrow-up-right-from-square" />
		<a href="https://studio.armedia.it/login" class="costume-link">Vào chỉnh sửa hoặc tạo model</a>
	</div>
	{#if err}
		<p class="text-red-600">Lỗi: {err}</p>
	{/if}
	<button on:click={createNewCostume}>Create new costume</button>
</div>
<hr />
<h3 class="text-2xl mt-3">Danh sách trang phục hiển thị, ấn vào để chỉnh sửa hoặc xem chi tiết</h3>
{#await loadData}
	<p>Loading ...</p>
{:then costumes}
	<ul>
		{#each costumes as costume}
			<li class="my-3">
				<i class="fa-solid fa-arrow-right-to-bracket" />
				<a href="/admin/costume/{costume._id}" class="costume-link">Trang phục {costume.name}</a>
			</li>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	#new-costume-form {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
	}
	.text-input {
		@apply my-1 rounded;
		border: 1px solid #444654;
		width: 30%;
		height: 35px;
	}
	button {
		@apply bg-lime-400 p-3 w-max my-4;
		border-radius: 8px;
	}
	.costume-link {
		box-shadow: inset 0 0 0 0 rgb(163, 230, 53);
		color: #000;
		margin: 0 -0.25rem;
		padding: 0 0.25rem;
		transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
	}
	.costume-link:hover {
		@apply py-2;
		box-shadow: inset 300px 0 0 0 rgb(163, 230, 53);
		color: #000;
		border-radius: 8px;
	}
</style>
