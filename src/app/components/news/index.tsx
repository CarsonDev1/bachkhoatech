'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
	Play,
	Pause,
	Volume2,
	Maximize,
	MoreHorizontal,
	ArrowRight,
	Sparkles,
	Calendar,
	User,
	Eye,
} from 'lucide-react';
import Image from 'next/image';

const NewsSection = () => {
	const [mounted, setMounted] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
		fetchNews();

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

	const fetchNews = async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?page=1&limit=4`);
			const data = await response.json();
			setNews(data.docs || data.data || []);
		} catch (err: any) {
			setError('Không thể tải tin tức');
			console.error('Error fetching news:', err);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('vi-VN', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
		} catch {
			return dateString;
		}
	};

	const truncateText = (text: string, maxLength = 150) => {
		if (!text) return '';
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	};

	// Helper function to safely render values
	const safeRender = (value: any): string => {
		if (value === null || value === undefined) return '';
		if (typeof value === 'string' || typeof value === 'number') return String(value);
		if (typeof value === 'object') {
			// If it's an object, try to extract meaningful text
			if (value.text) return String(value.text);
			if (value.content) return String(value.content);
			if (value.name) return String(value.name);
			// If no meaningful property found, return empty string
			return '';
		}
		return String(value);
	};

	// Helper function to get image URL from complex image object
	const getImageUrl = (imageObj: any): string => {
		if (!imageObj) return '';
		if (typeof imageObj === 'string') return imageObj;
		if (imageObj.url) return imageObj.url;
		if (imageObj.thumbnailURL) return imageObj.thumbnailURL;
		if (imageObj.sizes?.medium?.url) return imageObj.sizes.medium.url;
		if (imageObj.sizes?.small?.url) return imageObj.sizes.small.url;
		return '';
	};

	// Helper function to extract text content from complex content object
	const extractContentText = (contentObj: any): string => {
		if (!contentObj) return '';
		if (typeof contentObj === 'string') return contentObj;

		// Handle Lexical editor format
		if (contentObj.root && contentObj.root.children) {
			let text = '';
			const extractFromChildren = (children: any[]) => {
				children.forEach((child: any) => {
					if (child.text) {
						text += child.text + ' ';
					}
					if (child.children) {
						extractFromChildren(child.children);
					}
				});
			};
			extractFromChildren(contentObj.root.children);
			return text.trim();
		}

		return '';
	};

	// Helper function to get author name
	const getAuthorName = (authors: any): string => {
		if (!authors) return '';
		if (typeof authors === 'string') return authors;
		if (Array.isArray(authors) && authors.length > 0) {
			return authors[0].name || '';
		}
		if (authors.name) return authors.name;
		return '';
	};

	return (
		<div
			ref={sectionRef}
			className='relative bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-100 py-16 px-4 overflow-hidden'
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

			<div className='relative z-10 max-w-7xl mx-auto'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12'>
					<div
						className={`mb-6 lg:mb-0 transform transition-all duration-1000 ${
							isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<h2 className='text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2 uppercase'>
							Tin tức
						</h2>
						<div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'></div>
					</div>

					<div
						className={`transform transition-all duration-1000 delay-300 ${
							isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
						}`}
					>
						<a
							href='/news'
							className='group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 overflow-hidden inline-block'
						>
							<div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
							<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12'></div>
							<span className='relative z-10 flex items-center justify-center'>
								XEM THÊM
								<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</span>
						</a>
					</div>
				</div>

				{/* News Content */}
				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
						{Array.from({ length: 4 }).map((_, index) => (
							<div
								key={index}
								className='group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl animate-pulse'
							>
								{/* Skeleton Image */}
								<div className='relative h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_infinite]'>
									<div className='absolute top-4 right-4 bg-gray-300 rounded-full w-12 h-6'></div>
								</div>

								{/* Skeleton Content */}
								<div className='relative z-30 p-6'>
									{/* Skeleton Meta Info */}
									<div className='flex items-center justify-between mb-3'>
										<div className='flex items-center'>
											<div className='w-4 h-4 bg-gray-300 rounded mr-2'></div>
											<div className='w-20 h-4 bg-gray-300 rounded'></div>
										</div>
										<div className='flex items-center'>
											<div className='w-4 h-4 bg-gray-300 rounded mr-2'></div>
											<div className='w-16 h-4 bg-gray-300 rounded'></div>
										</div>
									</div>

									{/* Skeleton Title */}
									<div className='mb-3 space-y-2'>
										<div className='w-full h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
										<div className='w-3/4 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
									</div>

									{/* Skeleton Description */}
									<div className='mb-4 space-y-2'>
										<div className='w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
										<div className='w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
										<div className='w-2/3 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
									</div>

									{/* Skeleton Button and Views */}
									<div className='flex items-center justify-between'>
										<div className='w-24 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl bg-[length:200%_100%] animate-[shimmer_2s_infinite]'></div>
										<div className='flex items-center'>
											<div className='w-4 h-4 bg-gray-300 rounded mr-2'></div>
											<div className='w-8 h-4 bg-gray-300 rounded'></div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				) : error ? (
					<div className='text-center py-20'>
						<div className='bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto'>
							<div className='text-red-600 text-lg font-semibold mb-2'>Oops!</div>
							<div className='text-red-500'>{error}</div>
							<button
								onClick={fetchNews}
								className='mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
							>
								Thử lại
							</button>
						</div>
					</div>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
						{news.map((article: any, index: number) => {
							const imageUrl = getImageUrl(article.heroImage || article.image);
							const contentText = extractContentText(article.content) || safeRender(article.description);
							const authorName = getAuthorName(article.authors || article.populatedAuthors);

							return (
								<div
									key={article.id || index}
									className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform transition-all duration-700 hover:scale-105 hover:-rotate-1 ${
										isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
									}`}
									style={{
										transitionDelay: isInView ? `${index * 200}ms` : '0ms',
									}}
								>
									{/* Hover Gradient Overlay */}
									<div className='absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500 z-10'></div>

									{/* Shimmer Effect */}
									<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-20'></div>

									{/* Image */}
									<div className='relative h-48 overflow-hidden'>
										{imageUrl ? (
											<Image
												width={300}
												height={300}
												src={`https://tintuc.lms360.vn${imageUrl}`}
												alt={safeRender(article.title)}
												className='w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110'
												onError={(e: any) => {
													e.target.style.display = 'none';
													e.target.nextSibling.style.display = 'flex';
												}}
											/>
										) : null}
										<div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 hidden items-center justify-center'>
											<Sparkles className='w-12 h-12 text-white' />
										</div>

										{/* Floating Badge */}
										<div className='absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold transform transition-transform duration-300 group-hover:scale-110'>
											HOT
										</div>
									</div>

									{/* Content */}
									<div className='relative z-30 p-6'>
										{/* Meta Info */}
										<div className='flex items-center justify-between mb-3 text-sm text-gray-500'>
											<div className='flex items-center'>
												<Calendar className='w-4 h-4 mr-1' />
												{formatDate(
													article.publishedAt || article.createdAt || article.created_at
												)}
											</div>
											{authorName && (
												<div className='flex items-center'>
													<User className='w-4 h-4 mr-1' />
													{authorName}
												</div>
											)}
										</div>

										{/* Title */}
										<h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2'>
											{safeRender(article.title)}
										</h3>

										{/* Description */}
										<p className='text-gray-600 mb-4 line-clamp-3'>
											{truncateText(contentText || safeRender(article.meta?.description))}
										</p>

										{/* Read More Button */}
										<div className='flex items-center justify-between'>
											<button className='group/btn relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden'>
												<div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300'></div>
												<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500 skew-x-12'></div>
												<span className='relative z-10 flex items-center'>
													Đọc thêm
													<ArrowRight className='ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
												</span>
											</button>

											{safeRender(article.views) && (
												<div className='flex items-center text-gray-500 text-sm'>
													<Eye className='w-4 h-4 mr-1' />
													{safeRender(article.views)}
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default NewsSection;
