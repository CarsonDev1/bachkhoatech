import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Users, Zap, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { Metadata } from 'next';

// ISR Configuration
export const revalidate = 3600;

// SEO Metadata
export const metadata: Metadata = {
	title: 'Sản Phẩm | Bách Khoa Technology',
	description:
		'Khám phá các sản phẩm công nghệ giáo dục tiên tiến của Bách Khoa Technology - LMS360, hệ thống kiểm định chất lượng, điểm danh AI và nhiều giải pháp khác.',
	keywords: 'LMS360, e-learning, giáo dục số, điểm danh AI, kiểm định chất lượng giáo dục, sổ liên lạc điện tử',
	openGraph: {
		title: 'Sản Phẩm | Bách Khoa Technology',
		description: 'Các giải pháp công nghệ giáo dục hàng đầu cho trường học hiện đại',
		type: 'website',
		images: ['/images/logo.png'],
	},
};

// Static data
async function getProductData() {
	await new Promise((resolve) => setTimeout(resolve, 100));

	return {
		hero: {
			title: 'Sản Phẩm Tiêu Biểu',
			subtitle: 'Giải pháp công nghệ giáo dục toàn diện',
			description:
				'Chúng tôi phát triển các sản phẩm công nghệ tiên tiến, đáp ứng mọi nhu cầu của hệ thống giáo dục hiện đại từ quản lý học tập đến đánh giá chất lượng.',
		},
		featuredProducts: [
			{
				id: 'lms360',
				title: 'LMS360 e-Learning',
				description:
					'Hệ thống quản lý học tập toàn diện với AI, hỗ trợ học trực tuyến, quản lý khóa học và theo dõi tiến độ học tập.',
				icon: '📚',
				features: ['Học tập trực tuyến', 'Quản lý khóa học', 'Báo cáo chi tiết', 'Tích hợp AI'],
				color: 'from-blue-500 to-cyan-500',
				link: 'https://lms360.vn',
			},
			{
				id: 'quality-assessment',
				title: 'Hệ thống Kiểm định Chất lượng Giáo dục',
				description: 'Công cụ đánh giá và kiểm định chất lượng giáo dục theo tiêu chuẩn quốc gia và quốc tế.',
				icon: '✅',
				features: ['Đánh giá tiêu chuẩn', 'Báo cáo tự động', 'Phân tích dữ liệu', 'Theo dõi cải tiến'],
				color: 'from-green-500 to-emerald-500',
				link: '#',
			},
			{
				id: 'reward-system',
				title: 'Hệ thống Đánh giá - Thi đua Khen thưởng',
				description: 'Nền tảng quản lý và đánh giá thành tích, thi đua khen thưởng cho học sinh, giáo viên.',
				icon: '🏆',
				features: ['Quản lý thành tích', 'Thi đua khen thưởng', 'Xếp hạng tự động', 'Báo cáo thống kê'],
				color: 'from-yellow-500 to-orange-500',
				link: '#',
			},
			{
				id: 'schedule-management',
				title: 'Sắp xếp Thời khóa biểu',
				description: 'Giải pháp tối ưu hóa việc sắp xếp thời khóa biểu tự động, quản lý lịch học hiệu quả.',
				icon: '📅',
				features: ['Sắp xếp tự động', 'Tối ưu hóa', 'Xung đột thời gian', 'Báo cáo lịch học'],
				color: 'from-purple-500 to-pink-500',
				link: '#',
			},
			{
				id: 'ai-attendance',
				title: 'Điểm danh Nhận diện Khuôn mặt bằng AI',
				description: 'Hệ thống điểm danh thông minh sử dụng AI nhận diện khuôn mặt, chính xác và nhanh chóng.',
				icon: '🤖',
				features: ['Nhận diện AI', 'Điểm danh tự động', 'Báo cáo vắng mặt', 'Bảo mật cao'],
				color: 'from-indigo-500 to-blue-500',
				link: '#',
			},
			{
				id: 'digital-handbook',
				title: 'Sổ Liên lạc Điện tử',
				description: 'Ứng dụng kết nối giữa nhà trường, phụ huynh và học sinh, theo dõi quá trình học tập.',
				icon: '📱',
				features: ['Liên lạc đa chiều', 'Theo dõi học tập', 'Thông báo tức thì', 'Báo cáo định kỳ'],
				color: 'from-teal-500 to-cyan-500',
				link: '#',
			},
		],
		customers: [
			{ name: 'Phòng GD&ĐT Quận 3', logo: '/images/logos/quan3.png' },
			{ name: 'Phòng GD&ĐT Quận 4', logo: '/images/logos/quan4.png' },
			{ name: 'Phòng GD&ĐT Quận 7', logo: '/images/logos/quan7.png' },
			{ name: 'Phòng GD&ĐT Quận Tân Phú', logo: '/images/logos/tanphu.png' },
			{ name: 'Phòng GD&ĐT TP Thủ Đức', logo: '/images/logos/thuduc.png' },
			{ name: 'Phòng GD&ĐT Huyện Cần Giờ', logo: '/images/logos/cangio.png' },
			{ name: 'Trường THPT Lê Hồng Phong', logo: '/images/logos/lehongphong.png' },
			{ name: 'Trường THPT Lê Quý Đôn', logo: '/images/logos/lequydon.png' },
			{ name: 'Trường THPT Phi Khanh', logo: '/images/logos/phikhanh.png' },
			{ name: 'Trường THPT Trần Khai Nguyên', logo: '/images/logos/trankhainguyen.png' },
			{ name: 'Trường THPT Nguyễn Văn Tráng', logo: '/images/logos/nguyenvantrang.png' },
			{ name: 'Trường THPT Nguyễn Công Trứ', logo: '/images/logos/nguyencongtu.png' },
		],
		stats: [
			{ value: '50+', label: 'Sản phẩm', icon: Zap },
			{ value: '500+', label: 'Khách hàng', icon: Users },
			{ value: '1M+', label: 'Người dùng', icon: GraduationCap },
		],
	};
}

const ProductPage = async () => {
	const data = await getProductData();

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative py-10 lg:py-16 bg-slate-800 overflow-hidden'>
				{/* Background Pattern */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")]'></div>
				</div>

				<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center max-w-4xl mx-auto'>
						<h1 className='text-4xl lg:text-6xl font-bold text-white mb-6'>{data.hero.title}</h1>
						<p className='text-xl lg:text-2xl font-medium text-white mb-6'>{data.hero.subtitle}</p>
						<p className='text-lg text-white leading-relaxed max-w-3xl mx-auto mb-8'>
							{data.hero.description}
						</p>

						{/* Stats */}
						<div className='grid md:grid-cols-3 gap-8 mt-12'>
							{data.stats.map((stat, index) => {
								const IconComponent = stat.icon;
								return (
									<div key={index} className='text-center'>
										<div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4'>
											<IconComponent className='w-8 h-8 text-white' />
										</div>
										<div className='text-3xl font-bold text-white mb-2'>{stat.value}</div>
										<p className='text-white'>{stat.label}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<section className='py-10 lg:py-16 bg-white'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>Sản Phẩm Nổi Bật</h2>
						<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
							Các giải pháp công nghệ hàng đầu được tin dùng bởi hàng trăm tổ chức giáo dục
						</p>
					</div>

					{/* Products Grid */}
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{data.featuredProducts.map((product, index) => (
							<div
								key={product.id}
								className='group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 flex flex-col h-full'
							>
								{/* Product Header */}
								<div
									className={`h-32 bg-gradient-to-r ${product.color} relative overflow-hidden flex-shrink-0`}
								>
									<div className='absolute inset-0 bg-black/10'></div>
									<div className='absolute inset-0 flex items-center justify-center'>
										<span className='text-6xl opacity-20'>{product.icon}</span>
									</div>
									<div className='absolute top-4 right-4'>
										<span className='text-3xl'>{product.icon}</span>
									</div>
								</div>

								{/* Product Content */}
								<div className='p-6 flex flex-col flex-1'>
									<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors'>
										{product.title}
									</h3>
									<p className='text-gray-600 leading-relaxed mb-4'>{product.description}</p>

									{/* Features List - This will expand to fill available space */}
									<div className='space-y-2 mb-6 flex-1'>
										{product.features.map((feature, idx) => (
											<div key={idx} className='flex items-center text-sm text-gray-600'>
												<CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
												<span>{feature}</span>
											</div>
										))}
									</div>

									{/* CTA Button - This will always be at the bottom */}
									<a
										href={product.link}
										className='inline-flex items-center w-full justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group mt-auto'
										target='_blank'
										rel='noopener noreferrer'
									>
										Xem thêm
										<ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Customers Section */}
			<section className='py-10 lg:py-16 bg-gray-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>Khách Hàng Tiêu Biểu</h2>
						<p className='text-lg text-gray-600 max-w-3xl mx-auto'>
							Được tin tưởng bởi hàng trăm tổ chức giáo dục trên toàn quốc
						</p>
					</div>

					{/* Customers Grid */}
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8'>
						{data.customers.map((customer, index) => (
							<div
								key={index}
								className='bg-white rounded-xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300 group'
							>
								<div className='aspect-square flex items-center justify-center'>
									{customer.logo ? (
										<Image
											src={customer.logo}
											alt={customer.name}
											width={80}
											height={80}
											className='object-contain group-hover:scale-110 transition-transform duration-300'
										/>
									) : (
										<div className='w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center'>
											<BookOpen className='w-8 h-8 text-blue-600' />
										</div>
									)}
								</div>
								<h3 className='text-sm font-medium text-gray-900 text-center mt-4 leading-tight'>
									{customer.name}
								</h3>
							</div>
						))}
					</div>

					{/* More Customers Indicator */}
					<div className='text-center mt-12'>
						<p className='text-gray-600 mb-4'>Và hơn 500+ tổ chức giáo dục khác</p>
						<div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full'>
							<Users className='w-5 h-5 mr-2' />
							Xem tất cả khách hàng
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductPage;
