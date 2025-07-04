import React from 'react';
import Image from 'next/image';
import { CheckCircle, Users, Globe, BookOpen, Zap, Star, TrendingUp, Award, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import MissionAccordion from '@/app/components/mission-accordion';

// ISR Configuration - Revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

// SEO Metadata
export const metadata: Metadata = {
	title: 'Về Chúng Tôi | Bách Khoa Technology',
	description:
		'Tầm nhìn của chúng tôi là xây dựng một hệ thống giáo dục hiện đại, tiên tiến và công bằng cho tương lai giáo dục Việt Nam.',
	keywords: 'giáo dục hiện đại, công nghệ giáo dục, LMS, Bách Khoa Technology, chuyển đổi số',
	openGraph: {
		title: 'Về Chúng Tôi | Bách Khoa Technology',
		description:
			'Khám phá tầm nhìn và sứ mệnh của Bách Khoa Technology trong việc xây dựng hệ thống giáo dục hiện đại.',
		type: 'website',
		images: ['/images/logo.png'],
	},
};

// Static data that could be fetched from CMS/API in real scenario
async function getAboutData() {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 100));

	return {
		hero: {
			title: 'VỀ CHÚNG TÔI',
			description:
				'Tầm nhìn của chúng tôi là xây dựng một hệ thống giáo dục hiện đại, tiên tiến và công bằng, nơi mà mọi học sinh, sinh viên đều có thể tiếp cận và tận hưởng những thành tựu khoa học hiện đại, sáng tạo và có thể tiếp cận với các mô hình và thực trạng trong tương lai.',
		},
		features: [
			{
				id: 1,
				title: 'Giáo Dục Hiện Đại',
				description:
					'Chúng tôi cam kết đưa giáo dục Việt Nam lên tầm cao mới bằng cách áp dụng những công nghệ tiên tiến nhất, giúp ra một môi trường học tập linh hoạt, sáng tạo và phù hợp với hướng toàn cầu.',
				image: '/images/about-01.png',
				color: 'from-blue-500 to-cyan-500',
				textColor: 'text-cyan-600',
			},
			{
				id: 2,
				title: 'Tích Hợp Công Nghệ',
				description:
					'Chúng tôi tận dụng sức mạnh của công nghệ để tối ưu hóa quá trình học tập và giảng dạy. Từ hệ thống quản lý đào tạo LMS đến các công cụ hỗ trợ học tập AI, chúng tôi mang đến trải nghiệm học tập đa dạng và phong phú.',
				image: '/images/about-02.jpg',
				color: 'from-green-500 to-emerald-500',
				textColor: 'text-green-600',
			},
			{
				id: 3,
				title: 'Bình Đẳng Và Tiếp Cận Mọi Người',
				description:
					'Tầm nhìn của chúng tôi không chỉ là sự tiến bộ mà còn về sự công bằng. Chúng tôi tập trung thiết kế các giải pháp để mọi học sinh, sinh viên không phụ thuộc vào vùng miền hay điều kiện kinh tế đều có thể học tập và phát triển.',
				image: '/images/about-03.jpg',
				color: 'from-purple-500 to-pink-500',
				textColor: 'text-purple-600',
			},
			{
				id: 4,
				title: 'Sự Hỗ Trợ Cho Hệ Thống Giáo Dục Toàn Cầu',
				description:
					'Chúng tôi nhìn xa hơn biên giới quốc gia, hướng đến việc cung cấp các giải pháp chuyên đội để cho các hệ thống giáo dục ở những quốc gia phát triển có nhiều hệ thống giáo dục hiện đại và tiên bộ.',
				image: '/images/about-04.png',
				color: 'from-orange-500 to-red-500',
				textColor: 'text-orange-600',
			},
			{
				id: 5,
				title: 'Chủ Động Tìm Kiếm Công Nghệ Mới',
				description:
					'Chúng tôi cam kết đứng đầu trong việc nghiên cứu và phát triển công nghệ mới, như trí tuệ nhân tạo, blockchain để đảm bảo rằng giáo dục của chúng ta luôn thích ứng với những đổi mới tiên tiến.',
				image: '/images/robot.png',
				color: 'from-indigo-500 to-blue-500',
				textColor: 'text-indigo-600',
			},
		],
		technologies: [
			{ title: 'Trí tuệ nhân tạo', icon: '🤖', desc: 'AI hỗ trợ học tập cá nhân hóa' },
			{ title: 'Blockchain', icon: '🔗', desc: 'Bảo mật và xác thực học bạ' },
			{ title: 'IoT', icon: '📱', desc: 'Kết nối thiết bị thông minh' },
			{ title: 'Big Data', icon: '📊', desc: 'Phân tích dữ liệu giáo dục' },
		],
		stats: [
			{ value: '10+', label: 'Năm kinh nghiệm', color: 'text-blue-300' },
			{ value: '500+', label: 'Đối tác giáo dục', color: 'text-green-300' },
			{ value: '1M+', label: 'Học sinh, sinh viên', color: 'text-purple-300' },
		],
		coreValues: [
			'Đổi mới sáng tạo không ngừng',
			'Chất lượng và hiệu quả',
			'Tiếp cận bình đẳng',
			'Hợp tác và chia sẻ',
		],
	};
}

const AboutPage = async () => {
	const data = await getAboutData();

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative py-10 lg:py-16 overflow-hidden'>
				<div className='absolute inset-0 bg-slate-800'></div>
				<div className='container-lg relative z-10'>
					<div className='text-center max-w-4xl mx-auto text-white'>
						<h1 className='text-2xl lg:text-3xl font-black mb-8'>{data.hero.title}</h1>
						<div className='flex justify-center mb-12'>
							<Image
								src='/images/logo.png'
								alt='Bách Khoa Technology Logo'
								width={400}
								height={200}
								className='object-contain'
								priority
							/>
						</div>
						<p className='text-lg lg:text-xl leading-relaxed'>{data.hero.description}</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className='py-4 lg:py-8'>
				<div className='container-lg'>
					{/* Features */}
					{data.features.map((feature, index) => (
						<div key={feature.id} className='mb-4 lg:mb-8'>
							<div className='grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
								{/* Text Content */}
								<div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
									<div className='flex items-center mb-6'>
										<div
											className={`size-14 lg:size-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center text-white text-2xl lg:text-3xl font-bold shadow-lg px-6 py-1`}
										>
											{feature.id}
										</div>
										<h2 className={`text-2xl lg:text-4xl font-bold ${feature.textColor} ml-6`}>
											{feature.title}
										</h2>
									</div>
									<p className='text-gray-700 text-lg leading-relaxed'>{feature.description}</p>
								</div>

								{/* Image */}
								<div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
									<div className='relative rounded-2xl overflow-hidden'>
										<Image
											src={feature.image}
											alt={feature.title}
											width={600}
											height={400}
											className='w-full h-auto object-cover'
											loading='lazy'
										/>
										<div
											className={`absolute inset-0 bg-gradient-to-t ${feature.color
												.replace('to-', 'to-')
												.replace('from-', 'from-')
												.replace('-500', '-600/20')
												.replace('-400', '-600/20')} to-transparent`}
										></div>
									</div>
								</div>
							</div>
						</div>
					))}

					<MissionAccordion />

					{/* Mission & Vision Section */}
					<div className='bg-gradient-to-r from-slate-800 to-blue-800 rounded-3xl p-8 lg:p-12 text-white'>
						<div className='max-w-4xl mx-auto text-center'>
							<h2 className='text-2xl lg:text-3xl font-bold mb-8'>
								Thông qua tầm nhìn và sứ mệnh này, chúng tôi hy vọng có thể là một đối tác đáng tin cậy,
								đồng hành với Ngành giáo dục Việt Nam trên con đường chuyển đổi số và phát triển bền
								vững. Chúng tôi mong muốn hợp tác chặt chẽ với các bên liên quan như trường học, tổ chức
								giáo dục, và cộng đồng để cùng nhau định hình một tương lai giáo dục tốt đẹp hơn cho
								Việt Nam.
							</h2>
							<div className='grid md:grid-cols-3 gap-8 mb-8'>
								{data.stats.map((stat, index) => (
									<div key={index} className='text-center'>
										<div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
										<p className='text-blue-100'>{stat.label}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
