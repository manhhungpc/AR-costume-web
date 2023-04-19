<!-- /costume -->
<script>
	import ListCostume from 'base/components/ListCostume.svelte';
</script>

<div class="wrapper">
	<h1 class="text-4xl">Preview các trang phục hiển thị</h1>
	<ListCostume isAdmin={false} />
</div>

<style>
	.wrapper {
		position: absolute;
		left: 2rem;
	}
</style>
