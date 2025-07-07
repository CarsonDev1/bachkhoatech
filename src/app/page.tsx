import Banner from '@/app/components/banner';
import LMSIntroSection from '@/app/components/intro';
import NewsSection from '@/app/components/news';
import Products from '@/app/components/products';
import StatsSection from '@/app/components/stats';
import TestimonialsSection from '@/app/components/testimonials';

export const revalidate = 60;

export default function Home() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Banner />
			<LMSIntroSection />
			<Products />
			{/* <NewsSection /> */}
			<StatsSection />
			<TestimonialsSection />
		</div>
	);
}
