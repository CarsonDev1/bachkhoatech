'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
	BookOpen,
	Globe,
	Play,
	Users,
	Award,
	ChevronRight,
	Sparkles,
	Zap,
	Brain,
	Rocket,
	Star,
	ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ELearningBanner = () => {
	const [mounted, setMounted] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const containerRef = useRef<any>(null);

	useEffect(() => {
		setMounted(true);

		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setMousePosition({
					x: (e.clientX - rect.left) / rect.width,
					y: (e.clientY - rect.top) / rect.height,
				});
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('mousemove', handleMouseMove);
			return () => container.removeEventListener('mousemove', handleMouseMove);
		}
	}, []);

	const floatingElements = [
		{
			Image: '/images/experiment.png',
			alt: 'THÍ NGHIỆM MÔ PHỎNG',
			delay: 0,
			scale: 1.2,
			color: 'from-pink-500 to-rose-500',
		},
		{
			Image: '/images/robot.png',
			alt: 'TRỢ LÝ CHAT360 AI',
			delay: 0.3,
			scale: 1.0,
			color: 'from-blue-500 to-cyan-500',
		},
		{
			Image: '/images/analysis.png',
			alt: 'ĐÀO TẠO ỨNG DỤNG AI',
			delay: 0.6,
			scale: 1.4,
			color: 'from-yellow-500 to-orange-500',
		},
		{
			Image: '/images/summer.png',
			alt: 'HỌC LIỆU TẬP HUẤN CHUYÊN MÔN HÈ',
			delay: 0.9,
			scale: 1.1,
			color: 'from-purple-500 to-indigo-500',
		},
	];

	return (
		<div
			ref={containerRef}
			className='relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden'
		>
			{/* Clean Background Effects */}
			<div className='absolute inset-0'>
				{/* Subtle Geometric Pattern */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-20 left-20 w-64 h-64 border border-blue-400 rounded-full animate-pulse'></div>
					<div className='absolute top-40 right-32 w-32 h-32 border border-cyan-400 rounded-full animate-pulse delay-1000'></div>
					<div className='absolute bottom-32 left-1/4 w-48 h-48 border border-purple-400 rounded-full animate-pulse delay-2000'></div>
				</div>

				{/* Minimal Floating Particles */}
				{mounted &&
					Array.from({ length: 30 }).map((_, i) => (
						<div
							key={i}
							className='absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 3}s`,
							}}
						/>
					))}

				{/* Gradient Overlay */}
				<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
			</div>

			{/* Main Content */}
			<div>
				<div className='relative z-10 container-lg'>
					<div className='grid lg:grid-cols-2 gap-16 items-center min-h-[90vh]'>
						{/* Left Content */}
						<div className='space-y-8'>
							{/* Animated Badge */}
							<div
								className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/30 rounded-full shadow-2xl transform transition-all duration-1000 hover:scale-105 ${
									mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								<div className='w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse mr-3'></div>
								<span className='text-blue-300 font-semibold tracking-wider'>LMS 360 E-LEARNING</span>
								<Sparkles className='w-4 h-4 text-yellow-400 ml-2 animate-pulse' />
							</div>

							{/* Dynamic Title */}
							<div className='space-y-6'>
								<h1
									className={`text-3xl sm:text-4xl lg:text-5xl font-black text-white !leading-tight transform transition-all duration-1000 delay-300 ${
										mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									NỀN TẢNG TIÊN PHONG CHUYỂN ĐỔI SỐ GIẢNG DẠY & HỌC TẬP
								</h1>

								<p
									className={`text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light transform transition-all duration-1000 delay-700 ${
										mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									Trải nghiệm tương lai của giáo dục với{' '}
									<span className='text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold'>
										công nghệ AI tiên tiến
									</span>
									, thực tế ảo và phương pháp học tập cá nhân hóa thông minh.
								</p>
							</div>

							{/* Advanced CTA Section */}
							<div
								className={`space-y-6 pt-2 transform transition-all duration-1000 delay-1000 ${
									mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								<div className='flex flex-col sm:flex-row gap-6'>
									<Link
										href='https://lms360.vn/'
										className='group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl font-bold text-white text-lg transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 overflow-hidden'
									>
										<div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
										<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12'></div>
										<span className='relative z-10 flex items-center justify-center'>
											<Rocket className='w-5 h-5 mr-2 group-hover:animate-bounce' />
											Khám phá ngay
											<ArrowRight className='w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform' />
										</span>
									</Link>
								</div>

								{/* Stats */}
								<div className='flex items-center justify-stretch gap-16 pt-2'>
									{[
										{ number: '1 Triệu +', label: 'Học viên' },
										{ number: '95%', label: 'Hài lòng' },
										{ number: '24/7', label: 'Hỗ trợ' },
									].map((stat, i) => (
										<div key={i} className='text-center group'>
											<div className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
												{stat.number}
											</div>
											<div className='text-gray-400 text-sm'>{stat.label}</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Right Content - 3D Interactive */}
						<div className='relative'>
							{/* Main 3D Device */}
							<div
								className={`relative perspective-1000 transform transition-all duration-1500 ${
									mounted
										? 'translate-x-0 opacity-100 rotate-y-0'
										: 'translate-x-10 opacity-0 rotate-y-12'
								}`}
							>
								<div
									className='relative mx-auto w-80 h-[500px] transform-gpu transition-transform duration-300 hover:rotate-y-6 hover:rotate-x-3'
									style={{
										transformStyle: 'preserve-3d',
										transform: `rotateY(${mousePosition.x * 10 - 5}deg) rotateX(${
											mousePosition.y * 10 - 5
										}deg)`,
									}}
								>
									{/* Device Shadow */}
									<div className='absolute inset-0 bg-gradient-to-b from-blue-600/30 to-purple-600/30 rounded-3xl blur-3xl transform translate-z-[-50px] scale-110'></div>

									{/* Device Body */}
									<div className='relative w-full h-[90%] bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-600 overflow-hidden transform-gpu'>
										{/* Screen */}
										<div className='absolute inset-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden'>
											{/* Screen Glow */}
											<div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse'></div>

											{/* Header */}
											<div className='relative h-16 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center'>
												<div className='flex items-center space-x-2'>
													<div className='size-14 bg-white/20 rounded-full flex items-center justify-center'>
														<Image
															src='/images/lms.png'
															alt='logo'
															width={300}
															height={300}
														/>
													</div>
													<span className='text-white font-bold text-lg'>E-LEARNING</span>
												</div>
											</div>

											{/* Content */}
											<div className='p-6'>
												{/* Feature Grid */}
												<div className='grid grid-cols-2 gap-4'>
													{floatingElements.slice(0, 4).map((elem, i) => (
														<div
															key={i}
															className={`p-4 bg-gradient-to-br ${
																elem.color
															} rounded-2xl transform transition-all duration-500 hover:scale-110 ${
																mounted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
															}`}
															style={{ transitionDelay: `${elem.delay + 1}s` }}
														>
															<Image
																src={elem.Image}
																alt={elem.alt}
																width={80}
																height={80}
															/>
															<div className='text-white/80 text-[10px] font-medium text-center'>
																{elem.alt}
															</div>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Floating Elements */}
							{mounted &&
								floatingElements.map((elem, index) => (
									<div
										key={index}
										className={`absolute w-20 h-20 bg-gradient-to-br ${elem.color} backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center transform transition-all duration-1000 hover:scale-125 cursor-pointer shadow-2xl`}
										style={{
											left: `${-50 + Math.random() * 400}px`,
											top: `${50 + Math.random() * 400}px`,
											animationDelay: `${elem.delay}s`,
											animation: `float3d 4s ease-in-out infinite ${elem.delay}s`,
											transform: `scale(${elem.scale})`,
										}}
									>
										<Image src={elem.Image} alt={elem.alt} width={80} height={80} />
										<div className='absolute inset-0 bg-white/10 rounded-3xl blur-xl'></div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>

			{/* Advanced CSS */}
			<style jsx>{`
				@keyframes float3d {
					0%,
					100% {
						transform: translateY(0px) rotateX(0deg) rotateY(0deg);
					}
					33% {
						transform: translateY(-20px) rotateX(10deg) rotateY(5deg);
					}
					66% {
						transform: translateY(10px) rotateX(-5deg) rotateY(-10deg);
					}
				}

				.perspective-1000 {
					perspective: 1000px;
				}

				.transform-gpu {
					transform-style: preserve-3d;
					backface-visibility: hidden;
				}

				.rotate-y-6 {
					transform: rotateY(6deg);
				}

				.rotate-x-3 {
					transform: rotateX(3deg);
				}

				.translate-z-[-50px] {
					transform: translateZ(-50px);
				}
			`}</style>
		</div>
	);
};

export default ELearningBanner;
