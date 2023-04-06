<script>
	import { page } from '$app/stores';
</script>

<div class="corner">
	<a href="/">
		<h3>Home</h3>
	</a>
</div>

<nav>
	<!-- <svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
	</svg> -->
	<ul>
		<li class:active={$page.url.pathname === '/'}>
			<a href="/login">Login</a>
		</li>
		<li class:active={$page.url.pathname.startsWith('/admin')}>
			<a href="/admin">Admin</a>
		</li>
		<li class:active={$page.url.pathname === '/costume'}>
			<a href="/costume">Costume</a>
		</li>
		<li class:active={$page.url.pathname === '/about'}>
			<a href="/about">About</a>
		</li>
	</ul>
	<!-- <svg viewBox="0 0 2 3" aria-hidden="true">
		<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
	</svg> -->
</nav>
