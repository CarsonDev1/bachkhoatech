import React from 'react';
import QRComponent from './components/QRComponent';
export type FooterItemType = 'link' | 'action' | 'component';

export interface BaseFooterItem {
	title?: string;
	titleComponent?: () => React.ReactNode;
	type: FooterItemType;
	icon?: string;
}

export interface LinkFooterItem extends BaseFooterItem {
	type: 'link';
	link: string;
}

export interface ActionFooterItem extends BaseFooterItem {
	type: 'action';
	onClick: () => void;
}

export interface ComponentFooterItem extends BaseFooterItem {
	type: 'component';
	component: () => React.ReactNode;
}

export type FooterItem = LinkFooterItem | ActionFooterItem | ComponentFooterItem;

export interface FooterSection {
	title: string;
	titleComponent?: () => React.ReactNode;
	items?: FooterItem[];
	icon?: string;
}

export const featureDataFooter: FooterSection[] = [
	{
		title: 'ỨNG DỤNG TRÍ TUỆ NHÂN TẠO (AI)',
		items: [
			{
				title: 'Điểm danh thông minh, nhận diện gương mặt bằng AI',
				titleComponent: () => {
					return (
						<div>
							{`Điểm danh thông minh, `}
							<br className='block sm:hidden md:block' />
							{`nhận diện gương mặt bằng AI`}
						</div>
					);
				},
				type: 'action',
				onClick: () => {
					if (typeof window !== 'undefined') {
						const event = new CustomEvent('openAttendanceVideoModal');
						window.dispatchEvent(event);
					}
				},
				icon: '/icons/AI.svg',
			},
			{
				title: 'Xây dựng học liệu số bằng AI (BK360 AI)',
				type: 'link',
				link: 'https://lms360.vn/danh-sach-khoa-hoc',
				icon: '/icons/doc-AI.svg',
			},
			{
				title: 'Trợ lý ảo Chat360 AI',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/message-bot.svg',
			},
		],
	},
	{
		title: 'CHUYỂN ĐỔI SỐ TRONG DẠY, HỌC VÀ KIỂM TRA ĐÁNH GIÁ',
		titleComponent: () => {
			return (
				<div className='text-left text-sm text-brandBlue font-bold mb-4'>
					{`CHUYỂN ĐỔI SỐ TRONG DẠY, HỌC `}
					<br className='block sm:hidden md:block' />
					{`VÀ KIỂM TRA ĐÁNH GIÁ`}
				</div>
			);
		},
		items: [
			{
				title: 'Hệ thống Quản lý học tập trực tuyến LMS360 e-Learning',
				titleComponent: () => {
					return (
						<div>
							{`Hệ thống Quản lý học tập trực tuyến `}
							<br className='hidden md:block' />
							{`LMS360 e-Learning`}
						</div>
					);
				},
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Online Payment with a Credit Card.svg',
			},
			{
				title: 'Hệ thống quản lý và soạn giảng nội dung tương tác (LCMS)',
				titleComponent: () => {
					return (
						<div>
							{`Hệ thống quản lý và soạn giảng `}
							<br className='hidden md:block' />
							{`nội dung tương tác (LCMS)`}
						</div>
					);
				},
				type: 'link',
				link: 'https://lms360.vn/tao-noi-dung-h5p',
				icon: '/icons/lcms.svg',
			},
			{
				title: 'Hệ thống kiểm tra đánh giá trực tuyến TEST360',
				type: 'link',
				link: 'https://thi.lms360.edu.vn/',
				icon: '/icons/Video Conference.svg',
			},
			{
				title: 'Quản lý ngân hàng đề thi',
				type: 'link',
				link: 'https://lms360.vn/danh-sach-khoa-hoc-bkt',
				icon: '/icons/Teaching.svg',
			},
			{
				title: 'Hệ thống khảo sát năng lực ngoại ngữ (nghe-nói-đọc-viết)',
				titleComponent: () => {
					return (
						<div>
							{`Hệ thống khảo sát năng lực ngoại ngữ `}
							<br className='hidden md:block' />
							{`(nghe-nói-đọc-viết)`}
						</div>
					);
				},
				type: 'link',
				link: 'https://spartaedu.com/register?a=Bachkhoatechnology',
				icon: '/icons/Online Support.svg',
			},
			{
				title: 'Thi thử IELTS',
				type: 'link',
				link: 'https://ielts.lms360.edu.vn/',
				icon: '/icons/ielts.svg',
			},
		],
	},
	{
		title: 'TÀI NGUYÊN SỐ',
		items: [
			{
				title: 'Ngân hàng học liệu số chia sẻ dùng chung',
				type: 'link',
				link: 'https://lms360.vn/danh-sach-khoa-hoc-bkt',
				icon: '/icons/Machine Learning.svg',
			},
			{
				title: 'Học liệu số bản quyền theo CT GDPT 2018',
				type: 'link',
				link: 'https://lms360.vn/danh-sach-khoa-hoc-nxb',
				icon: '/icons/Course Assign.svg',
			},
			{
				title: 'Học liệu số tập huấn chuyên môn hè',
				type: 'link',
				link: 'https://lms360.vn/summer-training',
				icon: '/icons/Tuition.svg',
			},
			{
				title: 'Ngân hàng học liệu số cấp trường',
				type: 'link',
				link: 'https://lms360.vn/kho-hoc-lieu-cua-truong',
				icon: '/icons/Online Group Studying.svg',
			},
			{
				title: 'Ngân hàng học liệu số xây dựng bằng AI ',
				type: 'link',
				link: 'https://lms360.vn/hoc-lieu-so-ai-mau',
				icon: '/icons/Learning.svg',
			},
			{
				title: 'Phòng thí nghiệm mô phỏng',
				type: 'link',
				link: 'https://lms360.vn/phong-thi-nghiem-ao',
				icon: '/icons/Experiment.svg',
			},
		],
	},
	{
		title: 'DỊCH VỤ  KHÁC',
		items: [
			{
				title: 'Đào tạo chuyển đổi phương pháp giảng dạy',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo ứng dụng AI trong dạy và học ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo tổ chức kiểm tra đánh giá trực tuyến ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo kỹ năng số, công dân số ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo thiết kế bài giảng e-Learning ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo về tiêu chuẩn, tiêu chí học liệu số e -Learning',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Đào tạo tiêu chuẩn, xây dựng & vận hành trường học số',
				titleComponent: () => {
					return (
						<div>
							{`Đào tạo tiêu chuẩn, xây dựng & vận hành `}
							<br className='hidden md:block' />
							{`trường học số`}
						</div>
					);
				},
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Training.svg',
			},
			{
				title: 'Thiết bị số ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Windows8 Tablet.svg',
			},
			{
				title: 'Trường học thông minh ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Smart Home Connection.svg',
			},
			{
				title: 'Dịch vụ lưu trữ đám mây (Cloud)',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Cloud.svg',
			},
			{
				title: 'STEM, STEAM, ROBOTIC',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/School.svg',
			},
			{
				title: 'Phần mềm diệt virus bản quyền ',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/TotalAV.svg',
			},
			{
				title: 'Dịch vụ bảo dưỡng, bảo trì thiết bị, cơ sở vật chất',
				type: 'link',
				link: 'https://lms360.vn/',
				icon: '/icons/Maintenance.svg',
			},
		],
	},
	{
		title: 'CHUYỂN ĐỔI SỐ TRONG QUẢN LÝ, VẬN HÀNH',
		items: [
			{
				title: 'Hệ thống quản lý trường học SMS360',
				type: 'link',
				link: 'https://qlth.lms360.vn/',
				icon: '/icons/Graduation Cap.svg',
			},
			{
				title: 'Phần mềm sắp xếp thời khóa biểu ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/lich-giang-day/thoi-khoa-bieu?',
				icon: '/icons/Timetable.svg',
			},
			{
				title: 'Sổ liên lạc điện tử',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/slldt/',
				icon: '/icons/Switch Users.svg',
			},
			{
				title: 'Báo cáo chuyên cần, xin phép, duyệt phép trực tuyến ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/thong-ke/chuyen-can-hoc-sinh?',
				icon: '/icons/Edit Pie Chart Report.svg',
			},
			{
				title: 'Điểm danh thông minh trên ứng dụng di động ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/diem-danh-thong-minh/',
				icon: '/icons/Contact.svg',
			},
			{
				title: 'Phần mềm điểm danh giáo viên ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/lich-giang-day/lich-danh-diem-danh/',
				icon: '/icons/Admin Settings Male.svg',
			},
			{
				title: 'Học bạ số với công nghệ Blockchain ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/ho-so-luu-tru/hoc-ba-so?',
				icon: '/icons/Blockchain New Logo.svg',
			},
			{
				title: 'Ứng dụng truyền thông nội bộ ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/announcement?',
				icon: '/icons/Request Service.svg',
			},
			{
				title: 'Chữ ký số ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/management/ky-dien-tu/',
				icon: '/icons/Digital Signature.svg',
			},
			{
				title: 'Y tế học đường ',
				type: 'link',
				link: 'https://qlth.lms360.vn/school-admin/y-te-hoc-duong/',
				icon: '/icons/Apple Health.svg',
			},
			{
				title: 'Thi đua khen thưởng ',
				type: 'link',
				link: 'https://thiduakhenthuong.hcm.edu.vn/',
				icon: '/icons/Simulation.svg',
			},
			{
				title: 'Hệ thống đánh giá và tự đánh giá',
				type: 'link',
				link: 'https://thiduakhenthuong.hcm.edu.vn/',
				icon: '/icons/SEO Inspection.svg',
			},
			{
				title: 'Phần mềm kiểm định chất lượng giáo dục',
				type: 'link',
				link: 'https://kiemdinh.lms360.edu.vn/',
				icon: '/icons/Security Inspection.svg',
			},
		],
	},
	{
		title: 'BACH KHOA TECH GROUP',
		items: [
			{
				title: 'Giới thiệu',
				type: 'link',
				link: 'https://bachkhoa.tech/about',
			},
			{
				title: 'Tầm nhìn - Sứ mệnh',
				type: 'link',
				link: 'https://bachkhoa.tech/about',
			},
			{
				title: 'Khách hàng tiêu biểu',
				type: 'link',
				link: 'https://bachkhoa.tech/products',
			},
			{
				title: 'Tin tức',
				type: 'link',
				link: 'https://bachkhoa.tech/news',
			},
			{
				title: 'Tuyển dụng',
				type: 'link',
				link: '/tuyen-dung',
			},
			{
				title: 'Phân phối sản phẩm',
				type: 'link',
				link: '#',
			},
			{
				title: 'Liên hệ hỗ trợ',
				type: 'link',
				link: '#',
			},
			{
				title: 'Chính sách bảo mật',
				type: 'link',
				link: 'https://lms360.vn/chinh-sach-bao-mat',
			},
			{
				title: 'Điều khoản sử dụng',
				type: 'link',
				link: 'https://lms360.vn/dieu-khoan-su-dung',
			},
			{
				type: 'component',
				component: QRComponent,
			},
		],
	},
];
