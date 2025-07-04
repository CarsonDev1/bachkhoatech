'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Sparkles, Zap, Brain, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ name: 'TRANG CHỦ', href: '/' },
		{ name: 'GIỚI THIỆU', href: '/about' },
		{ name: 'SẢN PHẨM', href: '/products' },
		{ name: 'TIN TỨC', href: '/news' },
		{ name: 'LIÊN HỆ', href: '/contact' },
	];

	// Function to check if nav item is active
	const isActiveItem = (href: string) => {
		if (href === '/') {
			return pathname === '/';
		}
		return pathname.startsWith(href);
	};

	useEffect(() => {
		setMounted(true);

		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<header
				className={`sticky w-full bg-slate-800 top-0 left-0 right-0 z-40 transition-all duration-500 ${
					scrolled ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl' : 'bg-slate-800'
				}`}
			>
				{/* Gradient Border */}
				<div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50'></div>

				{/* Floating particles */}
				{mounted && (
					<div className='absolute inset-0 overflow-hidden'>
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className='absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse'
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
									animationDelay: `${Math.random() * 3}s`,
									animationDuration: `${2 + Math.random() * 3}s`,
								}}
							/>
						))}
					</div>
				)}

				<div className='container mx-auto px-4 lg:px-8'>
					<div className='flex items-center justify-between h-16 lg:h-20'>
						{/* Logo */}
						<div className='flex-shrink-0 z-10'>
							<Link href='/' className='block group'>
								<div className='flex items-center space-x-3'>
									<Image
										src='/images/logo.png'
										alt='logo'
										width={150}
										height={150}
										className='w-full h-full object-contain'
									/>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className='hidden lg:flex items-center space-x-8 xl:space-x-12'>
							{navItems.map((item, index) => {
								const isActive = isActiveItem(item.href);
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`relative text-sm xl:text-base font-semibold transition-all duration-300 group ${
											isActive ? 'text-white' : 'text-gray-300 hover:text-white'
										}`}
									>
										{item.name}

										{/* Active/Hover indicator */}
										<span
											className={`absolute left-0 -bottom-2 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ${
												isActive ? 'w-full' : 'w-0 group-hover:w-full'
											}`}
										/>

										{/* Glow effect */}
										{isActive && (
											<span className='absolute left-0 -bottom-2 h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-sm opacity-50'></span>
										)}
									</Link>
								);
							})}
						</nav>

						{/* CTA Button - Desktop */}
						<div className='hidden lg:flex items-center space-x-4'>
							<Link
								href='https://lms360.vn/'
								target='_blank'
								rel='noopener noreferrer'
								className='group relative px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl font-bold text-white text-sm transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/50 overflow-hidden'
							>
								<div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12'></div>
								<span className='relative z-10 flex items-center'>
									<Rocket className='w-4 h-4 mr-2 group-hover:animate-bounce' />
									Trải nghiệm ngay
								</span>
							</Link>
						</div>

						{/* Mobile menu button */}
						<button
							onClick={toggleMenu}
							className='lg:hidden relative z-10 p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 hover:bg-white/20'
							aria-label='Toggle menu'
						>
							<div className='w-6 h-6 relative'>
								<Menu
									className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
										isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
									}`}
								/>
								<X
									className={`absolute inset-0 w-6 h-6 text-white transition-all duration-300 ${
										isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
									}`}
								/>
							</div>
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Menu Overlay */}
			<div
				className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
					isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
			>
				<div className='absolute inset-0 bg-black/80 backdrop-blur-sm' onClick={closeMenu} />

				{/* Mobile Menu Panel */}
				<div
					className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 shadow-2xl transition-transform duration-300 border-l border-blue-500/20 ${
						isMenuOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					{/* Background Effects */}
					<div className='absolute inset-0 overflow-hidden'>
						<div className='absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
						<div className='absolute bottom-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
					</div>

					<div className='flex flex-col h-full relative z-10'>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-blue-500/20'>
							<div className='flex items-center space-x-3'>
								<div className='w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
									<Brain className='w-5 h-5 text-white' />
								</div>
								<div className='flex flex-col'>
									<h2 className='text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
										BÁCH KHOA
									</h2>
									<p className='text-xs text-blue-300/80 font-medium tracking-wider uppercase'>
										Technology is Power
									</p>
								</div>
							</div>
							<button
								onClick={closeMenu}
								className='p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-200'
							>
								<X className='w-6 h-6 text-white' />
							</button>
						</div>

						{/* Navigation */}
						<nav className='flex-1 overflow-y-auto py-6'>
							<div className='px-6 space-y-3'>
								{navItems.map((item, index) => {
									const isActive = isActiveItem(item.href);
									return (
										<Link
											key={item.name}
											href={item.href}
											onClick={closeMenu}
											className={`flex items-center justify-between w-full px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
												isActive
													? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg border border-blue-500/30'
													: 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20'
											}`}
										>
											<span className='font-semibold'>{item.name}</span>
											<ChevronRight
												className={`w-4 h-4 transition-all duration-300 ${
													isActive
														? 'text-blue-400'
														: 'text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1'
												}`}
											/>
										</Link>
									);
								})}
							</div>
						</nav>

						{/* Mobile CTA */}
						<div className='p-6 border-t border-blue-500/20'>
							<Link
								href='https://lms360.vn/'
								target='_blank'
								rel='noopener noreferrer'
								className='w-full group relative px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl font-bold text-white transform transition-all duration-300 hover:scale-105 shadow-lg overflow-hidden block text-center'
							>
								<div className='absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
								<div className='absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12'></div>
								<span className='relative z-10 flex items-center justify-center'>
									<Rocket className='w-5 h-5 mr-2 group-hover:animate-bounce' />
									Trải nghiệm ngay
								</span>
							</Link>
						</div>

						{/* Footer */}
						<div className='p-6 border-t border-blue-500/20'>
							<div className='text-center text-sm text-gray-400'>© 2024 Bách Khoa Technology</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
