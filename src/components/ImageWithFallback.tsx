'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
	src,
	alt,
	width,
	height,
	className = '',
	fallbackSrc = '/images/placeholder-news.jpg',
}) => {
	const [imgSrc, setImgSrc] = useState(src);
	const [hasError, setHasError] = useState(false);

	const handleError = () => {
		if (!hasError) {
			setHasError(true);
			setImgSrc(fallbackSrc);
		}
	};

	return <Image src={imgSrc} alt={alt} width={width} height={height} className={className} onError={handleError} />;
};

export default ImageWithFallback;
