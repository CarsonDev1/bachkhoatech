'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const StatsSection = () => {
	const [mounted, setMounted] = useState(false);
	const [isInView, setIsInView] = useState(false);

	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);

		// Intersection Observer to detect when section comes into view
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						// Optional: Unobserve after first intersection to run animation only once
						// observer.unobserve(entry.target);
					} else {
						// Optional: Reset animation when out of view
						// setIsInView(false);
					}
				});
			},
			{
				threshold: 0.2, // Trigger when 20% of the section is visible
				rootMargin: '0px 0px -100px 0px', // Start animation 100px before the section comes into view
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	const statsData = [
		{
			id: 1,
			title: '10 Sở GD&ĐT',
			icon: '/images/icon-01.png',
			color: 'from-red-500 to-red-600',
			delay: 0,
		},
		{
			id: 2,
			title: '130 Phòng GD&ĐT',
			icon: '/images/icon-02.png',
			color: 'from-green-500 to-green-600',
			delay: 100,
		},
		{
			id: 3,
			title: '800 Trường học',
			icon: '/images/icon-03.png',
			color: 'from-blue-500 to-blue-600',
			delay: 200,
		},
		{
			id: 4,
			title: '60.000 Giáo viên',
			icon: '/images/icon-04.png',
			color: 'from-emerald-500 to-emerald-600',
			delay: 300,
		},
		{
			id: 5,
			title: '1.000.000 Học sinh',
			icon: '/images/icon-05.png',
			color: 'from-yellow-500 to-orange-500',
			delay: 400,
		},
		{
			id: 6,
			title: '1.900.000 Phụ huynh',
			icon: '/images/icon-06.png',
			color: 'from-cyan-500 to-blue-500',
			delay: 500,
		},
		{
			id: 7,
			title: '900.000 Khóa học',
			icon: '/images/icon-07.png',
			color: 'from-purple-500 to-purple-600',
			delay: 600,
		},
		{
			id: 8,
			title: '5.000.000 Bài giảng Elearning',
			icon: '/images/icon-08.png',
			color: 'from-pink-500 to-rose-500',
			delay: 700,
		},
	];

	return (
		<div
			ref={sectionRef}
			className='relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-16 px-4 overflow-hidden'
		>
			{/* Background Effects */}
			<div className='absolute inset-0'>
				{/* Floating Particles */}
				{mounted &&
					isInView &&
					Array.from({ length: 15 }).map((_, i) => (
						<div
							key={i}
							className='absolute w-3 h-3 bg-blue-400/20 rounded-full animate-pulse'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 4}s`,
								animationDuration: `${3 + Math.random() * 2}s`,
							}}
						/>
					))}

				{/* Geometric Patterns */}
				<div className='absolute inset-0 opacity-5'>
					<div
						className={`absolute top-10 left-10 w-40 h-40 border-2 border-blue-400 rounded-lg rotate-12 transition-all duration-1000 ${
							isInView ? 'animate-pulse' : 'opacity-0'
						}`}
					></div>
					<div
						className={`absolute bottom-10 right-10 w-32 h-32 border-2 border-purple-400 rounded-lg -rotate-12 transition-all duration-1000 delay-500 ${
							isInView ? 'animate-pulse' : 'opacity-0'
						}`}
					></div>
					<div
						className={`absolute top-1/3 right-1/4 w-20 h-20 border-2 border-cyan-400 rounded-lg rotate-45 transition-all duration-1000 delay-1000 ${
							isInView ? 'animate-pulse' : 'opacity-0'
						}`}
					></div>
				</div>
			</div>

			<div className='relative z-10 container-lg'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12'>
					<div
						className={`mb-6 lg:mb-0 transform transition-all duration-1000 ${
							isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<h2 className='text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2 uppercase'>
							đơn vị đồng hành
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'></div>
					</div>

					<div
						className={`transform transition-all duration-1000 delay-300 ${
							isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<button className='group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12'></div>
							<span className='relative z-10 flex items-center justify-center'>
								XEM THÊM
								<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</span>
						</button>
					</div>
				</div>

				{/* Stats Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{statsData.map((stat, index) => {
						const IconComponent = stat.icon;
						return (
							<div
								key={stat.id}
								className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transform transition-all duration-700 hover:scale-105 hover:-rotate-1 ${
									isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
								}`}
								style={{
									transitionDelay: isInView ? `${stat.delay}ms` : '0ms',
								}}
							>
								{/* Hover Gradient Overlay */}
								<div
									className={`absolute inset-0 bg-gradient-to-br ${stat.color}/0 group-hover:${stat.color}/10 transition-all duration-500 rounded-3xl`}
								></div>

								{/* Shimmer Effect */}
								<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-3xl'></div>

								{/* Icon Background Circle */}
								<div
									className={`relative mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}
								>
									<Image
										src={stat.icon}
										alt={stat.title}
										width={300}
										height={300}
										className='size-20 text-white relative z-10'
									/>
								</div>

								{/* Stats Text */}
								<div className='relative z-10'>
									<h3
										className={`text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r ${stat.color} bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300`}
									>
										{stat.title.split(' ')[0]}
									</h3>
									<p className='text-gray-600 font-semibold text-lg group-hover:text-gray-700 transition-colors duration-300'>
										{stat.title.split(' ').slice(1).join(' ')}
									</p>
								</div>

								{/* Floating Elements */}
								<div className='absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping'></div>
								<div className='absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse delay-200'></div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default StatsSection;
