'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, MoreHorizontal, ArrowRight, Sparkles } from 'lucide-react';

const LMSIntroSection = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [isInView, setIsInView] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
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

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration);
		}
	};

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (videoRef.current) {
			const rect = e.currentTarget.getBoundingClientRect();
			const clickX = e.clientX - rect.left;
			const newTime = (clickX / rect.width) * duration;
			videoRef.current.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const toggleFullscreen = () => {
		if (videoRef.current) {
			if (videoRef.current.requestFullscreen) {
				videoRef.current.requestFullscreen();
			}
		}
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

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
					Array.from({ length: 20 }).map((_, i) => (
						<div
							key={i}
							className='absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse'
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 3}s`,
							}}
						/>
					))}

				{/* Geometric Patterns */}
				<div className='absolute inset-0 opacity-5'>
					<div
						className={`absolute top-20 left-20 w-32 h-32 border-2 border-blue-400 rounded-full transition-all duration-1000 ${
							isInView ? 'animate-pulse' : 'opacity-0'
						}`}
					></div>
					<div
						className={`absolute bottom-20 right-20 w-24 h-24 border-2 border-indigo-400 rounded-full transition-all duration-1000 delay-500 ${
							isInView ? 'animate-pulse' : 'opacity-0'
						}`}
					></div>
					<div
						className={`absolute top-1/2 left-1/4 w-16 h-16 border-2 border-cyan-400 rounded-full transition-all duration-1000 delay-1000 ${
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
						<h2 className='text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2'>
							GIỚI THIỆU
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

				{/* Content Grid */}
				<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
					{/* Text Content */}
					<div className='space-y-6'>
						<div className='prose prose-lg max-w-none space-y-0'>
							<p
								className={`text-gray-700 leading-relaxed text-lg transform transition-all duration-1000 delay-500 ${
									isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								Hệ thống LMS 360 e-Learning là phần mềm{' '}
								<span className='text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold'>
									tiên phong
								</span>{' '}
								phục vụ lĩnh vực chuyển đổi số trong dạy, học và kiểm tra đánh giá, tích hợp nhiều tính
								năng thuận tiện nhất dành cho người dùng. Hệ thống được thiết kế theo mô hình quản lý
								cấp Sở - Phòng - Hiệu trưởng - Giáo viên - Học sinh - Phụ huynh.
							</p>
							<p
								className={`text-gray-700 leading-relaxed text-lg transform transition-all duration-1000 delay-700 ${
									isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								Phần mềm kết nối người học với những bài giảng{' '}
								<span className='text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold'>
									tương tác chuyên sâu
								</span>
								, chất lượng thông qua các giai đoạn từ chuẩn bị bài, các hoạt động trên lớp, kiểm tra
								đánh giá. Giúp giáo viên xây dựng các học liệu số tương tác, xây dựng các bài kiểm tra
								đánh giá đa dạng.
							</p>

							<p
								className={`text-gray-700 leading-relaxed text-lg transform transition-all duration-1000 delay-900 ${
									isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								Có thể{' '}
								<span className='text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold'>
									giám sát toàn bộ quá trình học tập
								</span>{' '}
								của học sinh, tạo điều kiện thuận lợi để nhà trường tổ chức thành công mô hình dạy học
								trực tuyến kết hợp trực tuyến.
							</p>
						</div>
					</div>

					{/* Video Player */}
					<div
						className={`relative transform transition-all duration-1500 delay-1000 ${
							isInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
						}`}
					>
						<div className='relative bg-black rounded-2xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-shadow duration-500'>
							{/* Glow Effect */}
							<div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

							{/* Video Container */}
							<div className='relative aspect-video'>
								{/* Video Element */}
								<video
									ref={videoRef}
									className='w-full h-full object-cover'
									onTimeUpdate={handleTimeUpdate}
									onLoadedMetadata={handleLoadedMetadata}
									onEnded={() => setIsPlaying(false)}
									poster='/images/poster-video.png'
								>
									<source src='/videos/lms360.mp4' type='video/mp4' />
									Your browser does not support the video tag.
								</video>

								{/* Play Button Overlay */}
								{!isPlaying && (
									<div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
										<button
											onClick={togglePlay}
											className='group w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50'
										>
											<Play className='w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform' />
										</button>
									</div>
								)}
							</div>

							{/* Custom Video Controls */}
							<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-all duration-300'>
								<div className='flex items-center justify-between'>
									<div className='flex items-center space-x-4'>
										<button
											onClick={togglePlay}
											className='text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-white/10'
										>
											{isPlaying ? <Pause className='w-6 h-6' /> : <Play className='w-6 h-6' />}
										</button>
										<span className='text-white text-sm font-medium'>
											{formatTime(currentTime)} / {formatTime(duration)}
										</span>
									</div>

									<div className='flex items-center space-x-3'>
										<button
											onClick={toggleMute}
											className='text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-white/10'
										>
											<Volume2 className={`w-5 h-5 ${isMuted ? 'text-red-400' : ''}`} />
										</button>
										<button
											onClick={toggleFullscreen}
											className='text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-white/10'
										>
											<Maximize className='w-5 h-5' />
										</button>
										<button className='text-white hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-white/10'>
											<MoreHorizontal className='w-5 h-5' />
										</button>
									</div>
								</div>

								{/* Progress Bar */}
								<div
									className='mt-3 w-full bg-white/20 rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200'
									onClick={handleProgressClick}
								>
									<div
										className='bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full transition-all duration-300 relative'
										style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
									>
										<div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LMSIntroSection;
