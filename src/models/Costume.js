import { model, Schema } from 'mongoose';

const costumeSchema = new Schema({
	name: String,
	description: String,
	costumes_img: [{
		type: String
	}],
	qr: String,
	qr_gen_url: String,
	marker_img: String
});

const Costume = model('costume', costumeSchema);

export default Costume;
