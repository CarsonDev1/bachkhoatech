'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
	id: string;
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	content: string;
	badge?: number;
}

interface VerticalTabsProps {
	tabs: Tab[];
	className?: string;
}

export default function VerticalTabs({ tabs = [], className }: VerticalTabsProps) {
	const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');

	// Early return if no tabs provided
	if (!tabs || tabs.length === 0) {
		return (
			<div
				className={`flex h-80 w-full rounded-lg border border-slate-200/20 bg-white/80 shadow-lg backdrop-blur-md dark:border-slate-700/30 dark:bg-black/40 ${
					className || ''
				}`}
			>
				<div className='flex items-center justify-center w-full'>
					<p className='text-slate-500 dark:text-slate-400'>No tabs available</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex h-80 w-full container-lg rounded-lg border border-slate-200/20 bg-white/80 shadow-lg backdrop-blur-md dark:border-slate-700/30 dark:bg-black/40 ${
				className || ''
			}`}
		>
			{/* Sidebar */}
			<div className='w-22 border-r border-slate-200/20 bg-slate-50/50 p-4 backdrop-blur-sm dark:border-slate-700/30 dark:bg-black/20'>
				<div className='space-y-2'>
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;

						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
									isActive
										? 'bg-blue-500/50 text-blue-600 shadow-sm backdrop-blur-sm dark:bg-black/60 dark:text-blue-400 dark:shadow-blue-500/10'
										: 'text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-black/40 dark:hover:text-slate-100'
								}`}
							>
								{isActive && (
									<motion.div
										layoutId='activeTab'
										className='absolute inset-0 rounded-lg bg-blue-50/80 backdrop-blur-sm dark:bg-blue-500/10 dark:backdrop-blur-md'
										transition={{ type: 'spring', stiffness: 500, damping: 30 }}
									/>
								)}

								<div className='relative z-10 flex items-center gap-3'>
									<Icon
										className={`h-5 w-5 transition-colors ${
											isActive
												? 'text-blue-600 dark:text-blue-400'
												: 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'
										}`}
									/>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* Content */}
			<div className='flex-1 p-6'>
				<AnimatePresence mode='wait'>
					{tabs.map((tab) => {
						if (activeTab !== tab.id) return null;

						return (
							<motion.div
								key={tab.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}
								className='h-full'
							>
								<h2 className='mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100'>
									{tab.title}
								</h2>
								<p className='text-slate-600 dark:text-slate-300'>{tab.content}</p>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}
