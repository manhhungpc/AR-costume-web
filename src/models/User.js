import { model, Schema } from 'mongoose';

const userSchema = new Schema({
	username: String,
	password: String,
	role: String
});

const User = model('user', userSchema);

export default User;
