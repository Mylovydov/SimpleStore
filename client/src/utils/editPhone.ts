const editPhone = (value: string) => {
	const reg = /\W|_|\D/gi;
	return value.replace(reg, '');
};

export default editPhone;