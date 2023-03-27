<!-- /costume -->
<script>
	async function getAllCostume() {
		const res = await fetch('/api/costume', {});
		const { costumes } = await res.json();
		return costumes;
	}
</script>

<h1>Costume to display (click for info)</h1>

{#await getAllCostume()}
	<p>Loading ...</p>
{:then costumes}
	<ul>
		{#each costumes as costume}
			<li><a href="/costume/{costume._id}">Trang phục {costume.name}</a></li>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}
