import mongoose from 'mongoose';
import { DB_CONNECT } from '$env/static/private';

try {
	// @ts-ignore
	await mongoose.connect(DB_CONNECT);
	console.log('Connected to mongo');
} catch (err) {
	console.log(err);
}
