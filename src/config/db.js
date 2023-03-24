import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env['DB_CONNECT'];

// @ts-ignore
mongoose.connect(dbURL, () => {
	console.log('Connected to mongo');
});
