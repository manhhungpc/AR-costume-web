import { v2 as cloudinary } from 'cloudinary';

/**
 * @param {any} imageData
 * @param {string} name
 */
export async function upload(imageData, name) {
	const uploadImg = await cloudinary.uploader.upload(imageData, { public_id: name });

	const url = cloudinary.url(name, {
		width: 300,
		height: 300,
		Crop: 'fill'
	});

	return { secure_url: uploadImg.secure_url, url };
}
