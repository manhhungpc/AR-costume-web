//@ts-ignore
export function convertToBase64(e, callback) {
	let base64 = '',
		err;
	const imageData = e.target?.files?.[0];
	const imageSize = e.target?.files[0]?.size;
	if (!imageData) return;
	if (imageSize > 51200) {
		err = { err: 'File quá lớn' };
		return;
	}

	let reader = new FileReader();
	reader.readAsDataURL(imageData);
	reader.onloadend = () => {
		// @ts-ignore
		base64 = reader.result;
		console.log(base64);
		callback(base64);
	};
}
