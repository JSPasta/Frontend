import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: ''
			}
		]
	},
	env: {
		API_URL: process.env.API_URL
	},
	async redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/JSPaste/',
				permanent: true
			}
		];
	}
};

let configExport = nextConfig;

if (process.env.NODE_ENV === 'production') {
	console.log('Loaded production config');
	configExport = million.next(nextConfig, { auto: true });
}

export default configExport;
