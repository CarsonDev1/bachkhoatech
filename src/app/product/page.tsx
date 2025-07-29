'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users } from 'lucide-react';
import CarouselCards from '@/app/components/carousel-card';
import CountUp from '@/app/components/count-up';

// Đăng ký plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProductPage = () => {
	const containerRef = useRef(null);
	const titleRef = useRef(null);
	const descRef = useRef(null);
	const buttonRef = useRef(null);
	const robotRef = useRef(null);
	const progressRef = useRef<any>(null);
	const [currentProductIndex, setCurrentProductIndex] = useState(0);

	const data = [
		{
			id: 1,
			image: '/images/logo-schools/1.png',
			name: 'Trường TH Trần Quốc Toản',
		},
		{
			id: 2,
			image: '/images/logo-schools/2.png',
			name: 'Trường TH Phạm Văn Chính',
		},
		{
			id: 3,
			image: '/images/logo-schools/30.png',
			name: 'Trường THCS Nguyễn Vĩnh Nghiệp',
		},
		{
			id: 4,
			image: '/images/logo-schools/4.png',
			name: 'Trường TH Lương Thế Vinh',
		},
		{
			id: 5,
			image: '/images/logo-schools/5.png',
			name: 'Trường TH Tân Sơn Nhì',
		},
		{
			id: 6,
			image: '/images/logo-schools/6.png',
			name: 'Trường TH Hồ Văn Huê',
		},
		{
			id: 17,
			image: '/images/logo-schools/17.png',
			name: 'Trường TH Thuận Kiều',
		},
		{
			id: 24,
			image: '/images/logo-schools/24.png',
			name: 'Trường TH Huỳnh Mẫn Đạt',
		},
		{
			id: 25,
			image: '/images/logo-schools/25.png',
			name: 'Trường TH Nguyễn Trung Ngạn',
		},
		{
			id: 26,
			image: '/images/logo-schools/26.png',
			name: 'Trường TH Trần Quang Cơ',
		},
		{
			id: 27,
			image: '/images/logo-schools/27.png',
			name: 'Trường TH Huỳnh Văn Chính',
		},
		{
			id: 7,
			image: '/images/logo-schools/7.png',
			name: 'Trường THCS Cần Thạnh',
		},
		{
			id: 8,
			image: '/images/logo-schools/8.png',
			name: 'Trường THCS Tôn Thất Tùng',
		},
		{
			id: 9,
			image: '/images/logo-schools/9.png',
			name: 'Trường THCS Trần Huy Liệu',
		},
		{
			id: 10,
			image: '/images/logo-schools/10.png',
			name: 'Trường THCS Đặng Trần Côn',
		},
		{
			id: 11,
			image: '/images/logo-schools/11.png',
			name: 'Trường THCS Lê Văn Tám',
		},
		{
			id: 28,
			image: '/images/logo-schools/28.png',
			name: 'Trường THCS Hai Bà Trưng',
		},
		{
			id: 29,
			image: '/images/logo-schools/29.png',
			name: 'Trường THCS Lê Văn Hưu',
		},
		{
			id: 30,
			image: '/images/logo-schools/30.png',
			name: 'Trường THCS Nguyễn Vĩnh Nghiệp',
		},
		{
			id: 12,
			image: '/images/logo-schools/12.png',
			name: 'Trường THPT Trần Hữu Trang',
		},
		{
			id: 13,
			image: '/images/logo-schools/13.png',
			name: 'Trường THPT Nguyễn Hữu Thọ',
		},
		{
			id: 14,
			image: '/images/logo-schools/14.png',
			name: 'Trường THPT Nguyễn Huệ',
		},
		{
			id: 15,
			image: '/images/logo-schools/15.png',
			name: 'Trường THPT Gò Vấp',
		},
		{
			id: 16,
			image: '/images/logo-schools/16.png',
			name: 'Trường THPT Bình Tân',
		},

		{
			id: 18,
			image: '/images/logo-schools/18.png',
			name: 'Trường THPT Bùi Thị Xuân',
		},
		{
			id: 19,
			image: '/images/logo-schools/19.png',
			name: 'Trường THPT Tạ Quang Bửu',
		},
		{
			id: 20,
			image: '/images/logo-schools/20.png',
			name: 'Trường THPT Phú Nhuận',
		},
		{
			id: 21,
			image: '/images/logo-schools/21.png',
			name: 'Trường THPT Nguyễn Khuyến',
		},
		{
			id: 22,
			image: '/images/logo-schools/22.png',
			name: 'Trường THPT Trần Hưng Đạo',
		},
		{
			id: 23,
			image: '/images/logo-schools/23.png',
			name: 'Trường THPT Nguyễn Công Trứ',
		},
	];

	const products = [
		{
			id: 1,
			title: 'LMS360',
			titleColor: '#0FF',
			description:
				'Nền tảng học tập số toàn diện hỗ trợ dạy – học mọi lúc, mọi nơi. LMS360 cung cấp kho học liệu số, lớp học trực tuyến, giao – nộp bài, thảo luận, đánh giá và theo dõi tiến độ học tập theo cá nhân hóa, phù hợp với mọi cấp học.',
			buttonText: 'KHÁM PHÁ NGAY',
			buttonLink: 'https://lms360.vn/',
			image: '/images/product-list/LMS360 (2).png',
		},
		{
			id: 2,
			title: 'SMS360',
			titleColor: '#0FF',
			description:
				'Giải pháp số hóa toàn diện các nghiệp vụ quản lý nhà trường như hồ sơ học sinh, quản lý giáo viên, thời khóa biểu, điểm danh, sức khỏe, học bạ, khen thưởng, báo cáo thống kê... Tất cả được tích hợp trên một nền tảng duy nhất.',
			buttonText: 'TÌM HIỂU THÊM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/SMS360.png',
		},
		{
			id: 3,
			title: 'SỔ LIÊN LẠC ĐIỆN TỬ',
			titleColor: '#0FF',
			description:
				'Kênh kết nối nhanh chóng, bảo mật giữa nhà trường và phụ huynh. Phụ huynh có thể theo dõi tình hình học tập, rèn luyện, điểm số, lịch học – thi của con em mọi lúc, góp phần nâng cao hiệu quả phối hợp giáo dục.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/SỔ LIÊN LẠC ĐT.png',
		},
		{
			id: 4,
			title: 'THỜI KHÓA BIỂU TỰ ĐỘNG',
			titleColor: '#0FF',
			description:
				'Công cụ hỗ trợ lập thời khóa biểu nhanh chóng, khoa học, tối ưu hóa nguồn lực giảng dạy và cơ sở vật chất. Hệ thống có khả năng xử lý ràng buộc phức tạp và dễ dàng điều chỉnh khi có biến động.',
			buttonText: 'XEM SẢN PHẨM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/51.png',
		},
		{
			id: 5,
			title: 'Y TẾ HỌC ĐƯỜNG',
			titleColor: '#0FF',
			description:
				'Phần mềm quản lý sức khỏe học sinh – sinh viên theo hồ sơ điện tử. Theo dõi tiêm chủng, bệnh nền, tình trạng sức khỏe định kỳ và cảnh báo kịp thời cho phụ huynh, giáo viên và nhân viên y tế trường học.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/Y TẾ HỌC ĐƯỜNG.png',
		},
		{
			id: 6,
			title: 'TEST360',
			titleColor: '#0FF',
			description:
				'Giải pháp tổ chức thi cử hiện đại, bảo mật cao, hỗ trợ nhiều hình thức đề thi (trắc nghiệm, tự luận, kết hợp), chấm điểm tự động và phân tích kết quả theo kỹ năng – từng cá nhân, lớp học hoặc toàn trường.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://thi.lms360.vn/',
			image: '/images/product-list/TEST360 (2).png',
		},
		{
			id: 7,
			title: 'THI THỬ IELTS',
			titleColor: '#0FF',
			description:
				'Công cụ luyện thi IELTS trực tuyến mô phỏng theo định dạng thi thật, với các kỹ năng nghe – nói – đọc – viết. Hệ thống chấm điểm tự động (AI + chuyên gia), gợi ý cải thiện, theo dõi tiến độ luyện thi.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://spartaedu.com/register?a=Bachkhoatechnology',
			image: '/images/product-list/THI  THỬ IELTS.png',
		},
		{
			id: 8,
			title: 'QAE360',
			titleColor: '#0FF',
			description:
				'Nền tảng hỗ trợ tự đánh giá, đánh giá ngoài, lưu trữ minh chứng và theo dõi lộ trình cải tiến chất lượng. QAE360 chuẩn hóa theo Bộ tiêu chuẩn của Bộ Giáo dục và phù hợp với các cấp học.',
			buttonText: 'TÌM HIỂU THÊM',
			buttonLink: 'https://kiemdinh.lms360.vn/',
			image: '/images/product-list/QAE360 (2).png',
		},
		{
			id: 9,
			title: 'THI ĐUA KHEN THƯỞNG',
			titleColor: '#0FF',
			description:
				'Công cụ theo dõi – ghi nhận thành tích học sinh, giáo viên và đơn vị trong suốt năm học. Hỗ trợ đánh giá theo tiêu chí định lượng, minh bạch, tự động tổng hợp kết quả thi đua và tạo động lực phát triển.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://thiduakhenthuong.hcm.edu.vn/',
			image: '/images/product-list/THI ĐUA KHEN THƯỞNG.png',
		},
		{
			id: 10,
			title: 'CHAT360 AI',
			titleColor: '#0FF',
			description:
				'Trợ lý thông minh tích hợp công nghệ AI, có khả năng trả lời câu hỏi, tư vấn học tập, giải thích nội dung bài học và hỗ trợ cán bộ – giáo viên trong tra cứu, soạn thảo văn bản nhanh chóng.',
			buttonText: 'XEM SẢN PHẨM',
			buttonLink: 'https://lms360.vn/',
			image: '/images/robot.png',
		},
		{
			id: 11,
			title: 'ĐIỂM DANH AI',
			titleColor: '#0FF',
			description:
				'Hệ thống sử dụng nhận diện khuôn mặt qua camera AI để điểm danh tự động học sinh – giáo viên. Giảm tải công việc hành chính, đảm bảo chính xác và cung cấp dữ liệu thời gian thực cho nhà trường.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/ĐIỂM DANH AI.png',
		},
		{
			id: 12,
			title: 'BK360 AI',
			titleColor: '#0FF',
			description:
				'Công cụ hỗ trợ giáo viên xây dựng giáo án, thiết kế bài giảng tương tác, tạo ngân hàng câu hỏi – bài tập và đề kiểm tra theo chương trình GDPT 2018, sử dụng trí tuệ nhân tạo để cá nhân hóa nội dung giảng dạy.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://lms360.vn/',
			image: '/images/product-list/BK360 AI.png',
		},
		{
			id: 13,
			title: 'PHÒNG THÍ NGHIỆM MÔ PHỎNG',
			titleColor: '#0FF',
			description:
				'Phòng học ảo tương tác cho các môn KHTN, CNTT, Kỹ thuật – Công nghệ, hỗ trợ học sinh thực hành, quan sát mô phỏng thí nghiệm, tăng cường trải nghiệm học tập mà không phụ thuộc vào điều kiện vật lý.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://lms360.vn/phong-thi-nghiem-ao',
			image: '/images/product-list/THÍ NGHIỆM.png',
		},
		{
			id: 14,
			title: 'HỌC BẠ SỐ',
			titleColor: '#0FF',
			description:
				'Giải pháp lưu trữ học bạ điện tử không thể chỉnh sửa, bảo đảm minh bạch, dễ dàng chia sẻ, tra cứu và công nhận lẫn nhau giữa các cơ sở giáo dục, ứng dụng công nghệ Blockchain tiên tiến.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/HỌC BẠ SỐ.png',
		},
		{
			id: 15,
			title: 'CHỮ KÝ SỐ',
			titleColor: '#0FF',
			description:
				'Giải pháp xác thực và bảo mật văn bản, cho phép ký các loại hồ sơ học vụ, thông báo, quyết định, chứng chỉ… trên môi trường số mà vẫn đảm bảo tính pháp lý, chống giả mạo.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/CHỮ KÝ SỐ.png',
		},
		{
			id: 16,
			title: 'THU PHÍ',
			titleColor: '#0FF',
			description:
				'Tích hợp cổng thanh toán số vào hệ thống nhà trường, giúp phụ huynh đóng học phí, phí dịch vụ… một cách nhanh chóng qua ví điện tử, ngân hàng, đảm bảo minh bạch và giảm tải thủ tục hành chính.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://qlth.lms360.vn/',
			image: '/images/product-list/THU PHÍ.png',
		},
		{
			id: 17,
			title: 'ĐÀO TẠO',
			titleColor: '#0FF',
			description:
				'Chương trình bồi dưỡng kỹ năng số, chuyển đổi số và công nghệ AI dành cho cán bộ quản lý, giáo viên và học sinh – sinh viên, hướng tới xây dựng lực lượng lao động số chất lượng cao trong giáo dục.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: '/training',
			image: '/images/product-list/ĐÀO TẠO.png',
		},
		{
			id: 18,
			title: 'THIẾT BỊ SỐ',
			titleColor: '#0FF',
			description:
				'Hệ sinh thái thiết bị hỗ trợ chuyển đổi số trong giáo dục: bảng tương tác, máy chiếu, camera AI, máy tính bảng, máy chủ… được thiết kế phù hợp với lớp học thông minh và nhu cầu giảng dạy số hiện đại.',
			buttonText: 'TRẢI NGHIỆM',
			buttonLink: 'https://lms360.vn/',
			image: '/images/product-list/THIẾT BỊ SỐ.png',
		},
	];

	useEffect(() => {
		const container: any = containerRef.current;
		const title: any = titleRef.current;
		const desc: any = descRef.current;
		const button: any = buttonRef.current;
		const robot: any = robotRef.current;

		// Hàm cập nhật nội dung
		const updateContent = (product: any, index: any) => {
			if (currentProductIndex === index) return;

			setCurrentProductIndex(index);
			const tl = gsap.timeline();

			// Fade out current content
			tl.to([title, desc, button, robot], {
				opacity: 0,
				y: 20,
				duration: 0.3,
				stagger: 0.05,
			})
				// Update content và fade in
				.call(() => {
					// Cập nhật title
					title.textContent = product.title;
					title.style.color = product.titleColor;

					// Cập nhật description
					desc.textContent = product.description;

					// Cập nhật button
					const buttonSpan = button.querySelector('span');
					if (buttonSpan) buttonSpan.textContent = product.buttonText;
					button.href = product.buttonLink;

					// Cập nhật image
					const img = robot.querySelector('img');
					if (img) {
						img.src = product.image;
						img.alt = product.title;
					}

					// Cập nhật progress indicator
					updateProgressIndicator(index);
				})
				.to([title, desc, button, robot], {
					opacity: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.05,
					ease: 'back.out(1.7)',
				});
		};

		// Hàm cập nhật progress indicator
		const updateProgressIndicator = (activeIndex: any) => {
			const dots = progressRef.current?.querySelectorAll('.progress-dot');
			dots?.forEach((dot: any, index: any) => {
				if (index === activeIndex) {
					dot.style.backgroundColor = products[activeIndex].titleColor;
					dot.style.transform = 'scale(1.2)';
					dot.style.borderColor = products[activeIndex].titleColor;
				} else {
					dot.style.backgroundColor = 'transparent';
					dot.style.transform = 'scale(1)';
					dot.style.borderColor = 'white';
				}
			});
		};

		// Event handler cho wheel event trong container
		const handleWheel: any = (e: any) => {
			const direction = e.deltaY > 0 ? 1 : -1;
			const newIndex = currentProductIndex + direction;

			// Kiểm tra xem có thể chuyển đổi product không
			const canChangeProduct = newIndex >= 0 && newIndex < products.length;

			if (canChangeProduct) {
				// Có thể thay đổi product -> ngăn scroll page và thay đổi content
				e.preventDefault();

				// Throttle để tránh scroll quá nhanh
				if (handleWheel.timeout) return;
				handleWheel.timeout = setTimeout(() => {
					handleWheel.timeout = null;
				}, 300);

				updateContent(products[newIndex], newIndex);
			}
			// Nếu không thể thay đổi product (đã ở đầu/cuối) -> cho phép scroll page bình thường
			// Không gọi e.preventDefault() -> page sẽ scroll
		};

		// Thêm event listener cho container
		if (container) {
			container.addEventListener('wheel', handleWheel, { passive: false });
		}

		// Animation ban đầu
		gsap.fromTo(
			[title, desc, button],
			{
				opacity: 0,
				y: 50,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				stagger: 0.2,
				ease: 'power2.out',
			}
		);

		gsap.fromTo(
			robot,
			{
				opacity: 0,
				x: 100,
				rotation: 10,
			},
			{
				opacity: 1,
				x: 0,
				rotation: 0,
				duration: 1.2,
				delay: 0.5,
				ease: 'elastic.out(1, 0.5)',
			}
		);

		// Khởi tạo progress indicator
		updateProgressIndicator(0);

		// Cleanup
		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel);
			}
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, [currentProductIndex]);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: any) => {
			if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
				const newIndex = Math.min(products.length - 1, currentProductIndex + 1);
				if (newIndex !== currentProductIndex) {
					setCurrentProductIndex(newIndex);
				}
			} else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
				const newIndex = Math.max(0, currentProductIndex - 1);
				if (newIndex !== currentProductIndex) {
					setCurrentProductIndex(newIndex);
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [currentProductIndex]);

	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='relative flex items-center justify-center flex-col gap-4 pt-8 w-full'>
				<div className='relative w-full flex justify-center px-4'>
					{/* Map Container */}
					<div className='relative'>
						<Image
							src='/images/map.png'
							width={1200}
							height={1000}
							alt='map'
							className='w-40 h-72 sm:w-44 sm:h-80 md:w-48 md:h-88 lg:w-52 lg:h-96 mx-auto'
						/>

						{/* Left Side Stats - Stacked on mobile */}
						<div className='absolute hidden top-1/4 left-0 lg:-left-40 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base'>
								<CountUp
									from={0}
									to={1700}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>TRƯỜNG HỌC</span>
							</div>
						</div>

						<div className='absolute hidden top-[38%] left-0 lg:-left-32 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base'>
								<CountUp
									from={0}
									to={120000}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>GIÁO VIÊN</span>
							</div>
						</div>

						<div className='absolute hidden top-1/2 left-0 lg:-left-20 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base'>
								<CountUp
									from={0}
									to={100000}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>GB LƯU TRỮ</span>
							</div>
						</div>

						<div className='absolute hidden top-[62%] left-0 lg:-left-36 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base'>
								<CountUp
									from={0}
									to={1000000}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>HỌC SINH</span>
							</div>
						</div>

						{/* Right Side Stats - Stacked on mobile */}
						<div className='absolute hidden top-[15%] right-0 lg:-right-20 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base justify-end lg:justify-start'>
								<CountUp
									from={0}
									to={25}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>SỞ GD&ĐT</span>
							</div>
						</div>

						<div className='absolute hidden top-[28%] right-0 lg:-right-32 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base justify-end lg:justify-start'>
								<CountUp
									from={0}
									to={546}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>TRƯỜNG TIỂU HỌC</span>
							</div>
						</div>

						<div className='absolute hidden top-[40%] right-0 lg:-right-40 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base justify-end lg:justify-start'>
								<CountUp
									from={0}
									to={519}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>TRƯỜNG THCS</span>
							</div>
						</div>

						<div className='absolute hidden top-[52%] right-0 lg:-right-36 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base justify-end lg:justify-start'>
								<CountUp
									from={0}
									to={395}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>TRƯỜNG THPT</span>
							</div>
						</div>

						<div className='absolute hidden top-[66%] right-0 lg:-right-48 flex-col lg:block space-y-2 lg:space-y-0'>
							<div className='flex items-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base justify-end lg:justify-start'>
								<CountUp
									from={0}
									to={256}
									separator=','
									direction='up'
									duration={1}
									className='count-up-text text-[#19376B] font-bold'
								/>
								<span className='text-[#386DC8] font-bold whitespace-nowrap'>ĐƠN VỊ GD KHÁC</span>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile Alternative Layout - Grid below map */}
				<div className='block lg:hidden w-full px-4 mt-6'>
					<div className='grid grid-cols-2 gap-3 max-w-md mx-auto'>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={1700}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>TRƯỜNG HỌC</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={120000}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>GIÁO VIÊN</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={100000}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>GB LƯU TRỮ</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={1000000}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>HỌC SINH</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={25}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>SỞ GD&ĐT</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={546}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>TRƯỜNG TIỂU HỌC</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={519}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>TRƯỜNG THCS</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg'>
							<CountUp
								from={0}
								to={395}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>TRƯỜNG THPT</span>
						</div>
						<div className='text-center p-3 bg-blue-50 rounded-lg col-span-2'>
							<CountUp
								from={0}
								to={256}
								separator=','
								direction='up'
								duration={1}
								className='count-up-text text-[#19376B] text-lg font-bold block'
							/>
							<span className='text-[#386DC8] font-bold text-xs'>ĐƠN VỊ GD KHÁC</span>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products Section */}
			<div className={`text-center transform transition-all py-8 lg:py-16 duration-1000`}>
				<div className='relative inline-block'>
					<div className='flex flex-col items-center justify-center'>
						<h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-[#666] leading-tight'>
							Khi <span className='text-blue-600'>công nghệ</span> trở thành{' '}
							<span className='text-blue-600'>người bạn đồng hành</span> của giáo dục
						</h2>
					</div>

					<div className='mt-6 px-4'>
						<p className='text-lg lg:text-xl text-[#666] leading-relaxed max-w-3xl mx-auto'>
							Chúng tôi phát triển hệ sinh thái các giải pháp công nghệ giáo dục toàn diện,
							<br className='hidden lg:block' />
							đáp ứng mọi nhu cầu của nhà trường
						</p>
					</div>
				</div>
			</div>

			<div ref={containerRef}>
				<div className='container-lg'>
					<div className='relative h-full lg:h-[546px] overflow-hidden mx-auto cursor-pointer group rounded-2xl p-4'>
						{/* Background Image */}
						<Image
							src='/images/bg-product.png'
							width={1200}
							height={1000}
							alt='bg-product'
							className='absolute inset-0 w-full h-full z-0 object-cover'
						/>

						{/* Content Container */}
						<div className='flex flex-col lg:flex-row items-center z-10 relative justify-between h-full p-4 md:p-8'>
							<div className='flex flex-col gap-3 sm:gap-4 lg:gap-6 max-w-2xl text-center lg:text-center items-center lg:items-center px-4 sm:px-8 lg:px-16 order-2 lg:order-1'>
								<h3
									ref={titleRef}
									className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-500 leading-tight'
									style={{ color: products[currentProductIndex].titleColor }}
								>
									{products[currentProductIndex].title}
								</h3>
								<p
									ref={descRef}
									className='text-white transition-all duration-500 text-sm sm:text-base lg:text-base leading-relaxed'
								>
									{products[currentProductIndex].description}
								</p>
								<Link
									ref={buttonRef}
									href={products[currentProductIndex].buttonLink}
									className='group w-fit flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#DDEFFB] text-[#19376B] font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm md:text-base'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width={20}
										height={20}
										viewBox='0 0 20 20'
										fill='none'
										className='transition-all duration-300 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5'
									>
										<path
											d='M16.666 6.66663H3.33268V4.99996H16.666V6.66663ZM14.9993 1.66663H4.99935V3.33329H14.9993V1.66663ZM18.3327 9.99996V16.6666C18.3327 17.1087 18.1571 17.5326 17.8445 17.8451C17.532 18.1577 17.108 18.3333 16.666 18.3333H3.33268C2.89106 18.332 2.4679 18.156 2.15563 17.8437C1.84335 17.5314 1.66733 17.1082 1.66602 16.6666V9.99996C1.66733 9.55834 1.84335 9.13518 2.15563 8.82291C2.4679 8.51063 2.89106 8.33461 3.33268 8.33329H16.666C17.1076 8.33461 17.5308 8.51063 17.8431 8.82291C18.1553 9.13518 18.3314 9.55834 18.3327 9.99996ZM11.6052 14.2016L13.541 12.5466L10.9918 12.3333L9.99935 9.99996L9.00685 12.3333L6.45768 12.5466L8.39352 14.2016L7.81018 16.6666L9.99935 15.3566L12.1885 16.6666L11.6052 14.2016Z'
											fill='#19376B'
											className='group-hover:fill-white transition-all duration-300'
										/>
									</svg>
									<span>{products[currentProductIndex].buttonText}</span>
								</Link>
							</div>
							<div ref={robotRef} className='flex-shrink-0 order-1 lg:order-2 mb-3 sm:mb-4 lg:mb-0'>
								<Image
									src={products[currentProductIndex].image}
									width={478}
									height={478}
									alt={products[currentProductIndex].title}
									className='drop-shadow-2xl transition-all duration-500 w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 lg:w-[478px] lg:h-[478px] object-contain'
								/>
							</div>
						</div>

						{/* Scroll Hint */}
						<div className='hidden lg:flex absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'>
								<div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce'></div>
							</div>
							<span>Cuộn chuột để xem sản phẩm khác</span>
						</div>

						{/* Frame Border Effect */}
						<div className='absolute inset-0 pointer-events-none z-20 rounded-2xl border-2 border-white/10'></div>
					</div>
				</div>
			</div>

			{/* Customers Section - Scroll bình thường */}
			<div className='relative py-8 lg:py-16 overflow-hidden bg-white'>
				<div className='relative z-10 container-lg mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='absolute inset-0'>
						<Image
							src='/images/backgrounds/khach-hang-tieu-bieu-background.png'
							alt='background'
							fill
							className='object-cover rounded-xl'
						/>
					</div>
					<div className='py-6'>
						{/* Header */}
						<div className='text-center mb-8'>
							<div className='transform relative w-fit mx-auto'>
								<h2 className='text-2xl lg:text-3xl font-bold mb-1 uppercase text-[#19376B]'>
									KHÁCH HÀNG TIÊU BIỂU
								</h2>
								<div className='w-full h-1 bg-[#19376B] rounded-full mx-auto mb-6' />
							</div>
						</div>

						{/* Logo Grid */}
						<div className='grid grid-cols-6 gap-1 sm:gap-2 md:gap-4 lg:gap-6'>
							{data.map((school: any) => (
								<div
									key={school.id}
									className='flex items-center justify-center h-24 z-10 relative group'
								>
									<div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center overflow-hidden hover:shadow-lg transition-all duration-300'>
										<Image
											src={school.image}
											alt={`Logo school ${school.id}`}
											width={120}
											height={120}
											className='w-auto h-auto object-contain opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-[1.07] transform'
											title={school.name}
										/>
									</div>
									{/* Tooltip */}
									<div className='absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
										{school.name}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<CarouselCards />
		</div>
	);
};

export default ProductPage;
