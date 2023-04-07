<!-- route: /admin/costume -->
<script>
	// @ts-nocheck
	import { stored } from 'base/util/stored.js';
	import { convertToBase64 } from 'base/util/base64.js';
	import { onMount } from 'svelte';

	let name,
		description,
		qr_image,
		costumes_img = [],
		err;
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
		loadData = getAllCostume();
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

	function uploadCostumeImg(e) {
		convertToBase64(e, (response) => {
			if (response.err) {
				err = response.err;
				return;
			}
			err = null;
			costumes_img = [...costumes_img, response];
		});
	}

	function removeCostumeImage(index) {
		costumes_img.splice(index, 1);
		costumes_img = costumes_img;
	}

	$: console.log(costumes_img);
</script>

<div class="wrapper">
	<h1 class="text-4xl">Trang dành cho admin</h1>
	<hr />
	<h3 class="text-2xl mt-3">Thêm trang phục mới</h3>
	<div id="new-costume-form">
		<input class="text-input" placeholder="Tên trang phục" bind:value={name} required />
		<input class="text-input" placeholder="Mô tả về trang phục" bind:value={description} required />
		<div class="upload_btn-box">
			<label class="upload_btn">
				<p>Hình ảnh mã QR &nbsp; <i class="fa-solid fa-file-arrow-up text-xl" /></p>
				<input type="file" on:change={uploadQrLocal} accept="image/*" class="costume_input" />
			</label>
		</div>
		{#if qr_image}
			<img src={qr_image} alt="QR" width="300px" />
		{/if}
		<div class="upload_btn-box">
			<label class="upload_btn">
				<p>
					Tải ảnh trang phục lên (có thể nhiều ảnh) &nbsp; <i
						class="fa-solid fa-file-arrow-up text-xl"
					/>
				</p>
				<input type="file" on:change={uploadCostumeImg} accept="image/*" class="costume_input" />
			</label>
		</div>
		<div class="costume_display">
			{#each costumes_img as base64Img, i}
				<div class="flex flex-row">
					<button class="upload-close" type="button" on:click={() => removeCostumeImage(i)}>
						<i class="fa-solid fa-xmark" />
					</button>
					<img src={base64Img} alt="Costume" class="image_uploaded" width="300px" />
				</div>
			{/each}
		</div>

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
	{#await loadData}
		<p>Đang tải danh sách trang phục ...</p>
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
</div>

<style>
	.wrapper {
		left: 2rem;
		height: 100%;
		margin-bottom: 20px;
	}
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
		width: 50%;
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
		border-radius: 20px;
	}
	.costume_input {
		opacity: 0;
		overflow: hidden;
		height: 0.1px;
		position: absolute;
	}
	.costume_display {
		display: flex;
		align-items: center;
	}
	.upload_btn {
		display: inline-block;
		font-weight: 600;
		color: #fff;
		text-align: center;
		min-width: 116px;
		padding: 5px;
		transition: all 0.3s ease;
		cursor: pointer;
		border: 2px solid;
		background-color: #4045ba;
		border-color: #4045ba;
		border-radius: 10px;
		line-height: 26px;
		font-size: 14px;
	}
	.upload_btn:hover {
		background-color: unset;
		color: #4045ba;
		transition: all 0.3s ease;
	}
	.upload_btn-box {
		margin: 10px 0;
	}
	.upload-close {
		padding: 0;
		height: 25px;
		width: 25px;
		border-radius: 50%;
		background-color: rgb(163, 230, 53);
		position: relative;
		left: 30px;
		bottom: 10px;
		z-index: 99;
		cursor: pointer;
	}
	.upload-close:hover {
		background-color: rgb(123, 178, 34);
	}

	.upload-close:hover i {
		color: #fff;
	}

	.image_uploaded {
		padding: 10px;
	}
	.image_uploaded:hover {
		@apply border-red-500 border-2;
	}
</style>
