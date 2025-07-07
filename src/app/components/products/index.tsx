'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, Quote, Award, Users } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';

const Products = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const productsData = [
		{
			id: 1,
			name: 'LMS360 - Hệ thống quản lý học tập',
			image: '/images/products/LMS360.png',
			description:
				'Nền tảng học tập trực tuyến toàn diện, hỗ trợ giảng dạy và học tập hiệu quả với công nghệ hiện đại.',
			category: 'Giáo dục số',
			features: ['Quản lý khóa học', 'Bài giảng tương tác', 'Đánh giá trực tuyến'],
		},
		{
			id: 2,
			name: 'BK360 AI - Trí tuệ nhân tạo giáo dục',
			image: '/images/products/BK360 AI.png',
			description: 'Hệ thống AI thông minh hỗ trợ cá nhân hóa học tập và tối ưu hóa quá trình giảng dạy.',
			category: 'Trí tuệ nhân tạo',
			features: ['Học máy thông minh', 'Cá nhân hóa', 'Phân tích dữ liệu'],
		},
		{
			id: 3,
			name: 'Học bạ số',
			image: '/images/products/HỌC BẠ SỐ.png',
			description: 'Số hóa học bạ học sinh, theo dõi kết quả học tập một cách hiện đại và chính xác.',
			category: 'Quản lý học sinh',
			features: ['Điểm số điện tử', 'Báo cáo tự động', 'Lưu trữ an toàn'],
		},
		{
			id: 4,
			name: 'Điểm danh AI',
			image: '/images/products/ĐIỂM DANH AI.png',
			description: 'Hệ thống điểm danh tự động bằng AI, nhận diện khuôn mặt chính xác và nhanh chóng.',
			category: 'Công nghệ AI',
			features: ['Nhận diện khuôn mặt', 'Báo cáo tự động', 'Thống kê chi tiết'],
		},
		{
			id: 5,
			name: 'SMS360 - Quản lý trường học',
			image: '/images/products/SMS360.png',
			description: 'Hệ thống quản lý trường học, kết nối nhà trường với phụ huynh và học sinh.',
			category: 'Giao tiếp',
			features: ['Tin nhắn tự động', 'Thông báo nhanh', 'Quản lý danh bạ'],
		},
		{
			id: 6,
			name: 'Sổ liên lạc điện tử',
			image: '/images/products/SỔ LIÊN LẠC ĐT.png',
			description: 'Kết nối nhà trường và phụ huynh thông qua sổ liên lạc điện tử hiện đại.',
			category: 'Giao tiếp',
			features: ['Thông báo nhanh', 'Theo dõi con em', 'Chat trực tiếp'],
		},
		{
			id: 7,
			name: 'TEST360 - Kiểm tra đánh giá',
			image: '/images/products/TEST360.png',
			description: 'Hệ thống thi và kiểm tra trực tuyến với ngân hàng câu hỏi phong phú.',
			category: 'Đánh giá',
			features: ['Thi trực tuyến', 'Ngân hàng câu hỏi', 'Chấm điểm tự động'],
		},
		{
			id: 8,
			name: 'QAE360 - Đảm bảo chất lượng',
			image: '/images/products/QAE360.png',
			description: 'Hệ thống quản lý và đảm bảo chất lượng giáo dục theo tiêu chuẩn quốc tế.',
			category: 'Đánh giá chất lượng',
			features: ['Tiêu chuẩn quốc tế', 'Kiểm định chất lượng', 'Báo cáo chi tiết'],
		},
		{
			id: 9,
			name: 'Chatbot AI - Hỗ trợ thông minh',
			image: '/images/products/CHATBOT.png',
			description: 'Trợ lý ảo thông minh hỗ trợ giải đáp thắc mắc 24/7 cho học sinh và phụ huynh.',
			category: 'Hỗ trợ AI',
			features: ['Hỗ trợ 24/7', 'Trả lời thông minh', 'Học máy liên tục'],
		},
		{
			id: 10,
			name: 'Thí nghiệm ảo',
			image: '/images/products/THÍ NGHIỆM.png',
			description: 'Phòng thí nghiệm ảo với mô phỏng 3D, giúp học sinh trải nghiệm thực tế.',
			category: 'Giáo dục STEM',
			features: ['Mô phỏng 3D', 'An toàn tuyệt đối', 'Tương tác trực quan'],
		},
		{
			id: 11,
			name: 'Đào tạo số',
			image: '/images/products/ĐÀO TẠO.png',
			description: 'Chương trình đào tạo nhân sự số cho giáo viên và cán bộ quản lý.',
			category: 'Đào tạo',
			features: ['Khóa học chuyên nghiệp', 'Chứng chỉ uy tín', 'Hỗ trợ liên tục'],
		},
		{
			id: 12,
			name: 'Thi đua khen thưởng',
			image: '/images/products/THI ĐUA KHEN THƯỞNG.png',
			description: 'Quản lý các hoạt động thi đua, khen thưởng nhằm động viên tinh thần học tập.',
			category: 'Quản lý hoạt động',
			features: ['Quản lý cuộc thi', 'Hệ thống điểm thưởng', 'Báo cáo thành tích'],
		},
		{
			id: 13,
			name: 'Thu phí thông minh',
			image: '/images/products/THU PHÍ.png',
			description: 'Hệ thống thu phí học tập tự động, minh bạch và hiệu quả.',
			category: 'Quản lý tài chính',
			features: ['Thu phí tự động', 'Báo cáo minh bạch', 'Thanh toán đa dạng'],
		},
		{
			id: 14,
			name: 'Thiết bị số',
			image: '/images/products/THIẾT BỊ SỐ.png',
			description: 'Quản lý thiết bị số trong trường học một cách thông minh và hiệu quả.',
			category: 'Quản lý thiết bị',
			features: ['Theo dõi thiết bị', 'Bảo trì thông minh', 'Báo cáo sử dụng'],
		},
		{
			id: 15,
			name: 'Y tế học đường',
			image: '/images/products/Y TẾ HỌC ĐƯỜNG.png',
			description: 'Hệ thống quản lý sức khỏe học sinh toàn diện trong môi trường học đường.',
			category: 'Y tế học đường',
			features: ['Theo dõi sức khỏe', 'Hồ sơ y tế', 'Cảnh báo sức khỏe'],
		},
		{
			id: 16,
			name: 'Thi thử IELTS',
			image: '/images/products/THI  THỬ IELTS.png',
			description: 'Hệ thống luyện thi IELTS chuyên nghiệp với đề thi chuẩn quốc tế.',
			category: 'Luyện thi',
			features: ['Đề thi chuẩn', 'Chấm điểm AI', 'Phân tích kết quả'],
		},
		{
			id: 17,
			name: 'Chữ ký số',
			image: '/images/products/CHỮ KÝ SỐ.png',
			description: 'Giải pháp chữ ký số bảo mật cao cho các văn bản và giao dịch trong nhà trường.',
			category: 'Bảo mật',
			features: ['Bảo mật cao', 'Xác thực sinh trắc', 'Lưu trữ an toàn'],
		},
	];

	return (
		<div className='relative bg-white py-4 lg:py-10 px-4 overflow-hidden'>
			<div className='relative z-10 container-lg'>
				{/* Header */}
				<div className='text-center mb-4 md:mb-8'>
					<div
						className={`transform transition-all duration-1000 ${
							mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<div className='relative inline-block mx-auto max-w-4xl'>
							<div className='flex flex-col items-center justify-center'>
								<h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-[#666] leading-tight'>
									Đảm bảo từ <span className='text-blue-600'>chất lượng sản phẩm</span> đến{' '}
									<span className='text-blue-600'>dịch vụ khách hàng</span>
								</h2>
							</div>

							{/* Subtitle */}
							<div className='mt-6 px-4'>
								<p className='text-lg lg:text-xl text-[#666] leading-relaxed max-w-3xl mx-auto'>
									Niềm tin của hàng trăm trường học trên cả nước chính là minh chứng cho chất lượng và
									hiệu quả mà chúng tôi mang lại
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Products Carousel */}
				<div
					className={`transform transition-all duration-1000 delay-300 ${
						mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<Swiper
						modules={[Navigation, Autoplay, EffectCoverflow]}
						spaceBetween={30}
						slidesPerView={1}
						loop={true}
						autoplay={{
							delay: 4000,
							disableOnInteraction: false,
						}}
						effect='coverflow'
						coverflowEffect={{
							rotate: 0,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: false,
						}}
						navigation={{
							nextEl: '.swiper-button-next-custom',
							prevEl: '.swiper-button-prev-custom',
						}}
						breakpoints={{
							640: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
							},
						}}
						className='pb-16'
					>
						{productsData.map((product) => (
							<SwiperSlide key={product.id}>
								<div className='group relative bg-[#d4eaf6] backdrop-blur-sm !rounded-3xl border border-gray-200 p-8 hover:shadow-2xl transform transition-all duration-700 min-h-[500px] flex flex-col'>
									{/* Shimmer Effect */}
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl'></div>

									{/* Category Badge */}
									<div className='absolute top-6 right-6 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium'>
										{product.category}
									</div>

									{/* Product Icon */}
									<div className='relative z-10 text-center mb-6'>
										<div className='mx-auto w-24 h-24 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6'>
											<div className='size-32 flex items-center justify-center relative z-10'>
												<Image
													src={product.image}
													alt={product.name}
													width={100}
													height={100}
													className='w-full h-full object-contain'
												/>
											</div>
										</div>
									</div>

									{/* Product Name */}
									<div className='relative z-10 mb-4'>
										<h3 className='text-xl font-bold text-gray-800 mb-2 text-center group-hover:scale-105 transition-transform duration-300'>
											{product.name}
										</h3>
									</div>

									{/* Description */}
									<div className='relative z-10 flex-grow mb-6'>
										<p className='text-gray-600 text-center leading-relaxed'>
											{product.description}
										</p>
									</div>

									{/* Features */}
									<div className='relative z-10 mb-4'>
										<div className='flex flex-wrap gap-2 justify-center'>
											{product.features.map((feature, index) => (
												<span
													key={index}
													className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium'
												>
													{feature}
												</span>
											))}
										</div>
									</div>

									{/* Action Button */}
									<div className='relative z-10 text-center'>
										<button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105'>
											Tìm hiểu thêm
										</button>
									</div>

									{/* Floating Elements */}
									<div className='absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping'></div>
									<div className='absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200'></div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Navigation */}
					<div className='flex justify-center items-center gap-4 mt-8'>
						<button className='swiper-button-prev-custom group relative p-4 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
							<div className='absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
							<ChevronLeft className='w-6 h-6 relative z-10' />
						</button>

						<div className='flex items-center gap-2'>
							<Award className='w-5 h-5 text-blue-500' />
							<span className='text-gray-600 font-medium'>{productsData.length} sản phẩm công nghệ</span>
						</div>

						<button className='swiper-button-next-custom group relative p-4 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
							<div className='absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
							<ChevronRight className='w-6 h-6 relative z-10' />
						</button>
					</div>
				</div>

				{/* Bottom Stats */}
				<div
					className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
						mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
					}`}
				>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
						<div className='text-center'>
							<div className='text-3xl font-bold text-blue-600 mb-2'>17+</div>
							<p className='text-gray-600'>Sản phẩm công nghệ</p>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-blue-600 mb-2'>AI</div>
							<p className='text-gray-600'>Tích hợp trí tuệ nhân tạo</p>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-blue-600 mb-2'>360°</div>
							<p className='text-gray-600'>Giải pháp toàn diện</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
