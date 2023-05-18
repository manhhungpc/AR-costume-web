<script>
	/**
	 * @type {boolean}
	 */
	export let isAdmin;
	async function getAllCostume() {
		const res = await fetch('/api/costume', {});
		const { costumes } = await res.json();
		return costumes;
	}
</script>

{#await getAllCostume()}
	<p>Loading ...</p>
{:then costumes}
	<ul class="list">
		{#each costumes as costume}
			<a href="{isAdmin ? '/admin' : ''}/costume/{costume._id}" class="costume-link">
				<li class="list-item">
					<div class="list-item-content">
						<h3 class="list-item-title">Trang phục: {costume.name}</h3>
						<p class="list-item-description">{costume.description.substr(0, 65)} ...</p>
					</div>
				</li>
			</a>
		{/each}
	</ul>
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	.list {
		width: 90vw;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
		margin: 2rem 1rem;
		list-style: none;
		padding: 0;
	}

	.list-item {
		background-color: #fff;
		border-radius: 8px;
		box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		margin: 0 1rem;
		transition: transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out;
		height: 100px;
	}

	.list-item:hover {
		transform: translateY(-5px);
		/* box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2); */
		box-shadow: inset 33vw 0 0 0 rgb(163, 230, 53);
		border-radius: 8px;
	}

	.list-item-content {
		padding: 1rem;
	}

	.list-item-title {
		margin: 0;
		font-size: 1.2rem;
		font-weight: bold;
		color: #000;
	}

	.list-item-description {
		margin: 0 0 1rem 0;
		color: #666;
		font-size: 0.8rem;
		line-height: 1.2;
	}
</style>
