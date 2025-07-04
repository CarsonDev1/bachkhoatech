'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
	showAfter?: number;
	className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ showAfter = 300, className }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);

	// Track scroll position
	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > showAfter) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		// Throttle scroll events for better performance
		let timeoutId: NodeJS.Timeout;
		const handleScroll = () => {
			setIsScrolling(true);
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				setIsScrolling(false);
			}, 150);
			toggleVisibility();
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Check initial scroll position
		toggleVisibility();

		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(timeoutId);
		};
	}, [showAfter]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (!isVisible) return null;

	return (
		<button
			onClick={scrollToTop}
			className={cn(
				// Base styles
				'group fixed bottom-6 right-6 z-50',
				'w-12 h-12 md:w-14 md:h-14',
				'bg-gray-700 hover:bg-gray-800',
				'text-white',
				'rounded-full',
				'shadow-lg hover:shadow-xl',
				'transform transition-all duration-300 ease-in-out',
				'hover:scale-110 hover:-translate-y-1',
				'focus:outline-none focus:ring-4 focus:ring-gray-500/50',
				'active:scale-95',
				'flex items-center justify-center',

				// Animation states
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none',

				// Scrolling state
				isScrolling && 'scale-95 opacity-75',

				className
			)}
			aria-label='Scroll to top'
			title='Scroll to top'
		>
			{/* Background overlay for hover effect */}
			<div className='absolute inset-0 bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full' />

			{/* Icon */}
			<ArrowUp
				className={cn(
					'relative z-10 w-5 h-5 md:w-6 md:h-6',
					'transform transition-transform duration-300',
					'group-hover:-translate-y-0.5',
					'group-active:translate-y-0'
				)}
			/>

			{/* Pulse animation for attention */}
			<div className='absolute inset-0 bg-gray-700 rounded-full animate-ping opacity-20 group-hover:opacity-0 transition-opacity duration-300' />
		</button>
	);
};

export default ScrollToTop;
