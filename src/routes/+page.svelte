<script>
	import { goto } from '$app/navigation';

	let costumeImgSrc =
		'https://imageio.forbes.com/specials-images/dam/imageserve/1126094461/960x0.jpg?format=jpg&width=960';
</script>

<div class="container">
	<div class="name">Trang web AR về trang phục truyền thống</div>
	<div class="description">
		Trải nghiệm sự kỳ diệu của Thực tại ảo tăng cường với trang phục truyền thống từ khắp nơi trên
		Việt Nam
	</div>
	<div class="image-container">
		<img
			src="https://imageio.forbes.com/specials-images/dam/imageserve/1126094461/960x0.jpg?format=jpg&width=960"
			alt="AR Traditional Costume"
			class="carousel-img"
		/>
	</div>
	<a href="/costume" class="cta-button">
		Khám phá ngay &nbsp;
		<i class="fa-solid fa-arrow-right-to-bracket" />
	</a>
</div>
<section id="featured-costume" class="featured-costume">
	<img src={costumeImgSrc} alt="Tên trang phục" class="costume-img" />
	<div class="featured-costume-details">
		<div class="featured-costume-name">Tên trang phục</div>
		<div class="featured-costume-country">Mô tả trang phục</div>
		<div class="featured-costume-description">
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est illum, sed saepe excepturi ab
			architecto temporibus tenetur provident asperiores at distinctio, unde dignissimos maiores
			numquam, similique dolor officiis quidem aut!
		</div>
	</div>
</section>
<div class="subscribe-form">
	<input class="subscribe-input" placeholder="Nhập lời nhắn cho đội dev để subscribe" />
	<button type="button" class="subscribe-btn" on:click={() => goto('/giveusastar_thankiu')}>
		Subscribe
	</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 90dvh;
		padding: 2rem;
		text-align: center;
	}

	.name {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		color: #777;
	}

	.image-container {
		margin-bottom: 2rem;
	}

	.cta-button {
		display: inline-block;
		padding: 1rem 2rem;
		background-color: #007bff;
		color: #fff;
		font-size: 1rem;
		text-align: center;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s ease;
	}

	.cta-button:hover {
		background-color: #0056b3;
	}

	.featured-costume {
		max-width: 800px;
		margin: 3rem auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.costume-img {
		width: 300px;
		height: 400px;
		object-fit: cover;
		margin-right: 2rem;
		border-radius: 4px;
	}

	.featured-costume-details {
		flex: 1;
		text-align: left;
	}

	.featured-costume-name {
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.featured-costume-country {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: #777;
	}

	.featured-costume-description {
		font-size: 1rem;
		color: #444;
	}

	.subscribe-form {
		max-width: 600px;
		margin: 2rem auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.subscribe-input {
		flex: 1;
		padding: 0.7rem 1rem;
		font-size: 1rem;
		border: 1px solid #444654;
		border-radius: 4px 0 0 4px;
		width: 330px;
		outline: none;
	}

	.subscribe-btn {
		cursor: pointer;
		padding: 0.75rem 1rem;
		background-color: #007bff;
		color: #fff;
		font-size: 1rem;
		text-align: center;
		text-decoration: none;
		border: none;
		border-radius: 0 4px 4px 0;
		transition: background-color 0.3s ease;
		outline: none;
	}

	.subscribe-btn:hover {
		background-color: #0056b3;
	}
</style>
