<!-- /costume -->
<script>
	async function getAllCostume() {
		const res = await fetch('/api/costume', {});
		const { costumes } = await res.json();
		return costumes;
	}
</script>

<div class="wrapper">
	<h1 class="text-4xl">Trang phục để hiển thị</h1>
	{#await getAllCostume()}
		<p>Loading ...</p>
	{:then costumes}
		<ul>
			{#each costumes as costume}
				<li class="my-3">
					<i class="fa-solid fa-arrow-right-to-bracket" />
					<a href="/costume/{costume._id}" class="costume-link">Trang phục {costume.name}</a>
				</li>
			{/each}
		</ul>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</div>

<style>
	.wrapper {
		position: absolute;
		left: 2rem;
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
		border-radius: 8px;
	}
</style>
