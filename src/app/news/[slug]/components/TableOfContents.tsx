'use client';

import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TocItem {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	items: TocItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>('');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries.find((entry) => entry.isIntersecting);
				if (visibleEntry) {
					setActiveId(visibleEntry.target.id);
				}
			},
			{
				rootMargin: '-80px 0% -80% 0%',
				threshold: 0.1,
			}
		);

		// Observe all headings
		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [items]);

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offsetTop = element.offsetTop - 100;
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth',
			});
		}
	};

	if (items.length === 0) return null;

	return (
		<div className='bg-white border rounded-lg overflow-hidden sticky top-4'>
			<div className='bg-gray-100 p-4 border-b'>
				<h3 className='font-semibold text-gray-900 flex items-center'>
					<List className='w-4 h-4 mr-2' />
					Mục lục
				</h3>
			</div>
			<div className='p-4 max-h-96 overflow-y-auto'>
				<nav className='space-y-1'>
					{items.map((item) => (
						<button
							key={item.id}
							onClick={() => scrollToHeading(item.id)}
							className={`block w-full text-left text-sm hover:text-blue-600 transition-colors ${
								activeId === item.id ? 'text-blue-600 font-medium' : 'text-gray-600'
							}`}
							style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
						>
							<div className='flex items-center'>
								{item.level > 1 && <ChevronRight className='w-3 h-3 mr-1 opacity-50' />}
								{item.text}
							</div>
						</button>
					))}
				</nav>
			</div>
		</div>
	);
};

export default TableOfContents;
export type { TocItem };
