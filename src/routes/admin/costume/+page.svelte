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
			qr_image = response;
		});
		console.log(qr_image);
		// if (qr_image.err) {
		// 	console.log(err);
		// }
	}

	async function createNewCostume() {
		loading = true;
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

<h1>Admin page, required login</h1>
<div id="new-costume-form">
	<input placeholder="name" bind:value={name} />
	<input placeholder="description" bind:value={description} />
	<div>
		<label for="qr_image">QR image: </label>
		<input id="qr_image" type="file" accept="image/*" on:change={uploadQrLocal} />
	</div>
	{#if qr_image}
		<img src={qr_image} alt="QR" width="300px" />
	{/if}
	{#if err}
		<p color="#ff0000">Lỗi: {err}</p>
	{/if}
	{#if loading}
		<p>Creating ...</p>
	{/if}
	<button on:click={createNewCostume}>Create new costume</button>
	<a href="https://studio.armedia.it/login">Vào chỉnh sửa hoặc tạo model</a>
</div>
<h3>List of costume, click to view or edit</h3>
{#await loadData}
	<p>Loading ...</p>
{:then costumes}
	<ul>
		{#each costumes as costume}
			<li><a href="/admin/costume/{costume._id}">Trang phục {costume.name}</a></li>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	#new-costume-form {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
