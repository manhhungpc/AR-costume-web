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
		<img src="/Banner.png" alt="AR Traditional Costume" class="main-img" />
	</div>
	<a href="/costume" class="cta-button">
		Khám phá ngay &nbsp;
		<i class="fa-solid fa-arrow-right-to-bracket" />
	</a>
</div>
<h1 class="name">Một số trang phục nổi bật</h1>
<section class="featured-costume">
	<img src="/Ao_giao_linh.jpg" alt="Tên trang phục" class="costume-img" />
	<div class="featured-costume-details">
		<div class="featured-costume-name">Áo giao lĩnh</div>
		<div class="featured-costume-label">Mô tả trang phục:</div>
		<div class="featured-costume-description">
			Áo giao lĩnh là loại áo vạt chéo, buộc vạt bên phải vốn phổ biến ở Châu Á. Đây là loại áo cổ
			xưa và được trọng nhất trong lễ tiết Á Đông. Cổn Miện – phục sức cao nhất của bậc đế vương,
			chỉ được dùng trong những dịp tế trời luôn là dạng giao lĩnh vì tuân theo Chu Lễ. Ở Việt Nam
			hình ảnh áo giao lĩnh xưa nhất được tìm thấy trên tượng A Di Đà thời Lý tại chùa Phật Tích.
			Vào thời Lê Trung Hưng thế kỷ 17 và 18, tranh và tượng thể hiện các tầng lớp dân cư mặc giao
			lĩnh còn lại khá nhiều
		</div>
	</div>
</section>
<section class="featured-costume">
	<div class="featured-costume-details">
		<div class="featured-costume-name">Áo tứ thân</div>
		<div class="featured-costume-label">Mô tả trang phục</div>
		<div class="featured-costume-description">
			Áo tứ thân (hay còn gọi là áo tứ linh) là một loại trang phục truyền thống của người Việt Nam,
			được sử dụng từ thế kỷ 19 và đến nay vẫn còn tồn tại và được mặc trong các dịp đặc biệt.<br
			/><br />Áo tứ thân bao gồm 4 phần chính: áo ngực, áo lửng, váy xòe và khăn đầu. Vải được dùng
			để làm áo tứ thân thường là vải lụa, nhung, gấm hoặc vải tơ tằm với các họa tiết phong phú, đa
			dạng.
			<br /><br />Trước đây, áo tứ thân được mặc chủ yếu bởi phụ nữ quý tộc hoặc những người có thân
			phận quan lại. Tuy nhiên, hiện nay, áo tứ thân đã trở thành một trang phục phổ biến trong các
			dịp lễ hội, đám cưới hoặc các sự kiện văn hóa.
		</div>
	</div>
	<img src="/Ao_tu_than.jpg" alt="Tên trang phục" class="costume-img" />
</section>
<div class="subscribe-form">
	<input class="subscribe-input" placeholder="Nhập lời nhắn cho đội dev để subscribe" />
	<button type="button" class="subscribe-btn" on:click={() => goto('/giveusastar_thankiu')}>
		Subscribe
	</button>
</div>

<style>
	.container {
		align-items: center;
		height: 90dvh;
		padding: 2rem;
		text-align: center;
		margin-bottom: 5rem;
	}

	.name {
		font-size: 2rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		color: #cacaca;
	}

	.image-container {
		margin-bottom: 2rem;
		height: 60dvh;
		display: flex;
		justify-content: center;
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

	.featured-costume-label {
		font-size: 1rem;
		margin-bottom: 1rem;
		color: #777;
	}

	.featured-costume-description {
		font-size: 1rem;
		color: #cacaca;
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
