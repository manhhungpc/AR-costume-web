import { json, redirect } from '@sveltejs/kit';
import Costume from 'base/models/Costume';
import { verify } from '$lib/server/token.js';
import { JWT_SECRET } from '$env/static/private';
import { upload } from 'base/util/upload';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ request, params }) {
	// @ts-ignore
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}

	const costume = await Costume.findOne({ _id: params.id }).lean();

	if (!costume) return json({ status: 400, err: 'Không tồn tại trang phục' });
	return json({ status: 200, costume });
}

/**
 * @type {import('./$types').RequestHandler}
 */
export async function PUT({ request, params }) {
	const req = await request.json();

	// @ts-ignore
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}

	if (!req.name || !req.qr_image) {
		return json({ status: 400, err: 'Thiếu thông tin' });
	}

	let uploadImg;
	if (req.qr_image.toString().includes('https://res.cloudinary.com') == false) {
		const imgName = encodeURIComponent(req.name);

		uploadImg = await upload(req.qr_image, imgName);
	}

	const data = {
		name: req.name,
		description: req.description || 'Không có mô tả',
		qr: uploadImg?.secure_url,
		qr_gen_url: uploadImg?.url,
		url_3d: ''
	};
	const updatedCostume = await Costume.findByIdAndUpdate(params.id, data).lean();
	if (!updatedCostume) {
		return json({ status: 400, err: 'Trang phục không tồn tại' });
	}

	return json({ status: 200, data: updatedCostume });
}

/**
 * @type {import('./$types').RequestHandler}
 */
export async function DELETE({ request, params }) {
	// @ts-ignore
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}
	const deleteCostume = await Costume.findByIdAndDelete(params.id).lean();
	if (!deleteCostume) {
		return json({ status: 400, err: 'Trang phục không tồn tại' });
	}

	// throw redirect(302, '/admin/costume');
	return json({ status: 302, costume: 'Delete' });
}
