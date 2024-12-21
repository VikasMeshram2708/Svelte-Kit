export const load = ({ url }) => {
	console.log('url', url);
	const errorMessage = url.searchParams.get('error');
	return {
		message: errorMessage
	};
};
