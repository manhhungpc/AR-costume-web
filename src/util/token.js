// @ts-ignore
export const decode = (token) => {
	return JSON.parse(atob(token.split('.')[1]));
};
