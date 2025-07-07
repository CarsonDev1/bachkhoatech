'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, Quote, Award, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import Image from 'next/image';
import { Marquee } from '@/components/magicui/marquee';

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
			description: 'Giao diện thân thiện và tính năng phong phú giúp việc tương tác học tập trở nên dễ dàng hơn.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 7,
			name: 'Trường THPT Cần Thạnh',
			logo: '/images/logo-07.png',
			description: 'Báo cáo chi tiết và phân tích dữ liệu học tập giúp chúng tôi đưa ra quyết định chính xác.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 8,
			name: 'Trường THCS Ngô Chí Quốc',
			logo: '/images/logo-08.png',
			description: 'Hỗ trợ đa nền tảng và khả năng tương tác tốt giữa giáo viên và học sinh.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 9,
			name: 'Trường THPT Chuyên Lê Hồng Phong',
			logo: '/images/logo-09.png',
			description: 'Tính bảo mật cao và khả năng sao lưu dữ liệu tự động mang lại sự an tâm cho nhà trường.',
			rating: 5,
			position: 'Chuyên viên',
		},
		{
			id: 10,
			name: 'BTX',
			logo: '/images/logo-10.png',
			description: 'Đội ngũ hỗ trợ kỹ thuật chuyên nghiệp và thời gian phản hồi nhanh chóng.',
			rating: 5,
			position: 'Chuyên viên',
		},
	];

	const firstRow = testimonialsData.slice(0, Math.ceil(testimonialsData.length / 2));
	const secondRow = testimonialsData.slice(Math.ceil(testimonialsData.length / 2));

	const TestimonialCard = ({
		logo,
		name,
		position,
		description,
		rating,
	}: {
		logo: string;
		name: string;
		position: string;
		description: string;
		rating: number;
	}) => {
		return (
			<figure
				className={cn(
					'relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6',
					'border-gray-200 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300'
				)}
			>
				<div className='flex flex-row items-center gap-3 mb-4'>
					<div className='size-24 rounded-full overflow-hidden flex items-center justify-center'>
						<Image src={logo} alt={name} width={96} height={96} className='w-full h-full object-contain' />
					</div>
					<figcaption className='text-sm font-bold text-[#19376B] leading-tight'>{name}</figcaption>
				</div>

				{/* Rating Stars */}
				<div className='flex items-center gap-1 mb-3'>
					{Array.from({ length: rating }).map((_, i) => (
						<Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
					))}
				</div>
			</figure>
		);
	};

	return (
		<div className='relative py-8 lg:py-16 overflow-hidden bg-white'>
			<div className='relative z-10 container-lg'>
				<div className='absolute inset-0'>
					<Image src='/images/bg-intro.png' alt='intro-bg' fill className='object-cover rounded-xl' />
				</div>
				<div className='py-6'>
					{/* Header */}
					<div className='text-center mb-4 md:mb-8'>
						<div
							className={`transform relative w-fit mx-auto transition-all duration-1000 ${
								mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
							}`}
						>
							<h2 className='text-2xl lg:text-3xl font-bold mb-1 uppercase text-[#19376B]'>
								KHÁCH HÀNG TIÊU BIỂU
							</h2>
							<div className='w-full h-1 bg-[#19376B] rounded-full mx-auto mb-6' />
						</div>
					</div>

					{/* Marquee */}
					<div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl'>
						<Marquee pauseOnHover className='[--duration:25s] py-4'>
							{firstRow.map((testimonial) => (
								<TestimonialCard key={testimonial.id} {...testimonial} />
							))}
						</Marquee>
						<Marquee reverse pauseOnHover className='[--duration:25s] py-4'>
							{secondRow.map((testimonial) => (
								<TestimonialCard key={testimonial.id} {...testimonial} />
							))}
						</Marquee>

						{/* Gradient overlays */}
						<div className='pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white to-transparent'></div>
						<div className='pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white to-transparent'></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsSection;
