import React, { ReactNode, useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface ScrollStackItemProps {
	itemClassName?: string;
	children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
	<div
		className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top ${itemClassName}`.trim()}
		style={{
			backfaceVisibility: 'hidden',
			transformStyle: 'preserve-3d',
			willChange: 'transform, filter',
			transform: 'translateZ(0)',
		}}
	>
		{children}
	</div>
);

interface ScrollStackProps {
	className?: string;
	children: ReactNode;
	itemDistance?: number;
	itemScale?: number;
	itemStackDistance?: number;
	stackPosition?: string;
	scaleEndPosition?: string;
	baseScale?: number;
	scaleDuration?: number;
	rotationAmount?: number;
	blurAmount?: number;
	onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
	children,
	className = '',
	itemDistance = 100,
	itemScale = 0.03,
	itemStackDistance = 30,
	stackPosition = '20%',
	scaleEndPosition = '10%',
	baseScale = 0.85,
	scaleDuration = 0.5,
	rotationAmount = 0,
	blurAmount = 0,
	onStackComplete,
}) => {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLElement[]>([]);
	const stackCompletedRef = useRef(false);
	const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

	const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
		if (typeof value === 'string' && value.includes('%')) {
			return (parseFloat(value) / 100) * containerHeight;
		}
		return parseFloat(value as string);
	}, []);

	const setupScrollAnimations = useCallback(() => {
		const scroller = scrollerRef.current;
		const inner = innerRef.current;
		if (!scroller || !inner || !cardsRef.current.length) return;

		// Clear existing ScrollTriggers
		scrollTriggersRef.current.forEach((trigger) => trigger.kill());
		scrollTriggersRef.current = [];

		const containerHeight = window.innerHeight;
		const stackPositionPx = parsePercentage(stackPosition, containerHeight);
		const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

		cardsRef.current.forEach((card, i) => {
			if (!card) return;

			// Set initial transform
			gsap.set(card, {
				transformOrigin: 'top center',
				z: 0,
			});

			// Calculate scale values
			const targetScale = baseScale + i * itemScale;
			const initialScale = 1;

			// Pinning animation
			const pinTrigger = ScrollTrigger.create({
				trigger: card,
				start: `top+=${stackPositionPx + itemStackDistance * i} bottom`,
				end: () => {
					const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement;
					if (endElement) {
						return `${endElement.offsetTop - containerHeight / 2}px bottom`;
					}
					return '+=2000';
				},
				pin: true,
				pinSpacing: false,
				anticipatePin: 1,
				refreshPriority: -1,
				onUpdate: (self) => {
					// Calculate scale progress based on scroll
					const scaleProgress = Math.min(
						1,
						Math.max(
							0,
							(self.scroll() - (card.offsetTop - scaleEndPositionPx)) /
								(card.offsetTop - stackPositionPx - (card.offsetTop - scaleEndPositionPx))
						)
					);

					const currentScale = initialScale - scaleProgress * (initialScale - targetScale);
					const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

					// Apply transforms with GSAP for smooth animation
					gsap.set(card, {
						scale: Math.max(0.5, currentScale),
						rotation: rotation,
						z: -i * 10, // Add depth
						transformOrigin: 'top center',
					});

					// Handle blur effect
					if (blurAmount) {
						let topCardIndex = 0;
						cardsRef.current.forEach((otherCard, j) => {
							if (j <= i) {
								const otherCardTop = otherCard.offsetTop;
								const otherTriggerStart = otherCardTop - stackPositionPx - itemStackDistance * j;
								if (self.scroll() >= otherTriggerStart) {
									topCardIndex = Math.max(topCardIndex, j);
								}
							}
						});

						if (i < topCardIndex) {
							const depthInStack = topCardIndex - i;
							const blur = Math.max(0, depthInStack * blurAmount);
							gsap.set(card, {
								filter: `blur(${blur}px)`,
							});
						} else {
							gsap.set(card, {
								filter: 'blur(0px)',
							});
						}
					}
				},
				onEnter: () => {
					if (i === cardsRef.current.length - 1 && !stackCompletedRef.current) {
						stackCompletedRef.current = true;
						onStackComplete?.();
					}
				},
				onLeave: () => {
					if (i === cardsRef.current.length - 1 && stackCompletedRef.current) {
						stackCompletedRef.current = false;
					}
				},
			});

			scrollTriggersRef.current.push(pinTrigger);
		});

		// Refresh ScrollTrigger to ensure proper calculations
		ScrollTrigger.refresh();
	}, [
		itemScale,
		itemStackDistance,
		stackPosition,
		scaleEndPosition,
		baseScale,
		rotationAmount,
		blurAmount,
		onStackComplete,
		parsePercentage,
	]);

	useLayoutEffect(() => {
		const scroller = scrollerRef.current;
		const inner = innerRef.current;
		if (!scroller || !inner) return;

		// Setup smooth scrolling with GSAP
		gsap.config({
			force3D: true,
			nullTargetWarn: false,
		});

		// Small delay to ensure DOM is ready
		const timeoutId = setTimeout(() => {
			const cards = Array.from(inner.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
			cardsRef.current = cards;

			cards.forEach((card, i) => {
				if (i < cards.length - 1) {
					card.style.marginBottom = `${itemDistance}px`;
				}

				// Optimize for GPU acceleration
				gsap.set(card, {
					willChange: 'transform, filter',
					transformOrigin: 'top center',
					backfaceVisibility: 'hidden',
					perspective: 1000,
					transformStyle: 'preserve-3d',
				});
			});

			setupScrollAnimations();
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			// Clean up ScrollTriggers
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			stackCompletedRef.current = false;
			cardsRef.current = [];
		};
	}, [
		itemDistance,
		itemScale,
		itemStackDistance,
		stackPosition,
		scaleEndPosition,
		baseScale,
		scaleDuration,
		rotationAmount,
		blurAmount,
		onStackComplete,
		setupScrollAnimations,
	]);

	// Handle resize
	useLayoutEffect(() => {
		const handleResize = () => {
			ScrollTrigger.refresh();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div
			className={`relative w-full ${className}`.trim()}
			ref={scrollerRef}
			style={{
				height: 'auto',
				minHeight: '100vh',
				overscrollBehavior: 'contain',
				WebkitOverflowScrolling: 'touch',
				WebkitTransform: 'translateZ(0)',
				transform: 'translateZ(0)',
				willChange: 'scroll-position',
			}}
		>
			<div
				ref={innerRef}
				className='scroll-stack-inner pt-[20vh] px-4 sm:px-8 lg:px-20 pb-[100vh]'
				style={{ minHeight: '200vh' }}
			>
				{children}
				{/* Spacer so the last pin can release cleanly */}
				<div className='scroll-stack-end w-full h-px' />
			</div>
		</div>
	);
};

export default ScrollStack;
