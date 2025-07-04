'use client';

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MissionAccordion = () => {
	const missionItems = [
		{
			id: 'smart-education',
			title: 'Phát Triển Nền Tảng Giáo Dục Thông Minh',
			content:
				'Chúng tôi cam kết xây dựng các nền tảng giáo dục thông minh, giúp giáo viên dễ dàng quản lý và tùy chỉnh nội dung học tập, cũng như giúp học sinh tận dụng tối đa kiến thức và kỹ năng của họ.',
		},
		{
			id: 'teacher-training',
			title: 'Đào Tạo và Hỗ Trợ Giáo Viên',
			content:
				'Chúng tôi cung cấp các chương trình đào tạo chuyên sâu và hỗ trợ liên tục cho giáo viên, giúp họ nắm bắt được những xu hướng mới nhất trong giáo dục và áp dụng chúng một cách linh hoạt và hiệu quả.',
		},
		{
			id: 'student-tech-skills',
			title: 'Nâng Cao Kỹ Năng Ứng Dụng Công Nghệ cho Học Sinh',
			content:
				'Chúng tôi hướng đến việc phát triển các giải pháp giáo dục cá nhân hóa, kích thích sự sáng tạo và phát triển kỹ năng mềm cần thiết cho thế kỷ 21.',
		},
		{
			id: 'diverse-learning',
			title: 'Tạo Ra Nền Tảng Học Tập Đa Dạng',
			content:
				'Sứ mệnh của chúng tôi là phát triển nền tảng giáo dục đa dạng, nơi mà học sinh có thể trải nghiệm nhiều phương pháp học khác nhau, từ học trực tuyến đến học tại lớp, để phát triển mọi khía cạnh của bản thân họ.',
		},
		{
			id: 'assessment-innovation',
			title: 'Đổi Mới trong Đánh Giá và Đo Lường',
			content:
				'Chúng tôi đặt ra mục tiêu thay đổi cách đánh giá và đo lường thành tích học tập. Sứ mệnh của chúng tôi là xây dựng các phương pháp đánh giá đa chiều, tập trung vào việc đo lường khả năng sáng tạo, tư duy phản biện, và kỹ năng giải quyết vấn đề.',
		},
		{
			id: 'interactive-teaching',
			title: 'Hỗ Trợ Giao Việc Giảng Dạy Giữa Người Học và Người Dạy',
			content:
				'Chúng tôi hướng đến việc phát triển giải pháp công nghệ giúp hỗ trợ mối quan hệ giữa giáo viên và học sinh. Sứ mệnh của chúng tôi là tạo ra các công cụ tương tác để tăng cường giao tiếp, tạo cầu nối giữa người học và người dạy, tạo nên môi trường học tập năng động và thân thiện.',
		},
		{
			id: 'mental-wellness',
			title: 'Chú Trọng Đến An Sinh Tinh Thần',
			content:
				'Chúng tôi không chỉ tập trung vào khía cạnh học thuật mà còn coi trọng đến phát triển toàn diện của học sinh. Sứ mệnh của chúng tôi là đảm bảo rằng giáo dục không chỉ giúp học sinh thành công trong công việc mà còn xây dựng nền tảng cho sự phát triển tinh thần và tâm hồn của họ.',
		},
	];

	return (
		<div className='py-8'>
			<div className='container-lg'>
				<div className='w-full'>
					{/* Section Header */}
					<div className='text-center mb-12'>
						<h2 className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'>Sứ Mệnh</h2>
						<p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
							Sứ mệnh của chúng tôi là đóng góp vào sự phát triển toàn diện của cộng đồng giáo dục Việt
							Nam thông qua việc cung cấp các giải pháp công nghệ chuyển đổi số tiên tiến, linh hoạt và
							tích hợp để nâng cao chất lượng giáo dục.
						</p>
					</div>

					{/* Mission Accordion */}
					<Accordion type='multiple' defaultValue={['smart-education']} className='space-y-3'>
						{missionItems.map((item, index) => (
							<AccordionItem
								key={item.id}
								value={item.id}
								className='bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200'
							>
								<AccordionTrigger className='px-6 py-4 text-left hover:bg-gray-50'>
									<div className='flex items-center space-x-3'>
										<span className='text-sm text-gray-500 font-medium'>
											{String(index + 1).padStart(2, '0')}
										</span>
										<h3 className='text-base lg:text-lg font-medium text-gray-900'>{item.title}</h3>
									</div>
								</AccordionTrigger>

								<AccordionContent className='px-6 pb-4'>
									<div className='pl-8'>
										<p className='text-gray-700 leading-relaxed'>{item.content}</p>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
};

export default MissionAccordion;
