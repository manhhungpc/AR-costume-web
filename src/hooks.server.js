import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import {
	CLOULDINARY_API_KEY,
	CLOULDINARY_API_SECRET,
	CLOULDINARY_NAME,
	DB_CONNECT
} from '$env/static/private';

try {
	// @ts-ignore
	await mongoose.connect(DB_CONNECT);
	console.log('Connected to mongo');

	cloudinary.config({
		cloud_name: CLOULDINARY_NAME,
		api_key: CLOULDINARY_API_KEY,
		api_secret: CLOULDINARY_API_SECRET
	});
} catch (err) {
	console.log(err);
}
