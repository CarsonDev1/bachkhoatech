'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { File, MapPin, Paperclip, Phone } from 'lucide-react';
import Link from 'next/link';

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

// Icon components
const DashboardIcon = ({ className = 'w-5 h-5' }) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={30} height={30} viewBox='0 0 30 30' fill='none'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M9.125 12.1875C9.12483 11.3068 9.35726 10.4418 9.79878 9.67977C10.2403 8.91778 10.8752 8.28592 11.6394 7.84812C11.6306 7.29854 11.6258 6.66167 11.625 5.9375C11.625 4.34312 11.6525 3.18438 11.6812 2.40937C11.7081 1.65937 12.215 1.0425 12.9625 0.98125C13.2812 0.955625 13.6675 0.9375 14.125 0.9375C14.5825 0.9375 14.9688 0.955625 15.2875 0.98125C16.035 1.0425 16.5419 1.65937 16.5688 2.40937C16.5975 3.18438 16.625 4.34312 16.625 5.9375C16.6246 6.66167 16.6198 7.29854 16.6106 7.84812C17.3727 8.28477 18.0064 8.91448 18.4478 9.67386C18.8892 10.4332 19.1228 11.2955 19.125 12.1738C19.1272 13.0522 18.898 13.9156 18.4605 14.6772C18.0229 15.4388 17.3925 16.0717 16.6326 16.5122C15.8727 16.9528 15.0102 17.1853 14.1318 17.1865C13.2535 17.1877 12.3903 16.9575 11.6292 16.5191C10.8681 16.0807 10.236 15.4495 9.79634 14.6891C9.35672 13.9286 9.12517 13.0658 9.125 12.1875ZM18.4969 6.88125C18.499 6.58542 18.5 6.27083 18.5 5.9375C18.5 4.32188 18.4725 3.14 18.4431 2.34062C18.4334 2.08218 18.395 1.82562 18.3287 1.57562C22.9212 3.14062 26.2431 7.41 26.3469 12.465L28.7719 15.8463C29.205 16.4506 29.1594 17.3337 28.4562 17.7644C27.9231 18.0894 27.1444 18.4688 26.0994 18.7456L25.7394 23.0144C25.7147 23.3078 25.631 23.5932 25.4934 23.8535C25.3557 24.1138 25.1669 24.3436 24.9383 24.5292C24.7097 24.7148 24.446 24.8523 24.163 24.9335C23.88 25.0147 23.5835 25.038 23.2913 25.0019L21.7162 24.8069V26.63C21.7162 27.5719 21.1031 28.4237 20.1419 28.6019C18.985 28.8175 17.0894 29.0625 14.4556 29.0625C11.8219 29.0625 9.92687 28.8175 8.76937 28.6019C7.80875 28.4231 7.19438 27.5719 7.19438 26.63V22.0312C4.37937 19.88 2.5625 16.5044 2.5625 12.7081C2.5625 7.81813 5.575 3.62687 9.86063 1.84875C9.83146 2.01125 9.81354 2.17521 9.80687 2.34062C9.7775 3.14 9.75 4.32188 9.75 5.9375C9.75 6.27083 9.75104 6.58542 9.75313 6.88125C8.96962 7.5257 8.33874 8.33586 7.90592 9.25339C7.47309 10.1709 7.24907 11.173 7.25 12.1875C7.25 15.8538 10.12 18.85 13.7356 19.0519C15.7781 20.9481 18.75 22.1875 21.625 22.1875C21.8736 22.1875 22.1121 22.0887 22.2879 21.9129C22.4637 21.7371 22.5625 21.4986 22.5625 21.25C22.5625 21.0014 22.4637 20.7629 22.2879 20.5871C22.1121 20.4113 21.8736 20.3125 21.625 20.3125C19.7987 20.3125 17.8944 19.6981 16.3363 18.6994C19.0487 17.7787 21 15.2106 21 12.1875C21.0009 11.173 20.7769 10.1709 20.3441 9.25339C19.9113 8.33586 19.2804 7.5257 18.4969 6.88125Z'
			fill='#19376B'
		/>
	</svg>
);

const AnalyticsIcon = ({ className = 'w-5 h-5' }) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={35} height={35} viewBox='0 0 35 35' fill='none'>
		<path
			d='M30.0308 26.0454C29.4642 25.4876 22.5987 22.832 21.3529 22.331C20.1137 21.8388 19.6193 20.4749 19.6193 20.4749C19.6193 20.4749 19.0615 20.7834 19.0615 19.9171C19.0615 19.0498 19.6193 20.4749 20.1772 17.1302C20.1772 17.1302 21.7248 16.696 21.4175 13.1052H21.0456C21.0456 13.1052 21.9753 9.26617 21.0456 7.9668C20.1126 6.66742 19.7473 5.80117 17.6987 5.17992C15.6534 4.55977 16.3972 4.68336 14.9118 4.7468C13.4243 4.80914 12.1862 5.61414 12.1862 6.04617C12.1862 6.04617 11.2565 6.10852 10.8868 6.48039C10.515 6.85227 9.89591 8.58477 9.89591 9.01789C9.89591 9.45102 10.2054 12.3648 10.515 12.9816L10.1464 13.102C9.83685 16.6938 11.3845 17.1291 11.3845 17.1291C11.9423 20.4738 12.5001 19.0487 12.5001 19.916C12.5001 20.7823 11.9423 20.4738 11.9423 20.4738C11.9423 20.4738 11.4468 21.8366 10.2087 22.3299C8.9706 22.8254 2.09747 25.4876 1.53857 26.0443C0.980753 26.613 1.0431 29.2118 1.0431 29.2118H14.2075L15.1678 25.4274L14.3147 24.5743L15.7836 23.1032L17.2525 24.5732L16.3993 25.4263L17.3597 29.2107H30.524C30.524 29.2107 30.5929 26.6098 30.0286 26.0421L30.0308 26.0454Z'
			fill='#19376B'
		/>
	</svg>
);

const UsersIcon = ({ className = 'w-5 h-5' }) => (
	<svg xmlns='http://www.w3.org/2000/svg' width={24} height={25} viewBox='0 0 24 25' fill='none'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M13.125 4.87496C13.125 2.45873 11.1662 0.5 8.74998 0.5L8.50992 0.506445C6.20531 0.631074 4.37496 2.5393 4.37496 4.87496C4.37496 7.29125 6.33375 9.24998 8.74998 9.24998L8.99004 9.24348C11.2946 9.11891 13.125 7.21068 13.125 4.87496ZM9.99996 19.25C9.99996 20.6161 10.3652 21.8969 11.0033 23H0V18.5C0 14.8653 2.79305 11.9015 6.29197 11.7556L6.56244 11.75H10.9375C12.0762 11.75 13.1471 12.0483 14.0805 12.5731C11.6578 13.8164 9.99996 16.3396 9.99996 19.25ZM13.8263 24.3063L17.5 22.0625L21.1736 24.3063L20.1748 20.1191L23.4441 17.3186L19.1531 16.9746L17.5 13L15.8468 16.9746L11.5559 17.3186L14.8251 20.1191L13.8263 24.3063Z'
			fill='#19376B'
		/>
	</svg>
);

const sendEmail = async (formData: any, formType: string) => {
	try {
		const emailBody = `
			Loại form: ${formType}
			
			Họ tên: ${formData.fullName}
			Số điện thoại: ${formData.phone}
			Email: ${formData.email}
			Nội dung: ${formData.message}
			
			${formData.file ? `File đính kèm: ${formData.file.name}` : 'Không có file đính kèm'}
		`;

		console.log('Sending email to: admin@bachkhoa.tech');
		console.log('Email body:', emailBody);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return { success: true };
	} catch (error) {
		console.error('Error sending email:', error);
		return { success: false, error: 'Có lỗi xảy ra khi gửi email' };
	}
};

// Support Service Form
const SupportServiceForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		message: '',
		file: null as File | null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({ ...prev, file }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage('');

		try {
			const result = await sendEmail(formData, 'HỖ TRỢ DỊCH VỤ');

			if (result.success) {
				setSubmitMessage('Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
				setFormData({
					fullName: '',
					phone: '',
					email: '',
					message: '',
					file: null,
				});
			} else {
				setSubmitMessage(result.error || 'Có lỗi xảy ra, vui lòng thử lại.');
			}
		} catch (error) {
			setSubmitMessage('Có lỗi xảy ra, vui lòng thử lại.');
		}

		setIsSubmitting(false);
	};

	return (
		<div
			className='bg-cover bg-center bg-no-repeat relative'
			style={{
				backgroundImage: "url('/images/support.png')",
			}}
		>
			<div className='max-w-md bg-[#D1F6FBAD]/60 p-6 flex flex-col items-center'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='text-center'>
						<h3 className='text-xl font-bold text-blue-800 mb-2'>HỖ TRỢ DỊCH VỤ</h3>
						<p className='text-blue-700 text-sm'>
							Kênh hỗ trợ trực tiếp của Bách Khoa hân hạnh hỗ trợ
							<br />
							Quý Thầy/Cô, PHHS và các bạn Học sinh!
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4 w-full'>
					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
								<circle cx='12' cy='7' r='4' />
							</svg>
						</div>
						<input
							type='text'
							value={formData.fullName}
							onChange={handleInputChange}
							name='fullName'
							placeholder='---Nhập họ tên---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
							</svg>
						</div>
						<input
							value={formData.phone}
							onChange={handleInputChange}
							name='phone'
							type='tel'
							placeholder='---Nhập số điện thoại---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
								<polyline points='22,6 12,13 2,6' />
							</svg>
						</div>
						<input
							value={formData.email}
							onChange={handleInputChange}
							name='email'
							type='email'
							placeholder='---Nhập địa chỉ email---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							required
						/>
					</div>

					<div className='flex items-start gap-3'>
						<div className='bg-white p-2 rounded-full mt-1'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
								<polyline points='14,2 14,8 20,8' />
								<line x1='16' y1='13' x2='8' y2='13' />
								<line x1='16' y1='17' x2='8' y2='17' />
								<polyline points='10,9 9,9 8,9' />
							</svg>
						</div>
						<textarea
							placeholder='---Nhập nội dung cần hỗ trợ---'
							rows={4}
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
							value={formData.message}
							onChange={handleInputChange}
							name='message'
							required
						/>
					</div>
					<div className='flex justify-center gap-3 mt-6'>
						<label className='bg-[#19376B] flex items-center gap-1 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M10 6.875V3.75H11.25V6.875H10ZM6.875 11.1875C6.51042 11.0833 6.21104 10.8802 5.97687 10.5781C5.74271 10.276 5.62542 9.92708 5.625 9.53125V3.75H6.875V11.1875ZM7.34375 13.75C6.26042 13.75 5.33854 13.3698 4.57812 12.6094C3.81771 11.849 3.4375 10.9271 3.4375 9.84375V4.0625C3.4375 3.28125 3.71104 2.61729 4.25813 2.07063C4.80521 1.52396 5.46917 1.25042 6.25 1.25C7.03083 1.24958 7.695 1.52313 8.2425 2.07063C8.79 2.61813 9.06333 3.28208 9.0625 4.0625V8.75H7.8125V4.0625C7.80208 3.625 7.64854 3.25521 7.35187 2.95313C7.05521 2.65104 6.68792 2.5 6.25 2.5C5.81208 2.5 5.44229 2.65104 5.14063 2.95313C4.83896 3.25521 4.68792 3.625 4.6875 4.0625V9.84375C4.67708 10.5833 4.93229 11.211 5.45313 11.7269C5.97396 12.2427 6.60417 12.5004 7.34375 12.5C7.60417 12.5 7.85167 12.4662 8.08625 12.3987C8.32083 12.3312 8.54208 12.2296 8.75 12.0938V13.4844C8.53125 13.5677 8.30458 13.6329 8.07 13.68C7.83542 13.7271 7.59333 13.7504 7.34375 13.75ZM10 13.125V11.25H8.125V10H10V8.125H11.25V10H13.125V11.25H11.25V13.125H10Z'
									fill='white'
								/>
							</svg>
							Chọn tệp
							<input
								type='file'
								onChange={handleFileChange}
								className='hidden'
								accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
							/>
						</label>
						<button
							type='submit'
							disabled={isSubmitting}
							className='bg-[#19376B] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors flex items-center gap-2'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M12.4993 2.5C12.8308 2.5 13.1488 2.6317 13.3832 2.86612C13.6176 3.10054 13.7493 3.41848 13.7493 3.75V11.25C13.7493 11.5815 13.6176 11.8995 13.3832 12.1339C13.1488 12.3683 12.8308 12.5 12.4993 12.5H2.49931C2.16779 12.5 1.84984 12.3683 1.61542 12.1339C1.381 11.8995 1.24931 11.5815 1.24931 11.25V10.625H2.49931V11.25H12.4993V4.63937L8.16493 8.97375C7.98912 9.1495 7.75071 9.24824 7.50212 9.24824C7.25353 9.24824 7.01511 9.1495 6.83931 8.97375L2.49931 4.63375V5H1.24931V3.75C1.24931 3.41848 1.381 3.10054 1.61542 2.86612C1.84984 2.6317 2.16779 2.5 2.49931 2.5H12.4993ZM3.74931 8.125C3.90861 8.12518 4.06183 8.18617 4.17766 8.29553C4.2935 8.40489 4.3632 8.55435 4.37254 8.71337C4.38188 8.8724 4.33014 9.02899 4.22789 9.15114C4.12565 9.2733 3.98062 9.35181 3.82243 9.37063L3.74931 9.375H0.624308C0.465008 9.37482 0.311787 9.31383 0.195952 9.20447C0.0801173 9.09511 0.0104107 8.94565 0.00107502 8.78663C-0.00826068 8.6276 0.0434792 8.47101 0.145723 8.34886C0.247967 8.2267 0.392998 8.14819 0.551183 8.12937L0.624308 8.125H3.74931ZM3.12431 6.25C3.29007 6.25 3.44904 6.31585 3.56625 6.43306C3.68346 6.55027 3.74931 6.70924 3.74931 6.875C3.74931 7.04076 3.68346 7.19973 3.56625 7.31694C3.44904 7.43415 3.29007 7.5 3.12431 7.5H1.24931C1.08355 7.5 0.924576 7.43415 0.807366 7.31694C0.690156 7.19973 0.624308 7.04076 0.624308 6.875C0.624308 6.70924 0.690156 6.55027 0.807366 6.43306C0.924576 6.31585 1.08355 6.25 1.24931 6.25H3.12431Z'
									fill='white'
								/>
							</svg>
							{isSubmitting ? 'Đang gửi...' : 'Gửi'}
						</button>
					</div>

					{submitMessage && (
						<div
							className={`text-center text-sm p-2 rounded ${
								submitMessage.includes('thành công')
									? 'text-green-700 bg-green-100'
									: 'text-red-700 bg-red-100'
							}`}
						>
							{submitMessage}
						</div>
					)}
					{formData.file && <div className='text-sm text-blue-700'>File đã chọn: {formData.file.name}</div>}
				</form>

				<div className='flex justify-between w-full mt-6'>
					<Link
						href='tel:+84903030246'
						className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'
					>
						<svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
							<path
								d='M18.3327 9.99996C18.3327 8.90561 18.1171 7.82198 17.6983 6.81093C17.2796 5.79988 16.6657 4.88122 15.8919 4.1074C15.1181 3.33358 14.1994 2.71975 13.1884 2.30096C12.1773 1.88217 11.0937 1.66663 9.99935 1.66663V3.33329C11.3178 3.33326 12.6067 3.72419 13.703 4.45665C14.7994 5.18911 15.6539 6.23021 16.1585 7.44829C16.4936 8.25727 16.6661 9.12433 16.666 9.99996H18.3327ZM1.66602 8.33329V4.16663C1.66602 3.94561 1.75381 3.73365 1.91009 3.57737C2.06637 3.42109 2.27834 3.33329 2.49935 3.33329H6.66602C6.88703 3.33329 7.09899 3.42109 7.25527 3.57737C7.41155 3.73365 7.49935 3.94561 7.49935 4.16663V7.49996C7.49935 7.72097 7.41155 7.93293 7.25527 8.08921C7.09899 8.24549 6.88703 8.33329 6.66602 8.33329H4.99935C4.99935 10.1014 5.70173 11.7971 6.95197 13.0473C8.20221 14.2976 9.89791 15 11.666 15V13.3333C11.666 13.1123 11.7538 12.9003 11.9101 12.744C12.0664 12.5878 12.2783 12.5 12.4993 12.5H15.8327C16.0537 12.5 16.2657 12.5878 16.4219 12.744C16.5782 12.9003 16.666 13.1123 16.666 13.3333V17.5C16.666 17.721 16.5782 17.9329 16.4219 18.0892C16.2657 18.2455 16.0537 18.3333 15.8327 18.3333H11.666C6.14352 18.3333 1.66602 13.8558 1.66602 8.33329Z'
								fill='#19376B'
							/>
							<path
								d='M14.6192 8.08667C14.8705 8.69325 14.9999 9.3434 15 10H13.5C13.5 9.07174 13.1313 8.1815 12.4749 7.52513C11.8185 6.86875 10.9283 6.5 10 6.5V5C10.9889 5.00005 11.9555 5.29333 12.7777 5.84275C13.5999 6.39217 14.2408 7.17306 14.6192 8.08667Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>0903 030 246</span>
					</Link>
					<div className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'>
						<svg xmlns='http://www.w3.org/2000/svg' width={18} height={17} viewBox='0 0 18 17' fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M1.94285 0.5L8.16644 5.85898L14.3901 0.5H1.94285ZM0.666992 0.5H0.666016V0.501172L0.666992 0.5ZM0.666016 1.6V12.1667H7.34844C7.33792 12.028 7.33265 11.889 7.33266 11.75C7.33266 8.75848 9.75777 6.33332 12.7493 6.33332C13.8232 6.33332 14.8241 6.64582 15.666 7.18484V1.60074L8.16644 8.05871L0.666016 1.6ZM14.969 15.0113L15.143 15.9762C14.4191 16.2143 13.6812 16.3333 12.9293 16.3333C11.5455 16.3333 10.4197 15.9302 9.5518 15.1241C8.62794 14.2719 8.16602 13.1441 8.16602 11.7406C8.16602 10.4164 8.60395 9.32831 9.4798 8.47617C10.3837 7.60318 11.5295 7.16668 12.9173 7.16668C14.1731 7.16668 15.211 7.50503 16.0309 8.18172C16.4388 8.52005 16.7568 8.93567 16.9847 9.42856C17.2167 9.93819 17.3327 10.5 17.3327 11.114C17.3327 12.0873 17.0627 12.8642 16.5228 13.4448C16.0389 13.9628 15.493 14.2218 14.885 14.2218C14.2371 14.2218 13.8812 13.9273 13.8172 13.3384C13.4172 13.9273 12.8773 14.2218 12.1974 14.2218C11.6495 14.2218 11.2156 14.0631 10.8956 13.7456C10.5477 13.4031 10.3737 12.9332 10.3737 12.3358C10.3737 11.939 10.4527 11.5495 10.6107 11.1673C10.7686 10.7851 10.9876 10.4541 11.2675 10.1742C11.7995 9.64371 12.4834 9.37846 13.3193 9.37844C13.9512 9.37844 14.5411 9.48078 15.089 9.68547L14.6871 12.292C14.6471 12.5468 14.6271 12.7327 14.6271 12.8496C14.6271 13.1378 14.7491 13.282 14.993 13.282C15.313 13.282 15.5989 13.0877 15.8509 12.6993C16.1588 12.2272 16.3128 11.6675 16.3128 11.02C16.3128 10.1303 16.0129 9.4369 15.4129 8.93984C14.7491 8.39266 13.9252 8.11906 12.9413 8.11906C12.1814 8.11906 11.4895 8.30703 10.8656 8.68297C10.2777 9.038 9.83574 9.51836 9.53981 10.1241C9.30384 10.617 9.18586 11.1642 9.18586 11.7657C9.18586 12.906 9.5818 13.8104 10.3737 14.4787C11.0696 15.0677 11.9534 15.3621 13.0253 15.3621C13.6372 15.3621 14.2851 15.2452 14.969 15.0113ZM13.8352 10.3371C13.6312 10.2786 13.4652 10.2493 13.3373 10.2494C13.1093 10.2494 12.8833 10.3089 12.6593 10.4279C12.4354 10.547 12.2434 10.711 12.0834 10.9198C11.7555 11.3417 11.5915 11.8137 11.5915 12.3358C11.5915 12.6282 11.6635 12.859 11.8075 13.0282C11.9514 13.1974 12.1474 13.282 12.3954 13.282C12.7553 13.282 13.0533 13.1274 13.2893 12.8183C13.4132 12.6596 13.5112 12.3525 13.5832 11.8972L13.8352 10.3371Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>admin@bachkhoa.tech</span>
					</div>
				</div>
			</div>
		</div>
	);
};

// Partnership Form
const PartnershipForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		message: '',
		file: null as File | null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({ ...prev, file }));
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage('');

		try {
			const result = await sendEmail(formData, 'LIÊN HỆ HỢP TÁC');

			if (result.success) {
				setSubmitMessage('Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
				setFormData({
					fullName: '',
					phone: '',
					email: '',
					message: '',
					file: null,
				});
			} else {
				setSubmitMessage(result.error || 'Có lỗi xảy ra, vui lòng thử lại.');
			}
		} catch (error) {
			setSubmitMessage('Có lỗi xảy ra, vui lòng thử lại.');
		}

		setIsSubmitting(false);
	};
	return (
		<div
			className='bg-cover bg-center bg-no-repeat relative'
			style={{
				backgroundImage: "url('/images/contact.png')",
			}}
		>
			<div className='max-w-md bg-[#D1F6FBAD]/60 p-6 flex flex-col items-center'>
				<div className='flex items-center gap-4 mb-6'>
					<div className='text-center'>
						<h3 className='text-xl font-bold text-blue-800 mb-2'>LIÊN HỆ HỢP TÁC</h3>
						<p className='text-blue-700 text-sm'>
							Bách Khoa vô cùng hân hạnh được đồng hành cùng
							<br />
							Quý Đối tác và Khách hàng!
						</p>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='space-y-4 w-full'>
					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
								<circle cx='12' cy='7' r='4' />
							</svg>
						</div>
						<input
							type='text'
							placeholder='---Nhập họ tên/tên doanh nghiệp---'
							className='flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.fullName}
							onChange={handleInputChange}
							name='fullName'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
							</svg>
						</div>
						<input
							type='tel'
							placeholder='---Nhập số điện thoại---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.phone}
							onChange={handleInputChange}
							name='phone'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
								<polyline points='22,6 12,13 2,6' />
							</svg>
						</div>
						<input
							type='email'
							placeholder='---Nhập địa chỉ email---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.email}
							onChange={handleInputChange}
							name='email'
							required
						/>
					</div>

					<div className='flex items-start gap-3'>
						<div className='bg-white p-2 rounded-full mt-1'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
								<polyline points='14,2 14,8 20,8' />
								<line x1='16' y1='13' x2='8' y2='13' />
								<line x1='16' y1='17' x2='8' y2='17' />
								<polyline points='10,9 9,9 8,9' />
							</svg>
						</div>
						<textarea
							placeholder='---Nhập mô tả về yêu cầu hợp tác---'
							rows={4}
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
							value={formData.message}
							onChange={handleInputChange}
							name='message'
							required
						/>
					</div>

					<div className='flex justify-center gap-3 mt-6'>
						<button className='bg-[#19376B] flex items-center gap-1 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M10 6.875V3.75H11.25V6.875H10ZM6.875 11.1875C6.51042 11.0833 6.21104 10.8802 5.97687 10.5781C5.74271 10.276 5.62542 9.92708 5.625 9.53125V3.75H6.875V11.1875ZM7.34375 13.75C6.26042 13.75 5.33854 13.3698 4.57812 12.6094C3.81771 11.849 3.4375 10.9271 3.4375 9.84375V4.0625C3.4375 3.28125 3.71104 2.61729 4.25813 2.07063C4.80521 1.52396 5.46917 1.25042 6.25 1.25C7.03083 1.24958 7.695 1.52313 8.2425 2.07063C8.79 2.61813 9.06333 3.28208 9.0625 4.0625V8.75H7.8125V4.0625C7.80208 3.625 7.64854 3.25521 7.35187 2.95313C7.05521 2.65104 6.68792 2.5 6.25 2.5C5.81208 2.5 5.44229 2.65104 5.14063 2.95313C4.83896 3.25521 4.68792 3.625 4.6875 4.0625V9.84375C4.67708 10.5833 4.93229 11.211 5.45313 11.7269C5.97396 12.2427 6.60417 12.5004 7.34375 12.5C7.60417 12.5 7.85167 12.4662 8.08625 12.3987C8.32083 12.3312 8.54208 12.2296 8.75 12.0938V13.4844C8.53125 13.5677 8.30458 13.6329 8.07 13.68C7.83542 13.7271 7.59333 13.7504 7.34375 13.75ZM10 13.125V11.25H8.125V10H10V8.125H11.25V10H13.125V11.25H11.25V13.125H10Z'
									fill='white'
								/>
							</svg>
							Chọn tệp
							<input
								type='file'
								onChange={handleFileChange}
								className='hidden'
								accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
							/>
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='bg-[#19376B] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors flex items-center gap-2'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M12.4993 2.5C12.8308 2.5 13.1488 2.6317 13.3832 2.86612C13.6176 3.10054 13.7493 3.41848 13.7493 3.75V11.25C13.7493 11.5815 13.6176 11.8995 13.3832 12.1339C13.1488 12.3683 12.8308 12.5 12.4993 12.5H2.49931C2.16779 12.5 1.84984 12.3683 1.61542 12.1339C1.381 11.8995 1.24931 11.5815 1.24931 11.25V10.625H2.49931V11.25H12.4993V4.63937L8.16493 8.97375C7.98912 9.1495 7.75071 9.24824 7.50212 9.24824C7.25353 9.24824 7.01511 9.1495 6.83931 8.97375L2.49931 4.63375V5H1.24931V3.75C1.24931 3.41848 1.381 3.10054 1.61542 2.86612C1.84984 2.6317 2.16779 2.5 2.49931 2.5H12.4993ZM3.74931 8.125C3.90861 8.12518 4.06183 8.18617 4.17766 8.29553C4.2935 8.40489 4.3632 8.55435 4.37254 8.71337C4.38188 8.8724 4.33014 9.02899 4.22789 9.15114C4.12565 9.2733 3.98062 9.35181 3.82243 9.37063L3.74931 9.375H0.624308C0.465008 9.37482 0.311787 9.31383 0.195952 9.20447C0.0801173 9.09511 0.0104107 8.94565 0.00107502 8.78663C-0.00826068 8.6276 0.0434792 8.47101 0.145723 8.34886C0.247967 8.2267 0.392998 8.14819 0.551183 8.12937L0.624308 8.125H3.74931ZM3.12431 6.25C3.29007 6.25 3.44904 6.31585 3.56625 6.43306C3.68346 6.55027 3.74931 6.70924 3.74931 6.875C3.74931 7.04076 3.68346 7.19973 3.56625 7.31694C3.44904 7.43415 3.29007 7.5 3.12431 7.5H1.24931C1.08355 7.5 0.924576 7.43415 0.807366 7.31694C0.690156 7.19973 0.624308 7.04076 0.624308 6.875C0.624308 6.70924 0.690156 6.55027 0.807366 6.43306C0.924576 6.31585 1.08355 6.25 1.24931 6.25H3.12431Z'
									fill='white'
								/>
							</svg>
							{isSubmitting ? 'Đang gửi...' : 'Gửi'}
						</button>
					</div>
					{submitMessage && (
						<div
							className={`text-center text-sm p-2 rounded ${
								submitMessage.includes('thành công')
									? 'text-green-700 bg-green-100'
									: 'text-red-700 bg-red-100'
							}`}
						>
							{submitMessage}
						</div>
					)}

					{formData.file && <div className='text-sm text-blue-700'>File đã chọn: {formData.file.name}</div>}
				</form>

				<div className='flex justify-between w-full mt-6'>
					<Link
						href='tel:+84903030246'
						className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'
					>
						<svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
							<path
								d='M18.3327 9.99996C18.3327 8.90561 18.1171 7.82198 17.6983 6.81093C17.2796 5.79988 16.6657 4.88122 15.8919 4.1074C15.1181 3.33358 14.1994 2.71975 13.1884 2.30096C12.1773 1.88217 11.0937 1.66663 9.99935 1.66663V3.33329C11.3178 3.33326 12.6067 3.72419 13.703 4.45665C14.7994 5.18911 15.6539 6.23021 16.1585 7.44829C16.4936 8.25727 16.6661 9.12433 16.666 9.99996H18.3327ZM1.66602 8.33329V4.16663C1.66602 3.94561 1.75381 3.73365 1.91009 3.57737C2.06637 3.42109 2.27834 3.33329 2.49935 3.33329H6.66602C6.88703 3.33329 7.09899 3.42109 7.25527 3.57737C7.41155 3.73365 7.49935 3.94561 7.49935 4.16663V7.49996C7.49935 7.72097 7.41155 7.93293 7.25527 8.08921C7.09899 8.24549 6.88703 8.33329 6.66602 8.33329H4.99935C4.99935 10.1014 5.70173 11.7971 6.95197 13.0473C8.20221 14.2976 9.89791 15 11.666 15V13.3333C11.666 13.1123 11.7538 12.9003 11.9101 12.744C12.0664 12.5878 12.2783 12.5 12.4993 12.5H15.8327C16.0537 12.5 16.2657 12.5878 16.4219 12.744C16.5782 12.9003 16.666 13.1123 16.666 13.3333V17.5C16.666 17.721 16.5782 17.9329 16.4219 18.0892C16.2657 18.2455 16.0537 18.3333 15.8327 18.3333H11.666C6.14352 18.3333 1.66602 13.8558 1.66602 8.33329Z'
								fill='#19376B'
							/>
							<path
								d='M14.6192 8.08667C14.8705 8.69325 14.9999 9.3434 15 10H13.5C13.5 9.07174 13.1313 8.1815 12.4749 7.52513C11.8185 6.86875 10.9283 6.5 10 6.5V5C10.9889 5.00005 11.9555 5.29333 12.7777 5.84275C13.5999 6.39217 14.2408 7.17306 14.6192 8.08667Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>0903 030 246</span>
					</Link>
					<div className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'>
						<svg xmlns='http://www.w3.org/2000/svg' width={18} height={17} viewBox='0 0 18 17' fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M1.94285 0.5L8.16644 5.85898L14.3901 0.5H1.94285ZM0.666992 0.5H0.666016V0.501172L0.666992 0.5ZM0.666016 1.6V12.1667H7.34844C7.33792 12.028 7.33265 11.889 7.33266 11.75C7.33266 8.75848 9.75777 6.33332 12.7493 6.33332C13.8232 6.33332 14.8241 6.64582 15.666 7.18484V1.60074L8.16644 8.05871L0.666016 1.6ZM14.969 15.0113L15.143 15.9762C14.4191 16.2143 13.6812 16.3333 12.9293 16.3333C11.5455 16.3333 10.4197 15.9302 9.5518 15.1241C8.62794 14.2719 8.16602 13.1441 8.16602 11.7406C8.16602 10.4164 8.60395 9.32831 9.4798 8.47617C10.3837 7.60318 11.5295 7.16668 12.9173 7.16668C14.1731 7.16668 15.211 7.50503 16.0309 8.18172C16.4388 8.52005 16.7568 8.93567 16.9847 9.42856C17.2167 9.93819 17.3327 10.5 17.3327 11.114C17.3327 12.0873 17.0627 12.8642 16.5228 13.4448C16.0389 13.9628 15.493 14.2218 14.885 14.2218C14.2371 14.2218 13.8812 13.9273 13.8172 13.3384C13.4172 13.9273 12.8773 14.2218 12.1974 14.2218C11.6495 14.2218 11.2156 14.0631 10.8956 13.7456C10.5477 13.4031 10.3737 12.9332 10.3737 12.3358C10.3737 11.939 10.4527 11.5495 10.6107 11.1673C10.7686 10.7851 10.9876 10.4541 11.2675 10.1742C11.7995 9.64371 12.4834 9.37846 13.3193 9.37844C13.9512 9.37844 14.5411 9.48078 15.089 9.68547L14.6871 12.292C14.6471 12.5468 14.6271 12.7327 14.6271 12.8496C14.6271 13.1378 14.7491 13.282 14.993 13.282C15.313 13.282 15.5989 13.0877 15.8509 12.6993C16.1588 12.2272 16.3128 11.6675 16.3128 11.02C16.3128 10.1303 16.0129 9.4369 15.4129 8.93984C14.7491 8.39266 13.9252 8.11906 12.9413 8.11906C12.1814 8.11906 11.4895 8.30703 10.8656 8.68297C10.2777 9.038 9.83574 9.51836 9.53981 10.1241C9.30384 10.617 9.18586 11.1642 9.18586 11.7657C9.18586 12.906 9.5818 13.8104 10.3737 14.4787C11.0696 15.0677 11.9534 15.3621 13.0253 15.3621C13.6372 15.3621 14.2851 15.2452 14.969 15.0113ZM13.8352 10.3371C13.6312 10.2786 13.4652 10.2493 13.3373 10.2494C13.1093 10.2494 12.8833 10.3089 12.6593 10.4279C12.4354 10.547 12.2434 10.711 12.0834 10.9198C11.7555 11.3417 11.5915 11.8137 11.5915 12.3358C11.5915 12.6282 11.6635 12.859 11.8075 13.0282C11.9514 13.1974 12.1474 13.282 12.3954 13.282C12.7553 13.282 13.0533 13.1274 13.2893 12.8183C13.4132 12.6596 13.5112 12.3525 13.5832 11.8972L13.8352 10.3371Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>admin@bachkhoa.tech</span>
					</div>
				</div>
			</div>
		</div>
	);
};

// Career Opportunities Form
const CareerForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		email: '',
		message: '',
		file: null as File | null,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitMessage, setSubmitMessage] = useState('');
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({ ...prev, file }));
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitMessage('');

		try {
			const result = await sendEmail(formData, 'CƠ HỘI NGHỀ NGHIỆP');

			if (result.success) {
				setSubmitMessage('Gửi thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
				setFormData({
					fullName: '',
					phone: '',
					email: '',
					message: '',
					file: null,
				});
			} else {
				setSubmitMessage(result.error || 'Có lỗi xảy ra, vui lòng thử lại.');
			}
		} catch (error) {
			setSubmitMessage('Có lỗi xảy ra, vui lòng thử lại.');
		}

		setIsSubmitting(false);
	};
	return (
		<div
			className='bg-cover bg-center bg-no-repeat relative'
			style={{
				backgroundImage: "url('/images/tuyendung.png')",
			}}
		>
			<div className='max-w-md bg-[#D1F6FBAD]/60 p-6 flex flex-col items-center'>
				<div className='flex items-start gap-4 mb-6'>
					<div className='text-center'>
						<h3 className='text-xl font-bold text-blue-800 mb-2'>CƠ HỘI NGHỀ NGHIỆP</h3>
						<p className='text-blue-700 text-sm'>
							Bách Khoa rất hoan nghênh bạn gia nhập đội ngũ và là
							<br />
							thành viên mới trong hành trình chuyển đổi số giáo dục
						</p>
					</div>
				</div>
				<form onSubmit={handleSubmit} className='space-y-4 w-full'>
					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
								<circle cx='12' cy='7' r='4' />
							</svg>
						</div>
						<input
							type='text'
							placeholder='---Nhập họ tên---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.fullName}
							onChange={handleInputChange}
							name='fullName'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
							</svg>
						</div>
						<input
							type='tel'
							placeholder='---Nhập số điện thoại---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.phone}
							onChange={handleInputChange}
							name='phone'
							required
						/>
					</div>

					<div className='flex items-center gap-3'>
						<div className='bg-white p-2 rounded-full'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
								<polyline points='22,6 12,13 2,6' />
							</svg>
						</div>
						<input
							type='email'
							placeholder='---Nhập địa chỉ email---'
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							value={formData.email}
							onChange={handleInputChange}
							name='email'
							required
						/>
					</div>

					<div className='flex items-start gap-3'>
						<div className='bg-white p-2 rounded-full mt-1'>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								stroke='#19376B'
								strokeWidth='2'
							>
								<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
								<polyline points='14,2 14,8 20,8' />
								<line x1='16' y1='13' x2='8' y2='13' />
								<line x1='16' y1='17' x2='8' y2='17' />
								<polyline points='10,9 9,9 8,9' />
							</svg>
						</div>
						<textarea
							placeholder='---Nhập mô tả bản thân và vị trí muốn ứng tuyển---'
							rows={4}
							className='flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
							value={formData.message}
							onChange={handleInputChange}
							name='message'
							required
						/>
					</div>
					<div className='flex justify-center gap-3 mt-6'>
						<button className='bg-[#19376B] flex items-center gap-1 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M10 6.875V3.75H11.25V6.875H10ZM6.875 11.1875C6.51042 11.0833 6.21104 10.8802 5.97687 10.5781C5.74271 10.276 5.62542 9.92708 5.625 9.53125V3.75H6.875V11.1875ZM7.34375 13.75C6.26042 13.75 5.33854 13.3698 4.57812 12.6094C3.81771 11.849 3.4375 10.9271 3.4375 9.84375V4.0625C3.4375 3.28125 3.71104 2.61729 4.25813 2.07063C4.80521 1.52396 5.46917 1.25042 6.25 1.25C7.03083 1.24958 7.695 1.52313 8.2425 2.07063C8.79 2.61813 9.06333 3.28208 9.0625 4.0625V8.75H7.8125V4.0625C7.80208 3.625 7.64854 3.25521 7.35187 2.95313C7.05521 2.65104 6.68792 2.5 6.25 2.5C5.81208 2.5 5.44229 2.65104 5.14063 2.95313C4.83896 3.25521 4.68792 3.625 4.6875 4.0625V9.84375C4.67708 10.5833 4.93229 11.211 5.45313 11.7269C5.97396 12.2427 6.60417 12.5004 7.34375 12.5C7.60417 12.5 7.85167 12.4662 8.08625 12.3987C8.32083 12.3312 8.54208 12.2296 8.75 12.0938V13.4844C8.53125 13.5677 8.30458 13.6329 8.07 13.68C7.83542 13.7271 7.59333 13.7504 7.34375 13.75ZM10 13.125V11.25H8.125V10H10V8.125H11.25V10H13.125V11.25H11.25V13.125H10Z'
									fill='white'
								/>
							</svg>
							Chọn tệp
							<input
								type='file'
								onChange={handleFileChange}
								className='hidden'
								accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
							/>
						</button>
						<button
							type='submit'
							disabled={isSubmitting}
							className='bg-[#19376B] text-white px-6 py-2 rounded-full hover:bg-blue-900 transition-colors flex items-center gap-2'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width={15}
								height={15}
								viewBox='0 0 15 15'
								fill='none'
							>
								<path
									d='M12.4993 2.5C12.8308 2.5 13.1488 2.6317 13.3832 2.86612C13.6176 3.10054 13.7493 3.41848 13.7493 3.75V11.25C13.7493 11.5815 13.6176 11.8995 13.3832 12.1339C13.1488 12.3683 12.8308 12.5 12.4993 12.5H2.49931C2.16779 12.5 1.84984 12.3683 1.61542 12.1339C1.381 11.8995 1.24931 11.5815 1.24931 11.25V10.625H2.49931V11.25H12.4993V4.63937L8.16493 8.97375C7.98912 9.1495 7.75071 9.24824 7.50212 9.24824C7.25353 9.24824 7.01511 9.1495 6.83931 8.97375L2.49931 4.63375V5H1.24931V3.75C1.24931 3.41848 1.381 3.10054 1.61542 2.86612C1.84984 2.6317 2.16779 2.5 2.49931 2.5H12.4993ZM3.74931 8.125C3.90861 8.12518 4.06183 8.18617 4.17766 8.29553C4.2935 8.40489 4.3632 8.55435 4.37254 8.71337C4.38188 8.8724 4.33014 9.02899 4.22789 9.15114C4.12565 9.2733 3.98062 9.35181 3.82243 9.37063L3.74931 9.375H0.624308C0.465008 9.37482 0.311787 9.31383 0.195952 9.20447C0.0801173 9.09511 0.0104107 8.94565 0.00107502 8.78663C-0.00826068 8.6276 0.0434792 8.47101 0.145723 8.34886C0.247967 8.2267 0.392998 8.14819 0.551183 8.12937L0.624308 8.125H3.74931ZM3.12431 6.25C3.29007 6.25 3.44904 6.31585 3.56625 6.43306C3.68346 6.55027 3.74931 6.70924 3.74931 6.875C3.74931 7.04076 3.68346 7.19973 3.56625 7.31694C3.44904 7.43415 3.29007 7.5 3.12431 7.5H1.24931C1.08355 7.5 0.924576 7.43415 0.807366 7.31694C0.690156 7.19973 0.624308 7.04076 0.624308 6.875C0.624308 6.70924 0.690156 6.55027 0.807366 6.43306C0.924576 6.31585 1.08355 6.25 1.24931 6.25H3.12431Z'
									fill='white'
								/>
							</svg>
							{isSubmitting ? 'Đang gửi...' : 'Gửi'}
						</button>
					</div>
					{submitMessage && (
						<div
							className={`text-center text-sm p-2 rounded ${
								submitMessage.includes('thành công')
									? 'text-green-700 bg-green-100'
									: 'text-red-700 bg-red-100'
							}`}
						>
							{submitMessage}
						</div>
					)}

					{formData.file && <div className='text-sm text-blue-700'>File đã chọn: {formData.file.name}</div>}
				</form>

				<div className='flex justify-between w-full mt-6'>
					<Link
						href='tel:+84903030246'
						className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'
					>
						<svg xmlns='http://www.w3.org/2000/svg' width={20} height={20} viewBox='0 0 20 20' fill='none'>
							<path
								d='M18.3327 9.99996C18.3327 8.90561 18.1171 7.82198 17.6983 6.81093C17.2796 5.79988 16.6657 4.88122 15.8919 4.1074C15.1181 3.33358 14.1994 2.71975 13.1884 2.30096C12.1773 1.88217 11.0937 1.66663 9.99935 1.66663V3.33329C11.3178 3.33326 12.6067 3.72419 13.703 4.45665C14.7994 5.18911 15.6539 6.23021 16.1585 7.44829C16.4936 8.25727 16.6661 9.12433 16.666 9.99996H18.3327ZM1.66602 8.33329V4.16663C1.66602 3.94561 1.75381 3.73365 1.91009 3.57737C2.06637 3.42109 2.27834 3.33329 2.49935 3.33329H6.66602C6.88703 3.33329 7.09899 3.42109 7.25527 3.57737C7.41155 3.73365 7.49935 3.94561 7.49935 4.16663V7.49996C7.49935 7.72097 7.41155 7.93293 7.25527 8.08921C7.09899 8.24549 6.88703 8.33329 6.66602 8.33329H4.99935C4.99935 10.1014 5.70173 11.7971 6.95197 13.0473C8.20221 14.2976 9.89791 15 11.666 15V13.3333C11.666 13.1123 11.7538 12.9003 11.9101 12.744C12.0664 12.5878 12.2783 12.5 12.4993 12.5H15.8327C16.0537 12.5 16.2657 12.5878 16.4219 12.744C16.5782 12.9003 16.666 13.1123 16.666 13.3333V17.5C16.666 17.721 16.5782 17.9329 16.4219 18.0892C16.2657 18.2455 16.0537 18.3333 15.8327 18.3333H11.666C6.14352 18.3333 1.66602 13.8558 1.66602 8.33329Z'
								fill='#19376B'
							/>
							<path
								d='M14.6192 8.08667C14.8705 8.69325 14.9999 9.3434 15 10H13.5C13.5 9.07174 13.1313 8.1815 12.4749 7.52513C11.8185 6.86875 10.9283 6.5 10 6.5V5C10.9889 5.00005 11.9555 5.29333 12.7777 5.84275C13.5999 6.39217 14.2408 7.17306 14.6192 8.08667Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>0903 030 246</span>
					</Link>
					<div className='flex items-center gap-2 text-sm text-blue-800 rounded-full bg-white border-2 border-blue-500 px-3 py-1.5'>
						<svg xmlns='http://www.w3.org/2000/svg' width={18} height={17} viewBox='0 0 18 17' fill='none'>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M1.94285 0.5L8.16644 5.85898L14.3901 0.5H1.94285ZM0.666992 0.5H0.666016V0.501172L0.666992 0.5ZM0.666016 1.6V12.1667H7.34844C7.33792 12.028 7.33265 11.889 7.33266 11.75C7.33266 8.75848 9.75777 6.33332 12.7493 6.33332C13.8232 6.33332 14.8241 6.64582 15.666 7.18484V1.60074L8.16644 8.05871L0.666016 1.6ZM14.969 15.0113L15.143 15.9762C14.4191 16.2143 13.6812 16.3333 12.9293 16.3333C11.5455 16.3333 10.4197 15.9302 9.5518 15.1241C8.62794 14.2719 8.16602 13.1441 8.16602 11.7406C8.16602 10.4164 8.60395 9.32831 9.4798 8.47617C10.3837 7.60318 11.5295 7.16668 12.9173 7.16668C14.1731 7.16668 15.211 7.50503 16.0309 8.18172C16.4388 8.52005 16.7568 8.93567 16.9847 9.42856C17.2167 9.93819 17.3327 10.5 17.3327 11.114C17.3327 12.0873 17.0627 12.8642 16.5228 13.4448C16.0389 13.9628 15.493 14.2218 14.885 14.2218C14.2371 14.2218 13.8812 13.9273 13.8172 13.3384C13.4172 13.9273 12.8773 14.2218 12.1974 14.2218C11.6495 14.2218 11.2156 14.0631 10.8956 13.7456C10.5477 13.4031 10.3737 12.9332 10.3737 12.3358C10.3737 11.939 10.4527 11.5495 10.6107 11.1673C10.7686 10.7851 10.9876 10.4541 11.2675 10.1742C11.7995 9.64371 12.4834 9.37846 13.3193 9.37844C13.9512 9.37844 14.5411 9.48078 15.089 9.68547L14.6871 12.292C14.6471 12.5468 14.6271 12.7327 14.6271 12.8496C14.6271 13.1378 14.7491 13.282 14.993 13.282C15.313 13.282 15.5989 13.0877 15.8509 12.6993C16.1588 12.2272 16.3128 11.6675 16.3128 11.02C16.3128 10.1303 16.0129 9.4369 15.4129 8.93984C14.7491 8.39266 13.9252 8.11906 12.9413 8.11906C12.1814 8.11906 11.4895 8.30703 10.8656 8.68297C10.2777 9.038 9.83574 9.51836 9.53981 10.1241C9.30384 10.617 9.18586 11.1642 9.18586 11.7657C9.18586 12.906 9.5818 13.8104 10.3737 14.4787C11.0696 15.0677 11.9534 15.3621 13.0253 15.3621C13.6372 15.3621 14.2851 15.2452 14.969 15.0113ZM13.8352 10.3371C13.6312 10.2786 13.4652 10.2493 13.3373 10.2494C13.1093 10.2494 12.8833 10.3089 12.6593 10.4279C12.4354 10.547 12.2434 10.711 12.0834 10.9198C11.7555 11.3417 11.5915 11.8137 11.5915 12.3358C11.5915 12.6282 11.6635 12.859 11.8075 13.0282C11.9514 13.1974 12.1474 13.282 12.3954 13.282C12.7553 13.282 13.0533 13.1274 13.2893 12.8183C13.4132 12.6596 13.5112 12.3525 13.5832 11.8972L13.8352 10.3371Z'
								fill='#19376B'
							/>
						</svg>
						<span className='font-semibold'>admin@bachkhoa.tech</span>
					</div>
				</div>
			</div>
		</div>
	);
};

function VerticalTabs({ tabs = [], className }: VerticalTabsProps) {
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

	const renderContent = () => {
		switch (activeTab) {
			case 'support':
				return <SupportServiceForm />;
			case 'partnership':
				return <PartnershipForm />;
			case 'career':
				return <CareerForm />;
			default:
				return <SupportServiceForm />;
		}
	};

	return (
		<div className={`flex w-full container-lg mx-auto ${className || ''}`}>
			{/* Sidebar */}
			<div className='w-16 lg:w-20 bg-sky-100/80'>
				<div className='flex flex-col space-y-2 p-2'>
					{tabs.map((tab) => {
						const Icon = tab.icon;
						const isActive = activeTab === tab.id;

						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`group relative flex items-center justify-center size-14 px-3 py-2 rounded-full transition-all duration-200 ${
									isActive
										? 'bg-white shadow-lg text-white'
										: 'text-slate-600 hover:bg-blue-100 hover:text-blue-600'
								}`}
							>
								{isActive && (
									<motion.div
										layoutId='activeTab'
										className='absolute inset-0 rounded-full bg-white shadow-lg size-14'
										transition={{ type: 'spring', stiffness: 500, damping: 30 }}
									/>
								)}

								<div className='relative z-10'>
									<Icon className='w-8 h-8 lg:w-10 lg:h-10' />
								</div>
							</button>
						);
					})}
				</div>
			</div>

			{/* Content */}
			<div className='flex-1'>
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className='h-full'
					>
						{renderContent()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}

const VerticalTabsDemo = () => {
	const tabs: Tab[] = [
		{
			id: 'support',
			title: 'HỖ TRỢ DỊCH VỤ',
			icon: DashboardIcon,
			content: 'Kênh hỗ trợ trực tiếp của Bách Khoa hân hạnh hỗ trợ Quý Thầy/Cô, PHHS và các bạn Học sinh!',
		},
		{
			id: 'partnership',
			title: 'LIÊN HỆ HỢP TÁC',
			icon: AnalyticsIcon,
			content: 'Bách Khoa vô cùng hân hạnh được đồng hành cùng Quý Đối tác và Khách hàng!',
		},
		{
			id: 'career',
			title: 'CƠ HỘI NGHỀ NGHIỆP',
			icon: UsersIcon,
			content:
				'Bách Khoa rất hoan nghênh bạn gia nhập đội ngũ và là thành viên mới trong hành trình chuyển đổi số giáo dục',
		},
	];

	return <VerticalTabs tabs={tabs} />;
};

// Main Contact Page Component - DEFAULT EXPORT
const ContactPage = () => {
	return (
		<div className='py-8 lg:py-16'>
			<div className='text-center mb-8'>
				<h1 className='text-3xl lg:text-4xl font-bold mb-4'>Liên hệ</h1>
				<p className='text-gray-600 max-w-2xl mx-auto'>
					Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh sau.
				</p>
			</div>

			<div className='flex justify-center px-4'>
				<VerticalTabsDemo />
			</div>

			<div className='py-8 lg:py-16'>
				<div className='container-lg'>
					<div className='flex text-white'>
						<div className='w-1/3 h-[543px] bg-[#19376B]'>
							<div className=' p-4 flex flex-col gap-6'>
								<Image src='/images/logo.png' width={200} height={80} alt='logo' className='mx-auto' />
								<div className='flex gap-2'>
									<MapPin className='size-6' />
									<p>
										<span className='underline'>Trụ sở chính:</span> Số 03 Công Trường Quốc Tế,
										Phường Xuân Hòa, TP.HCM
									</p>
								</div>
								<div className='flex gap-2'>
									<Phone className='size-4' />
									<Link href='tel:+84903030246'>0903 030 246</Link>
								</div>
								<div className='flex gap-2'>
									<MapPin className='size-6' />
									<p>
										<span className='underline'>Chi nhánh Hà Nội:</span> 16F DAEHA Business Center,
										360 Kim Mã, Hà Nội
									</p>
								</div>
								<div className='flex gap-2'>
									<Phone className='size-4' />
									<Link href='tel:+84845698998'>08 456 98 998</Link>
								</div>
							</div>
						</div>
						<div className='w-2/3'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3750733612437!2d106.69253487480498!3d10.782558289366564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f36c0b1571d%3A0x4fb4f06e6e3e1b6b!2zMDMgQ8O0bmcgdHLGsOG7nW5nIFF14buRYyBU4bq_LCBQaMaw4budbmcgNiwgUXXhuq1uIDMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1753697616329!5m2!1svi!2s'
								width={900}
								height={450}
								style={{ border: 0 }}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								className='w-full h-full rounded-lg shadow-lg'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
