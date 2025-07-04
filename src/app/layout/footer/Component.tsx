'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QR from '@/app/layout/footer/components/QRComponent';
import VideoModal from '@/app/layout/footer/components/VideoModal';
import { featureDataFooter } from '@/app/layout/footer/footerData';

export function Footer() {
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const handleOpenVideoModal = () => {
		setIsVideoModalOpen(true);
	};

	const handleCloseVideoModal = () => {
		setIsVideoModalOpen(false);
	};

	useEffect(() => {
		const handleOpenVideoModal = () => {
			setIsVideoModalOpen(true);
		};
		window.addEventListener('openAttendanceVideoModal', handleOpenVideoModal);
		return () => {
			window.removeEventListener('openAttendanceVideoModal', handleOpenVideoModal);
		};
	}, []);

	return (
		<>
			<footer className='relative py-4'>
				<div className='absolute inset-0 z-0'>
					<img
						src='/images/footer-background.png'
						alt='Footer background'
						style={{ objectFit: 'cover', width: '100%', height: '100%' }}
					/>
				</div>
				<div className='container-lg flex flex-col relative z-10'>
					<div className='flex flex-col md:flex-row gap-8'>
						<div className='w-full md:w-1/3 flex flex-col gap-4 justify-center items-center'>
							<div>
								<img
									src='/images/logo-trung-tam-giao-duc-setdc.png'
									alt='logo'
									style={{ width: 'auto', height: '75px' }}
								/>
							</div>
							<div className='text-center'>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue font-bold'>
									TRUNG TÂM PHÁT TRIỂN GDĐT PHÍA NAM
									<br />
									BỘ GIÁO DỤC VÀ ĐÀO TẠO
								</p>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue'>
									ĐỐI TÁC NGHIÊN CỨU, ỨNG DỤNG KHCN
									<br className='block sm:hidden md:block' />
									VÀ CHUYỂN ĐỔI SỐ
								</p>
							</div>
						</div>

						<div className='w-full md:w-1/3 flex flex-col gap-4 justify-center items-center py-4'>
							<div>
								<img
									src='/images/logo-khong-nen---color.png'
									alt='logo'
									style={{ width: 'auto', height: '75px' }}
								/>
							</div>
							<div className='text-center'>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue font-bold'>
									TẬP ĐOÀN KHOA HỌC CÔNG NGHỆ BÁCH KHOA
								</p>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue'>
									Trụ sở chính:
									<Link href='https://g.co/kgs/6cvFbhb' className='text-brandBlue'>
										{' '}
										Số 3 Công Trường Quốc Tế, TP.HCM
									</Link>
								</p>
								<p className='font-montserrat  text-[10px] md:text-xs text-brandBlue'>
									Điện thoại:
									<Link href='tel:(0287)102 0246' className='font-montserrat text-brandBlue'>
										{' '}
										(0287)102 0246
									</Link>
								</p>
								<p className='font-montserrat  text-[10px] md:text-xs text-brandBlue'>
									CN Hà Nội:
									<Link href='https://g.co/kgs/SEu34ht' className='text-brandBlue'>
										16F DAEHA Business Center,
										<br className='break-line hidden md:block' /> 360 Kim Mã, Hà Nội
									</Link>
								</p>
								<p className='font-montserrat  text-[10px] md:text-xs text-brandBlue'>
									Điện thoại:
									<Link href='tel:(0287)102 0246' className='font-montserrat text-brandBlue'>
										{' '}
										084 569 8998
									</Link>
								</p>
							</div>
						</div>

						<div className='w-full md:w-1/3 flex flex-col gap-4 justify-center items-center'>
							<div>
								<img src='/images/logo-stb.png' alt='logo' style={{ width: 'auto', height: '75px' }} />
							</div>
							<div className='text-center'>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue font-bold'>
									CÔNG TY CỔ PHẦN
									<br />
									SÁCH VÀ THIẾT BỊ TRƯỜNG HỌC TPHCM
								</p>
								<p className='font-montserrat text-[10px] md:text-xs text-brandBlue'>
									ĐƠN VỊ CUNG CẤP HỌC LIỆU SỐ BẢN QUYỀN
								</p>
							</div>
						</div>
					</div>

					<div className='w-full h-px bg-gray-300 my-4'></div>

					<div className='footer-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 relative'>
						{featureDataFooter.map((item, index) => {
							return (
								<div key={index} className='my-2'>
									<div className='h-10'>
										{item.titleComponent ? (
											item.titleComponent()
										) : (
											<h3 className='text-left text-sm text-brandBlue font-bold mb-4'>
												{item.title}
											</h3>
										)}
									</div>
									<div className='gap-x-4 gap-y-2 g md:gap-1'>
										{item?.items?.map((item2, index2) => {
											if (item2.type === 'link') {
												return (
													<div key={index2} className='flex items-start gap-2'>
														{item2.icon && (
															<img src={item2.icon} alt='icon' className='my-1 size-4' />
														)}
														<Link
															key={index2}
															href={item2.link || '#'}
															className='text-brandBlue text-justify text-left block text-[13px] py-1 hover:text-brandBlueLight'
															target='_blank'
														>
															{item2.titleComponent
																? item2.titleComponent()
																: item2.title}
														</Link>
													</div>
												);
											} else if (item2.type === 'action') {
												return (
													<div key={index2} className='flex items-start gap-2'>
														{item2.icon && (
															<img src={item2.icon} alt='icon' className='my-1 size-4' />
														)}
														<button
															key={index2}
															onClick={item2.onClick}
															className='text-brandBlue text-justify text-left block text-[13px] py-1 hover:text-brandBlueLight w-full text-left'
														>
															{item2.titleComponent
																? item2.titleComponent()
																: item2.title}
														</button>
													</div>
												);
											} else if (item2.type === 'component') {
												return (
													<div key={index2} className='hidden md:block'>
														{item2.component()}
													</div>
												);
											}
										})}
									</div>
								</div>
							);
						})}
						<div className='block md:hidden'>
							<QR />
						</div>
					</div>

					<div className='line-divider divide-gray-400'></div>

					{/* <div className="qr-code-container flex gap-4 my-4">
            <QRCodeSVG
              value={`${process.env.NEXT_PUBLIC_SITE_URL || ''}/app-redirect`}
              size={72}
            />
            <div className="flex flex-col gap-2">
              <Link href="https://apps.apple.com/vn/app/lms360/id6475024661?l=vi" target="_blank">
                <img src="/images/app-store-download.png" alt="logo" style={{ width: 'auto', height: '30px' }} />
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=lms360.edu.vn" target="_blank">
                <img src="/images/google-play-download.png" alt="logo" style={{ width: 'auto', height: '30px' }} />
              </Link>
            </div>
          </div> */}

					<div className='w-full h-px bg-gray-300 my-4'></div>

					<div className='flex flex-col justify-center md:flex-row md:justify-between md:items-center gap-4'>
						<div>
							<p className='text-montserrat text-xs md:text-sm lg:text-base text-center md:text-left text-brandBlue'>
								Copyright ©2021 - Bản quyền thuộc <br className='sm:hidden' />
								Công Ty Cổ Phần Tập Đoàn <br className='md:hidden' />
								Khoa Học Công Nghệ Bách Khoa
							</p>
						</div>
						<div className='flex justify-center gap-2'>
							<Link href='https://www.facebook.com/lms360elearning' target='_blank'>
								<img src='/icons/Facebook.svg' alt='facebook' className='size-8' />
							</Link>
							<Link href='https://www.youtube.com/@lms360elearning-pg8ps' target='_blank'>
								<img src='/icons/Youtube.svg' alt='youtube' className='size-8' />
							</Link>
							<Link href='https://www.tiktok.com/@bk.tech360' target='_blank'>
								<img src='/icons/TikTok.svg' alt='tiktok' className='size-8' />
							</Link>
						</div>
					</div>
				</div>
			</footer>
			<VideoModal
				isOpen={isVideoModalOpen}
				onClose={handleCloseVideoModal}
				videoUrl='/videos/attendance-by-cammera.mp4'
			/>
		</>
	);
}
