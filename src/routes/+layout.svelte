<script>
	import Header from 'base/components/Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<div class="mx-auto w-48 h-1 my-12 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full" />
	<footer>
		<p>
			Nhóm 6 - Chuyên đề công nghệ <br />INT3414_21_2022-2023 - UET &nbsp;
			<i class="fa-solid fa-heart" style="color: #dc2626;" />
		</p>
		<p>Trang web AR về trang phục truyền thống</p>
	</footer>
</div>

<style>
	.app {
		background: linear-gradient(#12181b, #1f2635);
		background-attachment: fixed;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		width: 100%;
		min-height: 100vh;
		margin: 0 auto;
		box-sizing: border-box;
		color: #fff;
	}
	footer {
		color: #fff;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 12px;
		padding-bottom: 80px;
	}
</style>
