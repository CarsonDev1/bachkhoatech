'use client';

import React, { useState } from 'react';

interface SafeImageProps {
	src: string;
	alt: string;
	className?: string;
	style?: React.CSSProperties;
}

const SafeImage = ({ src, alt, className, style }: SafeImageProps) => {
	const [imageError, setImageError] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	// Fix URL to absolute if needed
	const imageSrc = (() => {
		if (src.startsWith('/api/media/file/')) {
			return `https://tintuc.lms360.vn${src}`;
		}
		if (src.startsWith('/') && !src.startsWith('//') && !src.startsWith('/images/')) {
			return `https://tintuc.lms360.vn${src}`;
		}
		return src;
	})();

	const handleImageError = () => {
		setImageError(true);
	};

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	if (imageError) {
		return (
			<div
				className={`${className} flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 min-h-[200px]`}
				style={style}
			>
				<div className='text-center p-4'>
					<div className='text-gray-500 text-sm mb-2'>🖼️</div>
					<div className='text-gray-600 text-sm'>Không thể tải hình ảnh</div>
					{alt && <div className='text-xs text-gray-500 mt-1'>{alt}</div>}
				</div>
			</div>
		);
	}

	return (
		<>
			<img
				src={imageSrc}
				alt={alt}
				className={`${className}`}
				style={style}
				loading='lazy'
				onError={handleImageError}
				onLoad={handleImageLoad}
			/>
		</>
	);
};

export default SafeImage;
