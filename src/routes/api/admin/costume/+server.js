// @ts-nocheck
import { json } from '@sveltejs/kit';
import { verify } from '$lib/server/token.js';
import Costume from 'base/models/Costume';
import { JWT_SECRET } from '$env/static/private';
/**
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}
	const req = await request.json();
	if (!req.name || !req.qr_image) {
		return json({ status: 400, err: 'Thiếu thông tin' });
	}

	const data = {
		name: req.name,
		description: req.description || 'Không có mô tả',
		qr: 'string',
		url_3d: ''
	};
	const newCostume = await Costume.create(data);
	return json({ status: 200, data: newCostume });
}
