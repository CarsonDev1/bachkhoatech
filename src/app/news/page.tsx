import React from 'react';
import { Calendar, Eye, Clock, User2, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';

// SEO Metadata
export const metadata: Metadata = {
	title: 'Tin Tức | Bách Khoa Technology',
	description:
		'Cập nhật tin tức mới nhất về công nghệ, giáo dục, khoa học và xu hướng chuyển đổi số từ Bách Khoa Technology.',
	keywords: 'tin tức công nghệ, tin tức giáo dục, chuyển đổi số, AI, machine learning, e-learning',
	openGraph: {
		title: 'Tin Tức | Bách Khoa Technology',
		description: 'Tin tức mới nhất về công nghệ giáo dục và chuyển đổi số',
		type: 'website',
		images: ['/images/logo.png'],
	},
};

// API Functions
async function fetchNews(page = 1, limit = 100) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?page=${page}&limit=${limit}`, {
			next: { revalidate: 3600 },
		});
		const data = await response.json();
		return data.docs || data.data || [];
	} catch (error) {
		console.error('Error fetching news:', error);
		return [];
	}
}

async function fetchFeaturedNews() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?page=1&limit=6&featured=true`, {
			next: { revalidate: 3600 },
		});
		const data = await response.json();
		return data.docs || data.data || [];
	} catch (error) {
		console.error('Error fetching featured news:', error);
		return [];
	}
}

// Helper Functions
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

const safeRender = (value: any): string => {
	if (value === null || value === undefined) return '';
	if (typeof value === 'string' || typeof value === 'number') return String(value);
	if (typeof value === 'object') {
		if (value.text) return String(value.text);
		if (value.content) return String(value.content);
		if (value.name) return String(value.name);
		return '';
	}
	return String(value);
};

const getImageUrl = (imageObj: any): string => {
	if (!imageObj) return '/images/placeholder-news.jpg';
	if (typeof imageObj === 'string') return imageObj;
	if (imageObj.url) return imageObj.url;
	if (imageObj.thumbnailURL) return imageObj.thumbnailURL;
	if (imageObj.sizes?.medium?.url) return imageObj.sizes.medium.url;
	if (imageObj.sizes?.small?.url) return imageObj.sizes.small.url;
	return '/images/placeholder-news.jpg';
};

const extractContentText = (contentObj: any): string => {
	if (!contentObj) return '';
	if (typeof contentObj === 'string') return contentObj;

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

const getAuthorName = (authors: any): string => {
	if (!authors) return 'Bách Khoa Technology';
	if (typeof authors === 'string') return authors;
	if (Array.isArray(authors) && authors.length > 0) {
		return authors[0].name || 'Bách Khoa Technology';
	}
	if (authors.name) return authors.name;
	return 'Bách Khoa Technology';
};

const getArticleCategories = (categories: any[]): string[] => {
	if (!Array.isArray(categories)) return [];
	return categories
		.map((cat) => {
			if (typeof cat === 'string') return cat;
			if (cat && cat.title) return cat.title;
			if (cat && cat.name) return cat.name;
			return '';
		})
		.filter(Boolean);
};

const NewsPage = async () => {
	const [allNews, featuredNews] = await Promise.all([fetchNews(1, 100), fetchFeaturedNews()]);

	// Group articles by categories.title
	const categorizedNews = allNews.reduce((acc: any, article: any) => {
		const articleCategories = getArticleCategories(article.categories || []);

		if (articleCategories.length > 0) {
			const primaryCategory = articleCategories[0];
			if (!acc[primaryCategory]) {
				acc[primaryCategory] = [];
			}
			acc[primaryCategory].push(article);
		} else {
			if (!acc['Tin tức chung']) {
				acc['Tin tức chung'] = [];
			}
			acc['Tin tức chung'].push(article);
		}

		return acc;
	}, {});

	const categoryEntries = Object.entries(categorizedNews).sort(([, a]: any, [, b]: any) => b.length - a.length);

	const getNewsByCategory = (categoryTitle: string, limit = 4) => {
		return (categorizedNews[categoryTitle] || []).slice(0, limit);
	};

	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className={`mb-6`}>
					<h2 className='text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2 uppercase'>
						Bản tin bách khoa
					</h2>
					<div className='w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full'></div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
					{/* Main Content */}
					<div className='lg:col-span-3 space-y-12'>
						{categoryEntries.map(([categoryTitle, articles]: any) => {
							const currentCategoryNews = getNewsByCategory(categoryTitle);
							if (currentCategoryNews.length === 0) return null;

							return (
								<section key={categoryTitle} className='border-b border-gray-200 pb-12 last:border-b-0'>
									{/* Category Header */}
									<div className='mb-8'>
										<div className='flex items-center justify-between'>
											<h2 className='text-2xl font-bold text-gray-900'>{categoryTitle}</h2>
											<span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>
												{currentCategoryNews.length} bài viết
											</span>
										</div>
									</div>

									{/* Category Content */}
									<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
										{/* Featured Article */}
										{currentCategoryNews[0] && (
											<Link
												href={`/news/${currentCategoryNews[0].slug}`}
												className='lg:col-span-2 group block'
											>
												<article>
													<div className='relative mb-4 overflow-hidden bg-gray-100 rounded-lg'>
														<ImageWithFallback
															src={`https://tintuc.lms360.vn${getImageUrl(
																currentCategoryNews[0].heroImage ||
																	currentCategoryNews[0].image
															)}`}
															alt={safeRender(currentCategoryNews[0].title)}
															width={600}
															height={400}
															className='w-full h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105'
														/>
														{/* Category badge */}
														{getArticleCategories(
															currentCategoryNews[0].categories || []
														)[0] && (
															<div className='absolute top-4 left-4'>
																<span className='bg-black text-white px-3 py-1 text-sm font-medium rounded'>
																	{
																		getArticleCategories(
																			currentCategoryNews[0].categories || []
																		)[0]
																	}
																</span>
															</div>
														)}
													</div>
													<h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors leading-tight'>
														{safeRender(currentCategoryNews[0].title)}
													</h3>
													<p className='text-gray-600 leading-relaxed mb-4'>
														{truncateText(
															extractContentText(currentCategoryNews[0].content) ||
																safeRender(currentCategoryNews[0].meta?.description),
															200
														)}
													</p>
													<div className='flex items-center justify-between pt-4 border-t border-gray-100'>
														<div className='flex items-center text-sm text-gray-500 space-x-4'>
															<div className='flex items-center'>
																<User2 className='w-4 h-4 mr-1' />
																<span>
																	{getAuthorName(currentCategoryNews[0].authors)}
																</span>
															</div>
															<div className='flex items-center'>
																<Calendar className='w-4 h-4 mr-1' />
																<span>
																	{formatDate(
																		currentCategoryNews[0].publishedAt ||
																			currentCategoryNews[0].createdAt
																	)}
																</span>
															</div>
															{currentCategoryNews[0].views && (
																<div className='flex items-center'>
																	<Eye className='w-4 h-4 mr-1' />
																	<span>
																		{currentCategoryNews[0].views.toLocaleString()}
																	</span>
																</div>
															)}
														</div>
														<div className='text-gray-900 hover:text-gray-700 font-medium text-sm flex items-center group/btn'>
															Đọc tiếp
															<ArrowRight className='w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform' />
														</div>
													</div>
												</article>
											</Link>
										)}

										{/* Side Articles */}
										<div className='space-y-6'>
											{currentCategoryNews.slice(1, 4).map((article: any, index: number) => (
												<Link
													key={index}
													href={`/news/${article.slug}`}
													className='group block pb-6 border-b border-gray-100 last:border-b-0 last:pb-0'
												>
													<article>
														<div className='flex gap-4'>
															<div className='relative w-20 h-16 flex-shrink-0 overflow-hidden bg-gray-100 rounded-md'>
																<ImageWithFallback
																	src={`https://tintuc.lms360.vn${getImageUrl(
																		article.heroImage || article.image
																	)}`}
																	alt={safeRender(article.title)}
																	width={80}
																	height={64}
																	className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
																/>
															</div>
															<div className='flex-1 min-w-0'>
																<h4 className='font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 text-sm mb-2 leading-tight'>
																	{safeRender(article.title)}
																</h4>
																<p className='text-gray-600 text-xs line-clamp-2 mb-3 leading-relaxed'>
																	{truncateText(
																		extractContentText(article.content) ||
																			safeRender(article.meta?.description),
																		100
																	)}
																</p>
																<div className='flex items-center justify-between text-xs text-gray-500'>
																	<div className='flex items-center'>
																		<Clock className='w-3 h-3 mr-1' />
																		<span>
																			{formatDate(
																				article.publishedAt || article.createdAt
																			)}
																		</span>
																	</div>
																	{getArticleCategories(
																		article.categories || []
																	)[0] && (
																		<span className='bg-gray-100 text-gray-700 px-2 py-1 text-xs'>
																			{
																				getArticleCategories(
																					article.categories || []
																				)[0]
																			}
																		</span>
																	)}
																</div>
															</div>
														</div>
													</article>
												</Link>
											))}
										</div>
									</div>
								</section>
							);
						})}

						{/* Job Recruitment Section */}
						{allNews.filter(
							(article: any) =>
								article.so_luong_can_tuyen ||
								article.han_nop_ho_so ||
								(article.title && article.title.toLowerCase().includes('tuyển dụng'))
						).length > 0 && (
							<section className='border-t border-gray-200 pt-12'>
								<div className='mb-8'>
									<h2 className='text-2xl font-bold text-gray-900 flex items-center'>
										<User2 className='w-6 h-6 mr-3' />
										Tuyển dụng
									</h2>
								</div>
								<div className='space-y-6'>
									{allNews
										.filter(
											(article: any) =>
												article.so_luong_can_tuyen ||
												article.han_nop_ho_so ||
												(article.title && article.title.toLowerCase().includes('tuyển dụng'))
										)
										.slice(0, 3)
										.map((job: any, index: number) => (
											<Link
												key={index}
												href={`/news/${job.slug}`}
												className='block border border-gray-200 p-6 hover:border-gray-300 transition-colors'
											>
												<article>
													<h4 className='font-semibold text-gray-900 text-lg mb-3 line-clamp-2'>
														{safeRender(job.title)}
													</h4>
													<p className='text-gray-600 mb-4 line-clamp-2'>
														{truncateText(
															extractContentText(job.content) ||
																safeRender(job.meta?.description),
															150
														)}
													</p>
													<div className='flex items-center justify-between text-sm text-gray-500'>
														<span>
															{job.han_nop_ho_so
																? `Hạn nộp: ${formatDate(job.han_nop_ho_so)}`
																: `Ngày đăng: ${formatDate(
																		job.publishedAt || job.createdAt
																  )}`}
														</span>
														{job.so_luong_can_tuyen && (
															<span className='bg-gray-900 text-white px-3 py-1 text-xs font-medium'>
																{job.so_luong_can_tuyen} vị trí
															</span>
														)}
													</div>
												</article>
											</Link>
										))}
								</div>
							</section>
						)}
					</div>

					{/* Sidebar */}
					<div className='lg:col-span-1 space-y-8 sticky top-24 self-start'>
						{/* Related News */}
						<div className='border border-gray-200 p-6 rounded-lg'>
							<h3 className='font-bold text-gray-900 text-lg mb-6'>Tin nổi bật</h3>
							<div className='space-y-6'>
								{featuredNews.slice(0, 5).map((article: any, index: number) => (
									<Link
										key={index}
										href={`/news/${article.slug}`}
										className='group block pb-6 border-b border-gray-100 last:border-b-0 last:pb-0'
									>
										<article>
											<div className='flex gap-3 mb-3'>
												<div className='relative w-16 h-12 flex-shrink-0 overflow-hidden bg-gray-100 rounded'>
													<ImageWithFallback
														src={`https://tintuc.lms360.vn${getImageUrl(
															article.heroImage || article.image
														)}`}
														alt={safeRender(article.title)}
														width={64}
														height={48}
														className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
													/>
												</div>
												<div className='flex-1 min-w-0'>
													<h4 className='text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight mb-2'>
														{safeRender(article.title)}
													</h4>
													<div className='flex items-center text-xs text-gray-500'>
														<Calendar className='w-3 h-3 mr-1' />
														<span>
															{formatDate(article.publishedAt || article.createdAt)}
														</span>
													</div>
												</div>
											</div>
										</article>
									</Link>
								))}
							</div>
						</div>

						{/* Contact Info */}
						<div className='border border-gray-200 p-6 rounded-lg'>
							<h3 className='font-bold text-gray-900 text-lg mb-6'>Liên hệ</h3>
							<div className='space-y-4 text-sm'>
								<div>
									<p className='font-medium text-gray-900 mb-1'>Hotline</p>
									<p className='text-gray-600'>1900 6868</p>
								</div>
								<div>
									<p className='font-medium text-gray-900 mb-1'>Email</p>
									<p className='text-gray-600'>info@bachkhoatech.com</p>
								</div>
								<div>
									<p className='font-medium text-gray-900 mb-1'>Website</p>
									<p className='text-gray-600'>bachkhoatech.com</p>
								</div>
							</div>
						</div>

						{/* App Download */}
						<div className='border border-gray-200 p-6 rounded-lg'>
							<h3 className='font-bold text-gray-900 text-lg mb-6'>Ứng dụng</h3>
							<div className='space-y-4'>
								<ImageWithFallback
									src='/images/google-play-download.png'
									alt='Google Play'
									width={150}
									height={50}
									className='w-full h-auto hover:opacity-80 transition-opacity rounded'
								/>
								<ImageWithFallback
									src='/images/app-store-download.png'
									alt='App Store'
									width={150}
									height={50}
									className='w-full h-auto hover:opacity-80 transition-opacity rounded'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsPage;
