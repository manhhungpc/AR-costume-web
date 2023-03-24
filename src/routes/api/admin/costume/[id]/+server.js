import { json } from '@sveltejs/kit';
import Costume from 'base/models/Costume';
/**
 * @type {import('./$types').RequestHandler}
 */
export async function PUT({ request }) {
	const req = await request.json();

	if (!req.name || !req.qr_image) {
		return json({ status: 400, err: 'Thiếu thông tin' });
	}

	const data = {
		name: req.name,
		description: req.description || 'Không có mô tả',
		qr: req.qr_image,
		url_3d: ''
	};
	const updatedCostume = await Costume.findByIdAndUpdate(req._id, data);
	if (!updatedCostume) {
		return json({ status: 400, err: 'Trang phục không tồn tại' });
	}

	return json({ status: 200, data: updatedCostume });
}
