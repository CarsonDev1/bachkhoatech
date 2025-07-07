import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/layout/header';
import { Footer } from '@/app/layout/footer/Component';
import ScrollToTop from '@/components/ui/scroll-to-top';

const poppins = Inter({
	weight: ['400', '500', '600', '700', '800', '900', '100', '200', '300'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Bách Khoa - Technology is Power',
	description:
		'Khám phá những giải pháp công nghệ tiên tiến cùng Bách Khoa. Chúng tôi cung cấp các sản phẩm và dịch vụ công nghệ chất lượng cao.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} antialiased`}>
				<Header />
				{children}
				<Footer />
				<ScrollToTop />
			</body>
		</html>
	);
}
