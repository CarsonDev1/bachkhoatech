import React from 'react';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import ContentRenderer from './components/ContentRenderer';

interface NewsDetailPageProps {
	params: {
		slug: string;
	};
}

// Fetch và parse chỉ phần content bài viết
async function fetchNewsContent(slug: string) {
	try {
		const response = await fetch(`https://tintuc.lms360.vn/posts/${slug}`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			return null;
		}

		const htmlContent = await response.text();

		// Parse title
		const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
		const title = titleMatch ? titleMatch[1].replace(' | Tin tức', '').trim() : 'Bài viết';

		// Parse meta description
		const descMatch = htmlContent.match(/<meta name="description" content="(.*?)"/i);
		const description = descMatch ? descMatch[1] : '';

		// Parse date
		const dateMatch = htmlContent.match(/(\d{2}\/\d{2}\/\d{4})/);

		// Parse main content - thay flag s bằng [\s\S]* để tương thích ES2017
		let content = '';

		// Các selector có thể chứa nội dung chính - sử dụng [\s\S] thay cho . với flag s
		const contentSelectors = [
			// Selector cho content chính của bài viết
			/<div[^>]*class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
			/<div[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
			/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
			/<article[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/article>/i,
			/<main[^>]*>([\s\S]*?)<\/main>/i,
			// Fallback - lấy từ sau title đến trước footer
			/<h1[^>]*>[\s\S]*?<\/h1>([\s\S]*?)(?=<footer|<\/body|<div[^>]*class="[^"]*footer)/i,
		];

		for (const selector of contentSelectors) {
			const match = htmlContent.match(selector);
			if (match && match[1] && match[1].trim().length > 200) {
				content = match[1].trim();
				break;
			}
		}

		// Nếu không tìm được content cụ thể, lấy toàn bộ body và clean up
		if (!content) {
			const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
			if (bodyMatch) {
				content = bodyMatch[1];
			}
		}

		// Clean up content - thay flag s bằng g
		if (content) {
			// Remove unwanted elements - sử dụng [\s\S] thay cho . với flag s
			content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
			content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
			content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
			content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
			content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
			content = content.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '');

			// Remove comments
			content = content.replace(/<!--[\s\S]*?-->/gi, '');

			// Fix image paths thành absolute URLs
			content = content.replace(
				/src="\/([^"]*\.(?:jpg|jpeg|png|gif|webp))"/gi,
				'src="https://tintuc.lms360.vn/$1"'
			);
			content = content.replace(
				/src="\.\.\/([^"]*\.(?:jpg|jpeg|png|gif|webp))"/gi,
				'src="https://tintuc.lms360.vn/$1"'
			);

			// Fix API media file paths
			content = content.replace(
				/src="\/api\/media\/file\/([^"]*)"/gi,
				'src="https://tintuc.lms360.vn/api/media/file/$1"'
			);

			// Fix any other relative image paths
			content = content.replace(
				/src="\/([^"]*\.(?:jpg|jpeg|png|gif|webp|svg|bmp|tiff))"/gi,
				'src="https://tintuc.lms360.vn/$1"'
			);

			// Fix any relative links
			content = content.replace(/href="\/([^"]*)"/gi, 'href="https://tintuc.lms360.vn/$1"');

			// Remove any remaining navigation or menu items
			content = content.replace(/<div[^>]*class="[^"]*menu[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
			content = content.replace(/<div[^>]*class="[^"]*nav[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
			content = content.replace(/<ul[^>]*class="[^"]*menu[^"]*"[^>]*>[\s\S]*?<\/ul>/gi, '');
		}

		return {
			title,
			description,
			content: content || '<p>Nội dung đang được cập nhật...</p>',
			date: dateMatch ? dateMatch[1] : '',
			url: `https://tintuc.lms360.vn/posts/${slug}`,
		};
	} catch (error) {
		console.error('Error fetching news content:', error);
		return null;
	}
}

async function fetchRelatedNews(limit = 4) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post?page=1&limit=${limit}`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			return [];
		}

		const data = await response.json();
		return data.docs || data.data || [];
	} catch (error) {
		console.error('Error fetching related news:', error);
		return [];
	}
}

// Helper Functions
const formatDate = (dateString: string) => {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString('vi-VN', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	} catch {
		return new Date().toLocaleDateString('vi-VN', {
			weekday: 'long',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
	}
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
	if (typeof imageObj === 'string') {
		return imageObj; // Return as-is, will be handled in ImageWithFallback
	}
	if (imageObj.url) {
		return imageObj.url; // Return as-is, will be handled in ImageWithFallback
	}
	if (imageObj.thumbnailURL) return imageObj.thumbnailURL;
	if (imageObj.sizes?.medium?.url) return imageObj.sizes.medium.url;
	if (imageObj.sizes?.large?.url) return imageObj.sizes.large.url;
	return '/images/placeholder-news.jpg';
};

// Generate metadata
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
	const newsContent = await fetchNewsContent(params.slug);

	if (!newsContent) {
		return {
			title: 'Bài viết không tồn tại | Bách Khoa Technology',
			description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
		};
	}

	return {
		title: `${newsContent.title} | Bách Khoa Technology`,
		description: newsContent.description || newsContent.title,
	};
}

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
	const [newsContent, relatedNews] = await Promise.all([fetchNewsContent(params.slug), fetchRelatedNews(4)]);

	if (!newsContent) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Back Button */}
				<div className='mb-6'>
					<Link
						href='/news'
						className='inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm'
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Quay lại tin tức
					</Link>
				</div>

				{/* Article Header */}
				<div className='bg-white rounded-lg shadow-sm border overflow-hidden mb-8'>
					<div className='p-6 border-b'>
						<div className='mb-4'>
							<span className='bg-blue-600 text-white text-sm px-3 py-1 rounded font-medium'>
								Bản tin Bách Khoa
							</span>
						</div>

						<h1 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight'>
							{newsContent.title}
						</h1>

						{/* Meta Info */}
						<div className='flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600'>
							<div className='flex items-center gap-1'>
								<Calendar className='w-4 h-4' />
								<span>{newsContent.date || formatDate(new Date().toISOString())}</span>
							</div>
							<div>
								<span>Tác giả: Bách Khoa Technology</span>
							</div>
							<div>
								<span>Tập đoàn KHCN Bách Khoa</span>
							</div>
						</div>

						{/* Link to original */}
						<div className='mb-4'>
							<a
								href={newsContent.url}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center text-blue-600 hover:text-blue-800 text-sm'
							>
								<ExternalLink className='w-4 h-4 mr-1' />
								Xem bài gốc
							</a>
						</div>
					</div>
				</div>

				{/* Article Content with TOC */}
				<div className='mb-8'>
					{newsContent.content && typeof newsContent.content === 'string' ? (
						<ContentRenderer content={newsContent.content} />
					) : (
						<div className='text-gray-700 bg-white rounded-lg shadow-sm border p-6'>
							<p>Nội dung đang được cập nhật...</p>
						</div>
					)}
				</div>

				{/* Related News */}
				<div className='bg-white border rounded-lg overflow-hidden'>
					<div className='bg-gray-100 p-4 border-b'>
						<h3 className='font-semibold text-gray-900'>Bài viết liên quan</h3>
					</div>
					<div className='p-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{relatedNews.slice(0, 4).map((article: any, index: number) => (
								<Link href={`/news/${article.slug}`} key={index} className='group block'>
									<div className='space-y-3'>
										<div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100'>
											<ImageWithFallback
												src={(() => {
													const imageUrl = getImageUrl(article.heroImage || article.image);
													if (imageUrl.startsWith('/api/media/file/')) {
														return `https://tintuc.lms360.vn${imageUrl}`;
													}
													if (imageUrl.startsWith('/')) {
														return `https://tintuc.lms360.vn${imageUrl}`;
													}
													return imageUrl;
												})()}
												alt={safeRender(article.title)}
												width={300}
												height={200}
												className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
											/>
										</div>
										<div>
											<h4 className='font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-2'>
												{safeRender(article.title)}
											</h4>
											<div className='flex items-center gap-2 text-xs text-gray-500'>
												<Calendar className='w-3 h-3' />
												<span>{formatDate(article.publishedAt || article.createdAt)}</span>
											</div>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsDetailPage;
