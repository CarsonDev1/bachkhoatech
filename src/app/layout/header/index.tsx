'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [mounted, setMounted] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ name: 'SẢN PHẨM', href: '/product' },
		{ name: 'KHÁCH HÀNG', href: '/customer' },
		{ name: 'TIN TỨC - TUYỂN DỤNG', href: '/news' },
		{ name: 'ĐÀO TẠO NHÂN LỰC SỐ', href: '/training' },
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
				className={`fixed w-full top-0 left-0 right-0 z-40 transition-all duration-300  border-b border-white/10 ${
					scrolled ? 'bg-slate-600 bg-opacity-80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
				}`}
			>
				{/* Background particles */}
				{mounted && (
					<div className='absolute inset-0 overflow-hidden'>
						{Array.from({ length: 20 }).map((_, i) => (
							<div
								key={i}
								className='absolute w-1 h-1 bg-blue-300/30 rounded-full'
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
									animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
									animationDelay: `${Math.random() * 3}s`,
								}}
							/>
						))}
					</div>
				)}

				<div className='container-lg'>
					<div className='flex items-center justify-between h-16 lg:h-20'>
						{/* Logo */}
						<div className='flex-shrink-0 z-10'>
							<Link href='/' className='block'>
								<div className='flex items-center space-x-3'>
									<Image
										src='/images/logo.png'
										alt='Bách Khoa Technology'
										width={150}
										height={60}
										className='h-14 w-auto object-contain'
									/>
								</div>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className='hidden lg:flex items-center space-x-8'>
							{navItems.map((item) => {
								const isActive = isActiveItem(item.href);
								return (
									<Link
										key={item.name}
										href={item.href}
										className={`relative text-sm md:text-base font-medium transition-all duration-300 hover:text-blue-200 ${
											isActive ? 'text-white' : 'text-blue-100'
										}`}
									>
										{item.name}
										{isActive && (
											<span className='absolute left-0 -bottom-1 h-0.5 w-full bg-blue-300'></span>
										)}
									</Link>
								);
							})}
						</nav>

						{/* CTA Button - Desktop */}
						<div className='hidden lg:flex items-center'>
							<Link
								href='/product'
								className='group flex items-center gap-2 px-6 py-2.5 bg-[#DDEFFB] text-[#19376B] font-semibold rounded-full hover:bg-[#4E87E9] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl'
							>
								<span>ĐĂNG KÝ DEMO</span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width={20}
									height={20}
									viewBox='0 0 20 20'
									fill='none'
									className='transition-all duration-300'
								>
									<path
										d='M4.10742 15.8925C5.27285 17.0579 6.75771 17.8516 8.37422 18.1732C9.99074 18.4947 11.6663 18.3297 13.189 17.699C14.7118 17.0682 16.0133 16.0001 16.9289 14.6297C17.8446 13.2593 18.3334 11.6481 18.3334 9.99996C18.3334 8.35178 17.8446 6.74061 16.9289 5.37019C16.0133 3.99978 14.7118 2.93168 13.189 2.30095C11.6663 1.67023 9.99074 1.50521 8.37422 1.82676C6.75771 2.14832 5.27285 2.94201 4.10742 4.10746'
										stroke='#19376B'
										strokeWidth={2}
										className='group-hover:stroke-white transition-all duration-300'
									/>
									<path
										d='M12.4993 10L13.1493 9.47917L13.566 10L13.1493 10.5208L12.4993 10ZM2.49935 10.8333C2.27834 10.8333 2.06637 10.7455 1.91009 10.5893C1.75381 10.433 1.66602 10.221 1.66602 10C1.66602 9.77899 1.75381 9.56702 1.91009 9.41074C2.06637 9.25446 2.27834 9.16667 2.49935 9.16667V10.8333ZM9.81602 5.3125L13.1493 9.47917L11.8493 10.5208L8.51602 6.35417L9.81602 5.3125ZM13.1493 10.5208L9.81602 14.6875L8.51602 13.6458L11.8493 9.47917L13.1493 10.5208ZM12.4993 10.8333H2.49935V9.16667H12.4993V10.8333Z'
										fill='#19376B'
										className='group-hover:fill-white transition-all duration-300'
									/>
								</svg>
							</Link>
						</div>

						{/* Mobile menu button */}
						<button
							onClick={toggleMenu}
							className='lg:hidden relative z-10 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20'
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
				<div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={closeMenu} />

				{/* Mobile Menu Panel */}
				<div
					className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-[#1e3a8a] shadow-2xl transition-transform duration-300 ${
						isMenuOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div className='flex flex-col h-full'>
						{/* Header */}
						<div className='flex items-center justify-between p-6 border-b border-blue-600/30'>
							<Image
								src='/images/logo.png'
								alt='Bách Khoa Technology'
								width={150}
								height={50}
								className='h-10 w-auto object-contain'
							/>
							<button
								onClick={closeMenu}
								className='p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200'
							>
								<X className='w-5 h-5 text-white' />
							</button>
						</div>

						{/* Navigation */}
						<nav className='flex-1 overflow-y-auto py-6'>
							<div className='px-6 space-y-2'>
								{navItems.map((item) => {
									const isActive = isActiveItem(item.href);
									return (
										<Link
											key={item.name}
											href={item.href}
											onClick={closeMenu}
											className={`block w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${
												isActive
													? 'bg-white/20 text-white font-medium'
													: 'text-blue-100 hover:text-white hover:bg-white/10'
											}`}
										>
											{item.name}
										</Link>
									);
								})}
							</div>
						</nav>

						{/* Mobile CTA */}
						<div className='p-6 border-t border-blue-600/30'>
							<Link
								href='/product'
								className='w-full flex items-center justify-center px-6 py-3 bg-white text-[#1e3a8a] font-semibold rounded-full hover:bg-blue-50 transition-all duration-300'
								onClick={closeMenu}
							>
								ĐĂNG KÝ DEMO
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Keyframes for particles */}
			<style jsx>{`
				@keyframes twinkle {
					0%,
					100% {
						opacity: 0.3;
						transform: scale(1);
					}
					50% {
						opacity: 1;
						transform: scale(1.2);
					}
				}
			`}</style>
		</>
	);
};

export default Header;
