'use client';

import React from 'react';
import parse, { Element, domToReact, HTMLReactParserOptions, DOMNode } from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents, { TocItem } from './TableOfContents';
import SafeImage from './SafeImage';

interface ContentRendererProps {
	content: string;
}

// Generate Table of Contents from HTML content
const generateTableOfContents = (content: string): TocItem[] => {
	const toc: TocItem[] = [];
	const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi;
	let match;
	let index = 0;

	while ((match = headingRegex.exec(content)) !== null) {
		const level = parseInt(match[1]);
		const text = match[2].trim();
		const id = `heading-${index++}`;

		toc.push({
			id,
			text,
			level,
		});
	}

	return toc;
};

// Generate slug for headings
const generateSlug = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.trim();
};

// Detect language from class name
const detectLanguage = (className: string = ''): string => {
	const langMap: { [key: string]: string } = {
		'language-js': 'javascript',
		'language-javascript': 'javascript',
		'language-ts': 'typescript',
		'language-typescript': 'typescript',
		'language-jsx': 'jsx',
		'language-tsx': 'tsx',
		'language-html': 'html',
		'language-css': 'css',
		'language-scss': 'scss',
		'language-json': 'json',
		'language-python': 'python',
		'language-java': 'java',
		'language-cpp': 'cpp',
		'language-c': 'c',
		'language-php': 'php',
		'language-sql': 'sql',
		'language-bash': 'bash',
		'language-shell': 'bash',
		'language-yaml': 'yaml',
		'language-xml': 'xml',
		'language-markdown': 'markdown',
		'language-go': 'go',
		'language-rust': 'rust',
		'language-ruby': 'ruby',
	};

	// Check for direct matches
	for (const [cls, lang] of Object.entries(langMap)) {
		if (className.includes(cls)) {
			return lang;
		}
	}

	// Check for common patterns
	if (className.includes('js')) return 'javascript';
	if (className.includes('ts')) return 'typescript';
	if (className.includes('html')) return 'html';
	if (className.includes('css')) return 'css';
	if (className.includes('python')) return 'python';
	if (className.includes('java')) return 'java';
	if (className.includes('json')) return 'json';

	return 'text';
};

// Check if URL is a video
const isVideoUrl = (url: string): boolean => {
	const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv'];
	const lowerUrl = url.toLowerCase();

	// Check for video file extensions
	if (videoExtensions.some((ext) => lowerUrl.includes(ext))) {
		return true;
	}

	// Check for common video hosting platforms
	const videoHosts = [
		'youtube.com',
		'youtu.be',
		'vimeo.com',
		'dailymotion.com',
		'twitch.tv',
		'facebook.com/watch',
		'instagram.com/p/',
		'tiktok.com',
	];

	return videoHosts.some((host) => lowerUrl.includes(host));
};

// Extract video ID from YouTube URL
const getYouTubeVideoId = (url: string): string | null => {
	const patterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
		/youtube\.com\/v\/([^&\n?#]+)/,
	];

	for (const pattern of patterns) {
		const match = url.match(pattern);
		if (match) {
			return match[1];
		}
	}

	return null;
};

// HTML Parser Options with custom transforms
const createParserOptions = (tocItems: TocItem[]): HTMLReactParserOptions => {
	let headingIndex = 0;

	return {
		replace: (domNode) => {
			if (!(domNode instanceof Element)) return;

			const { name, attribs, children } = domNode;

			// Transform images
			if (name === 'img') {
				const { src, alt = '', width, height, ...rest } = attribs;

				if (!src) return;

				// Check if it's a video URL disguised as img
				if (isVideoUrl(src)) {
					const youtubeId = getYouTubeVideoId(src);
					if (youtubeId) {
						return (
							<div className='relative w-full aspect-video rounded-lg overflow-hidden my-6'>
								<iframe
									src={`https://www.youtube.com/embed/${youtubeId}`}
									title='YouTube video'
									className='absolute inset-0 w-full h-full'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								/>
							</div>
						);
					}

					return (
						<div className='relative w-full my-6'>
							<video controls className='w-full rounded-lg' preload='metadata'>
								<source src={src} />
								Trình duyệt của bạn không hỗ trợ video.
							</video>
						</div>
					);
				}

				// Ensure absolute URL for external images - don't modify here since it's already handled in SafeImage
				console.log('Image src before SafeImage:', src); // Debug log

				return (
					<div className='relative my-6 text-center'>
						<SafeImage
							src={src}
							alt={alt}
							className='rounded-lg shadow-sm max-w-full h-auto mx-auto'
							style={{
								maxWidth: '100%',
								height: 'auto',
							}}
						/>
						{alt && <div className='text-center text-sm text-gray-600 mt-2 italic'>{alt}</div>}
					</div>
				);
			}

			// Transform headings with TOC IDs
			if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
				const level = parseInt(name.charAt(1));
				const textContent = domToReact(children as DOMNode[]);
				const slug = generateSlug(textContent.toString());
				const id = tocItems[headingIndex]?.id || `heading-${headingIndex}`;

				headingIndex++;

				const HeadingComponent = name as keyof JSX.IntrinsicElements;
				const className = `scroll-mt-24 font-bold mb-4 mt-6 ${
					level === 1
						? 'text-3xl'
						: level === 2
						? 'text-2xl'
						: level === 3
						? 'text-xl'
						: level === 4
						? 'text-lg'
						: 'text-base'
				}`;

				return (
					<HeadingComponent id={id} className={className}>
						{textContent}
					</HeadingComponent>
				);
			}

			// Transform code blocks
			if (name === 'pre' && children) {
				const codeChild = children.find(
					(child: any) => child instanceof Element && child.name === 'code'
				) as Element;

				if (codeChild) {
					const className = codeChild.attribs?.class || '';
					const language = detectLanguage(className);
					const codeContent = domToReact(codeChild.children as DOMNode[]).toString();

					return (
						<div className='relative my-6'>
							<div className='bg-gray-800 text-gray-200 px-4 py-2 rounded-t-lg text-sm font-medium'>
								{language}
							</div>
							<SyntaxHighlighter
								language={language}
								style={tomorrow}
								customStyle={{
									margin: 0,
									borderTopLeftRadius: 0,
									borderTopRightRadius: 0,
									fontSize: '14px',
								}}
								showLineNumbers
							>
								{codeContent}
							</SyntaxHighlighter>
						</div>
					);
				}
			}

			// Transform inline code
			if (name === 'code' && !(domNode.parent instanceof Element && domNode.parent.name === 'pre')) {
				const codeContent = domToReact(children as DOMNode[]);
				return (
					<code className='bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono'>{codeContent}</code>
				);
			}

			// Transform links for videos
			if (name === 'a') {
				const { href } = attribs;
				if (href && isVideoUrl(href)) {
					const youtubeId = getYouTubeVideoId(href);
					if (youtubeId) {
						return (
							<div className='relative w-full aspect-video rounded-lg overflow-hidden my-6'>
								<iframe
									src={`https://www.youtube.com/embed/${youtubeId}`}
									title='YouTube video'
									className='absolute inset-0 w-full h-full'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								/>
							</div>
						);
					}
				}
			}

			// Transform paragraphs
			if (name === 'p') {
				return <p className='mb-4 leading-relaxed text-gray-700'>{domToReact(children as DOMNode[])}</p>;
			}

			// Transform lists
			if (name === 'ul') {
				return (
					<ul className='list-disc list-inside mb-4 space-y-2 text-gray-700'>
						{domToReact(children as DOMNode[])}
					</ul>
				);
			}

			if (name === 'ol') {
				return (
					<ol className='list-decimal list-inside mb-4 space-y-2 text-gray-700'>
						{domToReact(children as DOMNode[])}
					</ol>
				);
			}

			if (name === 'li') {
				return <li className='mb-2'>{domToReact(children as DOMNode[])}</li>;
			}

			// Transform blockquotes
			if (name === 'blockquote') {
				return (
					<blockquote className='border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 italic text-gray-700'>
						{domToReact(children as DOMNode[])}
					</blockquote>
				);
			}

			// Transform tables
			if (name === 'table') {
				return (
					<div className='overflow-x-auto my-6'>
						<table className='min-w-full border border-gray-300 rounded-lg overflow-hidden'>
							{domToReact(children as DOMNode[])}
						</table>
					</div>
				);
			}

			if (name === 'thead') {
				return <thead className='bg-gray-100'>{domToReact(children as DOMNode[])}</thead>;
			}

			if (name === 'tbody') {
				return <tbody className='divide-y divide-gray-200'>{domToReact(children as DOMNode[])}</tbody>;
			}

			if (name === 'tr') {
				return <tr className='hover:bg-gray-50'>{domToReact(children as DOMNode[])}</tr>;
			}

			if (name === 'th') {
				return (
					<th className='px-4 py-3 text-left font-semibold text-gray-900 border-b'>
						{domToReact(children as DOMNode[])}
					</th>
				);
			}

			if (name === 'td') {
				return <td className='px-4 py-3 text-gray-700 border-b'>{domToReact(children as DOMNode[])}</td>;
			}
		},
	};
};

// Content Renderer Component
const ContentRenderer = ({ content }: ContentRendererProps) => {
	const tocItems = generateTableOfContents(content);
	const parserOptions = createParserOptions(tocItems);

	console.log('content', content);

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
			{/* Main Content */}
			<div className='lg:col-span-3'>
				<div className='bg-white rounded-lg shadow-sm border p-6'>
					<div className='max-w-none text-gray-800 leading-relaxed'>{parse(content, parserOptions)}</div>
				</div>
			</div>

			{/* Table of Contents Sidebar */}
			{tocItems.length > 0 && (
				<div className='lg:col-span-1'>
					<TableOfContents items={tocItems} />
				</div>
			)}
		</div>
	);
};

export default ContentRenderer;
