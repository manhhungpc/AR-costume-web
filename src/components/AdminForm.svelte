<script>
	// @ts-nocheck
	export let name, description, qr_image, costumes_img;
	let err;
	import { convertToBase64 } from 'base/util/base64.js';

	if (!costumes_img) {
		costumes_img = [];
	}

	function uploadQrLocal(e) {
		convertToBase64(e, (response) => {
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
</script>

<div class="wrapper-form">
	<div class="wrap-input">
		<label for="name">Tên trang phục: </label>
		<input class="text-input" placeholder="name" bind:value={name} id="name" />
	</div>
	<div class="wrap-input mb-4">
		<label for="desc">Mô tả trang phục: </label>
		<input class="text-input" placeholder="description" bind:value={description} id="desc" />
	</div>
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
</div>

<style>
	.text-input {
		@apply my-1 rounded px-2 text-black;
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
	.wrap-input {
		width: 500px;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		width: 100%;
	}
	.upload_btn {
		@apply bg-lime-400 border-lime-400;
		display: inline-block;
		font-weight: 600;
		color: #000;
		text-align: center;
		min-width: 116px;
		padding: 5px;
		transition: all 0.3s ease;
		cursor: pointer;
		border: 2px solid;
		/* background-color: #4045ba;
		border-color: #4045ba; */
		border-radius: 10px;
		line-height: 26px;
		font-size: 14px;
	}
	.upload_btn:hover {
		@apply text-lime-400;
		background-color: unset;
		/* color: #4045ba; */
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
		top: 5px;
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
