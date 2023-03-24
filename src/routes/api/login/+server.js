// @ts-nocheck
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import User from 'base/models/User';
import { JWT_SECRET } from '$env/static/private';
/**
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	const req = await request.json();
	const user = await User.findOne({ username: req.username });
	if (!user || req.password != user.password) {
		return json({ status: 400, err: 'Bad request' });
	}

	const token = jwt.sign(
		{
			username: user.username,
			role: user.role
		},
		JWT_SECRET,
		{ expiresIn: '30d' }
	);

	return json({ status: 200, user, token });
}
