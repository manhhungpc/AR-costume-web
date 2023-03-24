import { model, Schema } from 'mongoose';

const costumeSchema = new Schema({
	name: String,
	description: String,
	url_3d: String,
	qr: String
});

const Costume = model('costume', costumeSchema);

export default Costume;
