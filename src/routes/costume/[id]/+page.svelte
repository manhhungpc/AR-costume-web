<!-- route: /costume/:id -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Carousel from 'svelte-carousel';

	let name, description, qr_image, costume_imgs, marker_img;
	let err, carousel;

	//@ts-ignore
	async function getCostumeData(id) {
		const res = await fetch(`/api/costume/${id}`, {
			method: 'GET'
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
		costume_imgs = data.costume.costumes_img;
		marker_img = data.costume.marker_img;
		console.log(name, description, qr_image, costume_imgs, marker_img);
		return data.costume;
	}
</script>

<div class="wrapper">
	{#await getCostumeData($page.params.id)}
		<p>Đang lấy trang phục ...</p>
	{:then costume}
		<h1 class="title_costume">Trang phục: {costume.name}</h1>

		<div class="costume_info">
			<div>
				<div class="tag">
					<span class="tag-text">Tên:</span>
					<span>{name}</span>
				</div>
				<div class="tag">
					<p class="tag-text">Thông tin trang phục:</p>
					<span>{description}</span>
				</div>

				<p class="tag">Một số hình ảnh về trang phục được hiển thị bên cạnh</p>
			</div>
			<div>
				<div class="costume_image">
					<Carousel autoplay autoplayDuration={4000}>
						{#each costume_imgs as img}
							{#if img}
								<img src={img} alt="Costume" width="300px" />
							{/if}
						{/each}
					</Carousel>
				</div>
			</div>
		</div>
		<hr />
		<div class="image_qr_marker">
			<div>
				<p for="qr_image" class="tag tag-text">Quét QR để xem:</p>
				{#if qr_image}
					<img src={qr_image} alt="QR" width="300px" />
				{/if}
			</div>
			<div>
				<p class="tag tag-text">Marker (đưa camera sau khi quét QR vào đây):</p>
				{#if marker_img}
					<img src={marker_img} alt="Marker" width="300px" />
				{/if}
			</div>
		</div>
	{/await}
</div>

<style>
	.wrapper {
		width: 65vw;
	}
	.title_costume {
		font-size: 2rem;
		margin-bottom: 2rem;
	}
	.costume_image {
		width: 30vw;
	}
	.image_qr_marker {
		display: flex;
		justify-content: space-evenly;
		margin-top: 30px;
	}
	.costume_info {
		display: flex;
		justify-content: space-between;
	}
	.tag {
		margin-bottom: 20px;
	}
	.tag-text {
		color: #52d273;
	}
</style>
