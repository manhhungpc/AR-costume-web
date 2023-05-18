import { json } from '@sveltejs/kit';
import { verify } from '$lib/server/token.js';
import Costume from 'base/models/Costume';
import { JWT_SECRET } from '$env/static/private';
import { upload } from 'base/util/upload';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ request }) {
	// @ts-ignore
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}

	const costumes = await Costume.find().lean();
	return json({ costumes });
}

/**
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request }) {
	// @ts-ignore
	const token = request.headers.get('authorization').split(' ')[1];
	if (!verify(token, JWT_SECRET)) {
		return json({ status: 403, err: 'Không có quyền truy cập' });
	}
	const req = await request.json();
	if (!req.name || !req.qr_image) {
		return json({ status: 400, err: 'Thiếu thông tin' });
	}
	// console.log(req, req.qr_image);
	const imgName = encodeURIComponent(req.name);
	const markerName = encodeURIComponent(`marker_${req.name}`);

	const uploadImg = await upload(req.qr_image, imgName);
	const uploadMarker = await upload(req.marker_image, markerName);
	const costumesImg = await multiUpload(req.costumes_img, imgName);

	const data = {
		name: req.name,
		description: req.description || 'Không có mô tả',
		qr: uploadImg.secure_url,
		qr_gen_url: uploadImg.url,
		costumes_img: costumesImg,
		marker_img: uploadMarker.secure_url
	};
	// console.log(data);
	const newCostume = await Costume.create(data);
	return json({ status: 200, data: newCostume });
}

const multiUpload = async (
	/** @type {Array<String>} */ costumesImg,
	/** @type {String} */ imgName
) => {
	let uploadedImg = [];
	for (let image of costumesImg) {
		const imgUrl = await upload(image, `${encodeURIComponent(imgName)}_num${crypto.randomUUID()}`);
		uploadedImg.push(imgUrl.secure_url);
	}
	return uploadedImg;
};
