import jwt from 'jsonwebtoken';
// @ts-ignore
export const verify = (token, secret_key) => {
	const validate = jwt.verify(token, secret_key);
	if (validate) return true;
	return false;
};
