'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ELearningBanner = () => {
	const [mounted, setMounted] = useState(false);
	const [laptopMounted, setLaptopMounted] = useState(false);
	const [tabletMounted, setTabletMounted] = useState(false);
	const [phoneMounted, setPhoneMounted] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const containerRef = useRef<any>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		setMounted(true);

		// Stagger device animations
		const timers = [
			setTimeout(() => setLaptopMounted(true), 500),
			setTimeout(() => setTabletMounted(true), 1000),
			setTimeout(() => setPhoneMounted(true), 1500),
		];

		return () => timers.forEach((timer) => clearTimeout(timer));
	}, []);

	return (
		<div ref={containerRef} className='relative overflow-hidden'>
			{/* Video Background */}
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				className='absolute inset-0 w-full h-full object-cover z-0'
			>
				<source src='/videos/banner.mp4' type='video/mp4' />
			</video>

			{/* Clean Background Effects */}
			<div className='absolute inset-0 z-2'>
				{/* Subtle Geometric Pattern */}
				<div className='absolute inset-0 opacity-10'>
					<div className='absolute top-10 md:top-20 left-10 md:left-20 w-32 h-32 md:w-64 md:h-64 border border-blue-400 rounded-full animate-pulse'></div>
					<div className='absolute top-20 md:top-40 right-16 md:right-32 w-16 h-16 md:w-32 md:h-32 border border-cyan-400 rounded-full animate-pulse delay-1000'></div>
					<div className='absolute bottom-16 md:bottom-32 left-1/4 w-24 h-24 md:w-48 md:h-48 border border-purple-400 rounded-full animate-pulse delay-2000'></div>
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
			<div className='relative z-10'>
				<div className='relative z-10 container-lg px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[70vh] sm:min-h-[80vh] py-8 md:py-12 lg:py-0'>
						{/* Left Content */}
						<div className='space-y-6 md:space-y-8 text-center lg:text-left'>
							{/* Dynamic Title */}
							<div className='space-y-4 md:space-y-6'>
								<h1
									className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white !leading-tight transform transition-all duration-1000 delay-300 ${
										mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									TẬP ĐOÀN <br /> KHOA HỌC CÔNG NGHỆ <br /> BÁCH KHOA
								</h1>

								<p
									className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-none lg:max-w-2xl leading-relaxed font-light transform transition-all duration-1000 delay-700 ${
										mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
									}`}
								>
									Tiên phong trong chuyển đổi số toàn diện cho trường học với nền tảng{' '}
									<span className='text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold'>
										phần mềm, đào tạo và AI
									</span>
								</p>
							</div>

							{/* Advanced CTA Section */}
							<div
								className={`space-y-4 md:space-y-6 pt-2 transform transition-all duration-1000 delay-1000 ${
									mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
								}`}
							>
								<div className='flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start'>
									<Link
										href='/product'
										className='group flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#DDEFFB] text-[#19376B] font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width={20}
											height={20}
											viewBox='0 0 20 20'
											fill='none'
											className='transition-all duration-300'
										>
											<path
												d='M16.666 6.66663H3.33268V4.99996H16.666V6.66663ZM14.9993 1.66663H4.99935V3.33329H14.9993V1.66663ZM18.3327 9.99996V16.6666C18.3327 17.1087 18.1571 17.5326 17.8445 17.8451C17.532 18.1577 17.108 18.3333 16.666 18.3333H3.33268C2.89106 18.332 2.4679 18.156 2.15563 17.8437C1.84335 17.5314 1.66733 17.1082 1.66602 16.6666V9.99996C1.66733 9.55834 1.84335 9.13518 2.15563 8.82291C2.4679 8.51063 2.89106 8.33461 3.33268 8.33329H16.666C17.1076 8.33461 17.5308 8.51063 17.8431 8.82291C18.1553 9.13518 18.3314 9.55834 18.3327 9.99996ZM11.6052 14.2016L13.541 12.5466L10.9918 12.3333L9.99935 9.99996L9.00685 12.3333L6.45768 12.5466L8.39352 14.2016L7.81018 16.6666L9.99935 15.3566L12.1885 16.6666L11.6052 14.2016Z'
												fill='#19376B'
												className='group-hover:fill-white transition-all duration-300'
											/>
										</svg>
										<span>XEM SẢN PHẨM</span>
									</Link>
									<Link
										href='tel:+842871020246'
										className='group flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#DDEFFB] text-[#19376B] font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width={20}
											height={20}
											viewBox='0 0 20 20'
											fill='none'
											className='transition-all duration-300'
										>
											<path
												d='M5.71453 2.03756C6.66703 2.73172 7.4087 3.67922 8.04203 4.58589L8.41036 5.12256L8.75786 5.63506C8.93168 5.889 9.006 6.19801 8.96666 6.50322C8.92732 6.80843 8.77707 7.0885 8.54453 7.29006L6.9187 8.49756C6.84015 8.55428 6.78486 8.63758 6.76309 8.73199C6.74133 8.8264 6.75457 8.92551 6.80036 9.01089C7.1687 9.68006 7.8237 10.6767 8.5737 11.4267C9.3237 12.1767 10.3679 12.8751 11.0837 13.2851C11.1734 13.3354 11.2791 13.3495 11.3789 13.3244C11.4787 13.2993 11.5651 13.2369 11.6204 13.1501L12.6787 11.5392C12.8733 11.2808 13.1603 11.1076 13.4797 11.056C13.7991 11.0045 14.126 11.0785 14.392 11.2626L14.9445 11.6451C15.977 12.3617 17.0862 13.1759 17.9345 14.2617C18.0691 14.4349 18.1547 14.641 18.1824 14.8585C18.2101 15.0761 18.1789 15.297 18.092 15.4984C17.3945 17.1259 15.6295 18.5117 13.7937 18.4442L13.5437 18.4301L13.3495 18.4134L13.1345 18.3884L12.9004 18.3567L12.6462 18.3151L12.5129 18.2901L12.2329 18.2301L12.0862 18.1967L11.7812 18.1184L11.4604 18.0267L11.1254 17.9184C9.58703 17.3967 7.63453 16.3717 5.6312 14.3684C3.62786 12.3651 2.6037 10.4134 2.08203 8.87506L1.9737 8.54006L1.88203 8.21922L1.8037 7.91422L1.7387 7.62589C1.71994 7.53558 1.70244 7.44502 1.6862 7.35422L1.64453 7.10006L1.6112 6.86589L1.58703 6.65089L1.57036 6.45672L1.55703 6.20672C1.48953 4.37672 2.89036 2.59922 4.51036 1.90506C4.70534 1.82086 4.91886 1.78881 5.12997 1.81204C5.34108 1.83527 5.54252 1.91298 5.71453 2.03756ZM12.4937 5.03339L12.5904 5.04422C13.197 5.15122 13.7541 5.44751 14.1819 5.89062C14.6098 6.33374 14.8864 6.90092 14.972 7.51089C15.0026 7.72187 14.9511 7.93654 14.8282 8.11073C14.7053 8.28491 14.5203 8.40537 14.3113 8.44733C14.1023 8.48928 13.8851 8.44953 13.7045 8.33626C13.5239 8.223 13.3936 8.04482 13.3404 7.83839L13.3212 7.74256C13.2877 7.50347 13.1856 7.27922 13.0274 7.09688C12.8692 6.91454 12.6615 6.78193 12.4295 6.71506L12.3004 6.68589C12.0911 6.6488 11.9039 6.53317 11.7771 6.36265C11.6503 6.19212 11.5934 5.97959 11.6181 5.76851C11.6428 5.55744 11.7472 5.36377 11.91 5.22713C12.0727 5.09048 12.2815 5.02118 12.4937 5.03339ZM12.5004 2.50006C13.8264 2.50006 15.0982 3.02684 16.0359 3.96452C16.9736 4.90221 17.5004 6.17397 17.5004 7.50006C17.5001 7.71246 17.4188 7.91675 17.273 8.0712C17.1272 8.22564 16.9279 8.31859 16.7159 8.33103C16.5038 8.34348 16.295 8.2745 16.1322 8.13817C15.9693 8.00185 15.8646 7.80847 15.8395 7.59756L15.8337 7.50006C15.8336 6.65386 15.5117 5.83936 14.9332 5.22175C14.3548 4.60414 13.5631 4.22965 12.7187 4.17422L12.5004 4.16672C12.2793 4.16672 12.0674 4.07893 11.9111 3.92265C11.7548 3.76637 11.667 3.5544 11.667 3.33339C11.667 3.11238 11.7548 2.90042 11.9111 2.74414C12.0674 2.58785 12.2793 2.50006 12.5004 2.50006Z'
												fill='#19376B'
												className='group-hover:fill-white transition-all duration-300'
											/>
										</svg>
										<span>LIÊN HỆ NGAY</span>
									</Link>
								</div>
							</div>
						</div>

						{/* Right Content - Device Images */}
						<div className='relative mt-8 lg:mt-0 order-first lg:order-last'>
							{/* Main Laptop with Interactive Screen */}
							<div
								className={`relative mx-auto max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl z-10 overflow-hidden transform transition-all duration-1500 ${
									laptopMounted ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
								}`}
							>
								{/* Laptop Frame */}
								<Image
									src='/images/LAPTOP.png'
									alt='LMS360 Laptop Interface'
									width={800}
									height={600}
									className='w-full h-auto object-contain drop-shadow-2xl relative z-20'
									priority
								/>

								{/* Interactive Screen Content */}
								<div
									className='absolute top-[7%] left-[14.5%] right-[14.5%] bottom-[28%] bg-gray-900 rounded-md overflow-hidden cursor-pointer z-30 h-[83%]'
									onMouseEnter={() => setIsHovering(true)}
									onMouseLeave={() => setIsHovering(false)}
								>
									{/* Screen Glow Effect */}
									<div
										className={`absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-opacity duration-500 z-40 ${
											isHovering ? 'opacity-100' : 'opacity-0'
										}`}
									></div>

									{/* Full Page Website Preview */}
									<div className='relative w-full h-full overflow-hidden z-10'>
										<div className='website-preview'>
											<Image
												src='/images/full-page.jpeg'
												alt='Website Preview'
												width={1920}
												height={5000}
												className='w-full h-auto object-cover object-top'
												style={{
													transform: isHovering ? 'translateY(-70%)' : 'translateY(0)',
													transition: 'transform 6s ease-in-out',
												}}
											/>
										</div>
									</div>

									{/* Screen Reflection */}
									<div className='absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-30 pointer-events-none z-50'></div>
								</div>
							</div>

							{/* Tablet Image */}
							<div
								className={`absolute -right-2 sm:-right-4 -bottom-1/3 sm:-bottom-1/2 w-24 sm:w-32 md:w-48 lg:w-96 z-20 transform transition-all duration-1500 ${
									tabletMounted ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
								}`}
							>
								<Image
									src='/images/TABLET.png'
									alt='LMS360 Tablet Interface'
									width={500}
									height={400}
									className='w-full h-auto object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300'
								/>
							</div>

							{/* iPhone Image */}
							<div
								className={`absolute -left-0 -bottom-1/4 sm:-bottom-1/3 w-16 sm:w-20 md:w-24 lg:w-32 z-20 transform transition-all duration-1500 ${
									phoneMounted ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
								}`}
							>
								<Image
									src='/images/iphone.png'
									alt='LMS360 Mobile Interface'
									width={150}
									height={300}
									className='w-full h-auto object-contain drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Advanced CSS */}
			<style jsx>{`
				.website-preview img {
					transform-origin: top left;
				}
			`}</style>
		</div>
	);
};

export default ELearningBanner;
