'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, MoreHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

const LMSIntroSection = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(true); // Khởi tạo true vì video muted ban đầu
	const [mounted, setMounted] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [hasBeenInView, setHasBeenInView] = useState(false);

	// Thêm state cho text expansion
	const [isTextExpanded, setIsTextExpanded] = useState(false);

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
						setHasBeenInView(true);
						// Auto play video when it comes into view
						if (videoRef.current) {
							videoRef.current.play();
							setIsPlaying(true);
						}
					} else {
						// Pause video when out of view
						if (videoRef.current) {
							videoRef.current.pause();
							setIsPlaying(false);
						}
						setIsInView(false);
					}
				});
			},
			{
				threshold: 0.5, // Trigger when 50% of the section is visible
				rootMargin: '0px 0px -100px 0px', // Start animation 100px before the section comes into view
			}
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		// Đồng bộ state với video element khi component mount
		if (videoRef.current) {
			setIsMuted(videoRef.current.muted);
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
			// Đồng bộ lại state khi metadata load xong
			setIsMuted(videoRef.current.muted);
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
			const newMutedState = !isMuted;
			videoRef.current.muted = newMutedState;
			setIsMuted(newMutedState);
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
		<div ref={sectionRef} className='relative py-8 lg:py-16 overflow-hidden bg-white'>
			<div className='relative z-10 container-lg'>
				<div
					className={`mb-12 text-center transform transition-all duration-1000 ${
						hasBeenInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
					}`}
				>
					{/* Main title with dashed border */}
					<div className='relative inline-block mx-auto max-w-4xl'>
						<div className='flex flex-col items-center justify-center'>
							<h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-[#666] leading-tight'>
								Từ tầm nhìn <span className='text-blue-600'>chiến lược</span> đến{' '}
								<span className='text-blue-600'>hành động cụ thể</span>
							</h2>
						</div>

						{/* Subtitle */}
						<div className='mt-6 px-4'>
							<p className='text-lg lg:text-xl text-[#666] leading-relaxed max-w-3xl mx-auto'>
								Chúng tôi phát triển hệ sinh thái các giải pháp công nghệ giáo dục toàn diện,
								<br className='hidden lg:block' />
								đáp ứng mọi nhu cầu của nhà trường
							</p>
						</div>
					</div>
				</div>
				<div className='relative z-10 p-4 md:p-6'>
					<div className='absolute inset-0'>
						<Image src='/images/bg-intro.png' alt='intro-bg' fill className='object-cover rounded-xl' />
					</div>
					{/* Header */}
					<div className='flex justify-center items-center mb-0 lg:mb-12'>
						<div
							className={`mb-6 text-center lg:mb-0 transform transition-all duration-1000 ${
								hasBeenInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
							}`}
						>
							<h2 className='text-xl lg:text-2xl font-bold text-[#19376B] mb-1'>GIỚI THIỆU</h2>
							<div className='w-full h-1 bg-[#19376B] rounded-full'></div>
						</div>
					</div>

					{/* Content Grid */}
					<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
						{/* Text Content */}
						<div className='space-y-6'>
							<div className='prose prose-lg max-w-none space-y-0'>
								<p
									className={`text-gray-700 leading-relaxed text-lg transform transition-all duration-1000 delay-500 ${
										hasBeenInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									Với sứ mệnh "Công nghệ vì tương lai giáo dục", Tập đoàn Khoa học Công nghệ Bách Khoa
									xây dựng hệ sinh thái giải pháp toàn diện – từ nền tảng dạy, học, kiểm tra đánh giá
									trực tuyến, quản lý nhà trường, đánh giá năng lực, đến tích hợp trí tuệ nhân tạo hỗ
									trợ dạy và học.
								</p>

								{/* Đoạn text thứ 2 - responsive */}
								<div className='relative'>
									<p
										className={`text-gray-700 leading-relaxed text-lg transform transition-all duration-1000 delay-700 ${
											hasBeenInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
										} ${
											// Trên mobile: ẩn text nếu chưa expand
											!isTextExpanded ? 'lg:block hidden' : 'block'
										}`}
									>
										Bằng năng lực công nghệ vững mạnh, tư duy đổi mới sáng tạo và đội ngũ giàu kinh
										nghiệm, Bách Khoa đã và đang đồng hành cùng hàng nghìn trường học, góp phần nâng
										cao chất lượng giáo dục và thúc đẩy phát triển nguồn nhân lực số cho quốc gia.
									</p>

									{/* Nút "Xem thêm" chỉ hiển thị trên mobile */}
									<div className='block lg:hidden mt-4'>
										<button
											onClick={() => setIsTextExpanded(!isTextExpanded)}
											className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200'
										>
											{isTextExpanded ? (
												<>
													Thu gọn
													<svg
														className='w-4 h-4 ml-1 transform rotate-180'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M19 9l-7 7-7-7'
														/>
													</svg>
												</>
											) : (
												<>
													Xem thêm
													<svg
														className='w-4 h-4 ml-1'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M19 9l-7 7-7-7'
														/>
													</svg>
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Video Player */}
						<div
							className={`relative transform transition-all duration-1500 delay-1000 ${
								hasBeenInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
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
										muted
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
												{isPlaying ? (
													<Pause className='w-6 h-6' />
												) : (
													<Play className='w-6 h-6' />
												)}
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
												{isMuted ? (
													<VolumeX className='w-5 h-5 text-red-400' />
												) : (
													<Volume2 className='w-5 h-5' />
												)}
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
		</div>
	);
};

export default LMSIntroSection;
