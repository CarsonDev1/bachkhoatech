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

const TestimonialsSection = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const testimonialsData = [
		{
			id: 1,
			name: 'Trường THPT Lê Quý Đôn',
			logo: '/images/logo-01.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Hiệu trưởng',
		},
		{
			id: 2,
			name: 'Trường THPT Phú Nhuận',
			logo: '/images/logo-02.png',
			description: 'Platform tuyệt vời cho việc tổ chức các khóa học nghệ thuật và quản lý học viên.',
			rating: 5,
			position: 'Giám đốc đào tạo',
		},
		{
			id: 3,
			name: 'Trường THCS Lê Anh Xuân',
			logo: '/images/logo-03.png',
			description: 'Công nghệ giáo dục hiện đại giúp nâng cao chất lượng giảng dạy và học tập.',
			rating: 5,
			position: 'Phó Hiệu trưởng',
		},
		{
			id: 4,
			name: 'Marching Band',
			logo: '/images/logo-04.png',
			description: 'Giải pháp toàn diện cho việc số hóa hoạt động giáo dục và đào tạo.',
			rating: 5,
			position: 'Trưởng phòng đào tạo',
		},
		{
			id: 5,
			name: 'Trường THCS Lê Quý Đôn - Thủ Đức',
			logo: '/images/logo-05.png',
			description: 'Nền tảng uy tín và tin cậy cho hệ thống giáo dục thành phố.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 6,
			name: 'Trường THCS Lý Tự Trọng',
			logo: '/images/logo-06.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 7,
			name: 'Trường THPT Cần Thạnh',
			logo: '/images/logo-07.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 8,
			name: 'Trường THCS Ngô Chí Quốc',
			logo: '/images/logo-08.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 9,
			name: 'Trường THPT Chuyên Lê Hồng Phong',
			logo: '/images/logo-09.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 10,
			name: 'BTX',
			logo: '/images/logo-10.png',
			description:
				'Hệ thống LMS360 đã giúp chúng tôi hiện đại hóa quy trình giảng dạy và quản lý học sinh hiệu quả.',
			rating: 5,
			position: 'Chuyên viên',
		},
	];

	return (
		<div className='relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-20 px-4 overflow-hidden'>
			{/* Background Effects */}
			<div className='absolute inset-0'>
				{/* Floating Particles */}
				{mounted &&
					Array.from({ length: 25 }).map((_, i) => (
						<div
							key={i}
							className='absolute w-2 h-2 bg-gray-400/20 rounded-full animate-pulse'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 5}s`,
								animationDuration: `${2 + Math.random() * 3}s`,
							}}
						/>
					))}

				{/* Geometric Patterns */}
				<div className='absolute inset-0 opacity-5'>
					<div className='absolute top-20 left-20 w-32 h-32 border-2 border-gray-400 rounded-full animate-pulse'></div>
					<div className='absolute bottom-20 right-20 w-24 h-24 border-2 border-gray-400 rounded-full animate-pulse delay-1000'></div>
					<div className='absolute top-1/2 right-1/4 w-16 h-16 border-2 border-gray-400 rounded-full animate-pulse delay-2000'></div>
				</div>
			</div>

			<div className='relative z-10 max-w-7xl mx-auto'>
				{/* Header */}
				<div className='text-center mb-16'>
					<div
						className={`transform transition-all duration-1000 ${
							mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<h2 className='text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2 uppercase'>
							Khách hàng nổi bật
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6'></div>
						<p className='text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed'>
							Với sự tận tâm, trách nhiệm, sáng tạo, chúng tôi mang đến cho hệ thống giáo dục các sản phẩm
							chất lượng và sự hài lòng cao nhất
						</p>
					</div>
				</div>

				{/* Testimonials Carousel */}
				<div
					className={`transform transition-all duration-1000 delay-300 ${
						mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
					}`}
				>
					<Swiper
						modules={[Navigation, Autoplay, EffectCoverflow]}
						spaceBetween={0}
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
						{testimonialsData.map((testimonial, index) => (
							<SwiperSlide key={testimonial.id}>
								<div className='group relative bg-white/90 backdrop-blur-sm !rounded-3xl border border-gray-200 p-8 hover:shadow-2xl transform transition-all duration-700 min-h-[400px] flex flex-col'>
									{/* Shimmer Effect */}
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl'></div>

									{/* Quote Icon */}
									<div className='absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300'>
										<Quote className='w-8 h-8 text-gray-400' />
									</div>

									{/* Logo/Avatar Section */}
									<div className='relative z-10 text-center mb-6'>
										<div className='mx-auto w-24 h-24 flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6'>
											<div className='size-20 rounded-full flex items-center justify-center relative z-10'>
												<Image
													src={testimonial.logo}
													alt={testimonial.name}
													width={80}
													height={80}
													className='rounded-full object-cover'
												/>
											</div>
										</div>
									</div>

									{/* School Name */}
									<div className='relative z-10 mb-4'>
										<h3 className='text-xl font-bold text-gray-800 mb-2 text-center group-hover:scale-105 transition-transform duration-300'>
											{testimonial.name}
										</h3>
									</div>

									{/* Description */}
									<div className='relative z-10 flex-grow mb-6'>
										<p className='text-gray-600 text-center leading-relaxed italic'>
											"{testimonial.description}"
										</p>
									</div>

									{/* Rating */}
									<div className='relative z-10 flex justify-center mb-4'>
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star
												key={i}
												className='w-5 h-5 text-gray-500 fill-current transform transition-transform duration-300 group-hover:scale-110'
												style={{ animationDelay: `${i * 100}ms` }}
											/>
										))}
									</div>

									{/* Position */}
									<div className='relative z-10 text-center'>
										<p className='text-gray-500 font-semibold'>{testimonial.position}</p>
									</div>

									{/* Floating Elements */}
									<div className='absolute top-4 left-4 w-3 h-3 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping'></div>
									<div className='absolute bottom-4 right-4 w-2 h-2 bg-gray-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200'></div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Navigation */}
					<div className='flex justify-center items-center gap-4 mt-8'>
						<button className='swiper-button-prev-custom group relative p-4 bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
							<div className='absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
							<ChevronLeft className='w-6 h-6 relative z-10' />
						</button>

						<div className='flex items-center gap-2'>
							<Users className='w-5 h-5 text-gray-500' />
							<span className='text-gray-600 font-medium'>
								{testimonialsData.length} khách hàng tin tướng
							</span>
						</div>

						<button className='swiper-button-next-custom group relative p-4 bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
							<div className='absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
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
							<div className='text-3xl font-bold text-gray-800 mb-2'>98%</div>
							<p className='text-gray-600'>Tỷ lệ hài lòng</p>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-gray-800 mb-2'>1000+</div>
							<p className='text-gray-600'>Khách hàng tin tưởng</p>
						</div>
						<div className='text-center'>
							<div className='text-3xl font-bold text-gray-800 mb-2'>24/7</div>
							<p className='text-gray-600'>Hỗ trợ khách hàng</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsSection;
