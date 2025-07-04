/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tintuc.lms360.vn',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
	},
};

export default nextConfig;
