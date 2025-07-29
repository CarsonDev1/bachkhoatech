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
			logo: '/images/logo-schools/1.png',
		},
		{
			id: 2,
			logo: '/images/logo-schools/2.png',
		},
		{
			id: 3,
			logo: '/images/logo-schools/11.png',
		},
		{
			id: 4,
			logo: '/images/logo-schools/4.png',
		},
		{
			id: 5,
			logo: '/images/logo-schools/5.png',
		},
		{
			id: 6,
			logo: '/images/logo-schools/6.png',
		},
		{
			id: 7,
			logo: '/images/logo-schools/7.png',
		},
		{
			id: 8,
			logo: '/images/logo-schools/8.png',
		},
		{
			id: 9,
			logo: '/images/logo-schools/9.png',
		},
		{
			id: 10,
			logo: '/images/logo-schools/10.png',
		},
		{
			id: 11,
			logo: '/images/logo-schools/12.png',
		},
		{
			id: 12,
			logo: '/images/logo-schools/13.png',
		},
		{
			id: 13,
			logo: '/images/logo-schools/14.png',
		},
		{
			id: 14,
			logo: '/images/logo-schools/15.png',
		},
		{
			id: 15,
			logo: '/images/logo-schools/16.png',
		},
		{
			id: 16,
			logo: '/images/logo-schools/17.png',
		},
		{
			id: 17,
			logo: '/images/logo-schools/18.png',
		},
		{
			id: 18,
			logo: '/images/logo-schools/19.png',
		},
		{
			id: 19,
			logo: '/images/logo-schools/20.png',
		},
		{
			id: 20,
			logo: '/images/logo-schools/21.png',
		},
		{
			id: 21,
			logo: '/images/logo-schools/22.png',
		},
		{
			id: 22,
			logo: '/images/logo-schools/23.png',
		},
		{
			id: 23,
			logo: '/images/logo-schools/24.png',
		},
		{
			id: 24,
			logo: '/images/logo-schools/25.png',
		},
		{
			id: 25,
			logo: '/images/logo-schools/26.png',
		},
		{
			id: 26,
			logo: '/images/logo-schools/27.png',
		},
		{
			id: 27,
			logo: '/images/logo-schools/28.png',
		},
		{
			id: 28,
			logo: '/images/logo-schools/29.png',
		},
		{
			id: 29,
			logo: '/images/logo-schools/30.png',
		},
	];

	const firstRow = testimonialsData.slice(0, Math.ceil(testimonialsData.length / 2));
	const secondRow = testimonialsData.slice(Math.ceil(testimonialsData.length / 2));

	const TestimonialCard = ({ logo }: { logo: string }) => {
		return (
			<figure
				className={cn(
					'relative h-full w-36 cursor-pointer overflow-hidden rounded-xl p-6',
					'transition-all duration-300'
				)}
			>
				<div className='flex flex-row items-center gap-3 mb-4'>
					<div className='rounded-full overflow-hidden flex items-center justify-center'>
						<Image
							src={logo}
							alt={`logo`}
							width={96}
							height={96}
							className='w-full h-full object-contain'
						/>
					</div>
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
						<Marquee pauseOnHover className='[--duration:25s] py-2'>
							{firstRow.map((testimonial) => (
								<TestimonialCard key={testimonial.id} {...testimonial} />
							))}
						</Marquee>
						<Marquee reverse pauseOnHover className='[--duration:25s] py-2'>
							{secondRow.map((testimonial) => (
								<TestimonialCard key={testimonial.id} {...testimonial} />
							))}
						</Marquee>
						<Marquee pauseOnHover className='[--duration:25s] py-2'>
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
