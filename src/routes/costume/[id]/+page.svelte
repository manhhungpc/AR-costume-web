<!-- route: /costume/:id -->
<script>
	// @ts-nocheck
	import { page } from '$app/stores';

	let name, description, qr_image;
	let err;

	//@ts-ignore
	async function getCostumeData(id) {
		const res = await fetch(`/api/costume/${id}`, {});
		const data = await res.json();
		if (data.err) {
			err = data.err;
			return;
		}
		name = data.costume.name;
		description = data.costume.description;
		qr_image = data.costume.qr;
		return data.costume;
	}
</script>

{#await getCostumeData($page.params.id)}
	<p>Loading ...</p>
{:then costume}
	<h1>Costume: {costume.name}</h1>
	<p>Trang phục: {name}</p>
	<p>Mô tả: {description}</p>
	<div>
		<label for="qr_image">QR image: </label>
	</div>
	{#if qr_image}
		<img src={qr_image} alt="QR" width="300px" />
	{/if}
{/await}
