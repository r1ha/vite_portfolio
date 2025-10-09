(function(){})();
import React, { useState } from 'react'
import SkillIcon from './SkillIcon'
import Timeline from './Timeline'
import ProjectGallery from './ProjectGallery'

// Minimal i18n dictionary
const DICT = {
	en: {
		title: 'Curriculum Vitae',
			bioTitle: 'About me',
			bio: 'I am a developer interested in building interactive web experiences. I like 3D, data and embedded systems. Replace this paragraph with your own short bio and interests.',
		skillsTitle: 'Skills',
		timelineTitle: 'Experience & Education',
			// localized timeline items
			timelineItems: [
				{ id: 1, year: '2024', title: 'Frontend Developer - Acme Corp', subtitle: 'Worked on UI & 3D integrations' },
				{ id: 2, year: '2022', title: 'MSc Data Science', subtitle: 'University Name' },
				{ id: 3, year: '2020', title: 'Intern - Embedded Systems', subtitle: 'Microcontroller projects' }
			],
		languageLabel: 'Language'
	},
	fr: {
		title: 'CV',
			bioTitle: 'À propos de moi',
			bio: 'Je suis développeur intéressé par la création d\'expériences web interactives. J\'aime la 3D, les données et les systèmes embarqués. Remplacez ce paragraphe par votre propre biographie.',
		skillsTitle: 'Compétences',
		timelineTitle: 'Expérience & Formation',
			// éléments de la timeline en français
			timelineItems: [
				{ id: 1, year: '2024', title: 'Développeur Frontend - Acme Corp', subtitle: 'Travail sur UI et intégrations 3D' },
				{ id: 2, year: '2022', title: 'Master en Data Science', subtitle: 'Nom de l\'Université' },
				{ id: 3, year: '2020', title: 'Stagiaire Systèmes Embarqués', subtitle: 'Projets microcontrôleurs' }
			],
		languageLabel: 'Langue'
	},
	it: {
		title: 'Curriculum',
			bioTitle: 'Chi sono',
			bio: 'Sono uno sviluppatore interessato a creare esperienze web interattive. Mi piacciono la 3D, i dati e i sistemi embedded. Sostituisci questo paragrafo con la tua breve biografia.',
		skillsTitle: 'Competenze',
		timelineTitle: 'Esperienza & Formazione',
			// timeline in italiano
			timelineItems: [
				{ id: 1, year: '2024', title: 'Frontend Developer - Acme Corp', subtitle: 'Lavorato su UI e integrazioni 3D' },
				{ id: 2, year: '2022', title: 'MSc Data Science', subtitle: 'Nome Università' },
				{ id: 3, year: '2020', title: 'Tirocinante Sistemi Embedded', subtitle: 'Progetti microcontrollore' }
			],
		languageLabel: 'Lingua'
	},
	zh: {
		title: '简历',
			bioTitle: '关于我',
			bio: '我是一名开发者，热衷于构建互动式网页体验。我喜欢3D、数据和嵌入式系统。请将此段替换为您的简短介绍。',
		skillsTitle: '技能',
		timelineTitle: '经历与教育',
			// timeline in Chinese
			timelineItems: [
				{ id: 1, year: '2024', title: '前端开发 - Acme 公司', subtitle: '参与 UI 与 3D 集成' },
				{ id: 2, year: '2022', title: '数据科学硕士', subtitle: '大学名称' },
				{ id: 3, year: '2020', title: '嵌入式系统实习生', subtitle: '微控制器项目' }
			],
		languageLabel: '语言'
	}
}

export default function CurriculumVitae({ initialLang = 'en' }){
	const [lang, setLang] = useState(initialLang)
	const t = DICT[lang] || DICT.en

	// localized timeline items
	const timelineItems = t.timelineItems || []

	// sample projects (edit/extend as needed)
	const projects = [
		{ id: 'p1', title: 'Interactive 3D Portfolio', subtitle: 'WebGL + React', tags: ['three.js','react'], image: './pictures/project1.jpg' },
		{ id: 'p2', title: 'Data Analysis Tool', subtitle: 'Python & dashboards', tags: ['python','sql'], image: './pictures/project2.jpg' },
		{ id: 'p3', title: 'Embedded Sensor Node', subtitle: 'Arduino firmware', tags: ['arduino','c++'], image: './pictures/project3.jpg' }
	]

	// sample skills using icons from public/icons (ensure these files exist or edit paths)
	const skills = [
		{ id: 'js', src: './icons/javascript.svg', label: 'JavaScript' },
		{ id: 'cpp', src: './icons/cpp.svg', label: 'C++' },
		{ id: 'arduino', src: './icons/arduino.svg', label: 'Arduino' },
		{ id: 'git', src: './icons/git.svg', label: 'Git' },
		{ id: 'sql', src: './icons/sql.svg', label: 'SQL' },
		{ id: 'python', src: './icons/python.svg', label: 'Python' }
	]

	return (
		<div className="min-h-screen p-6 text-neutral-900">
		<div className="max-w-4xl mx-auto space-y-12">
				<header className="flex items-center justify-between mb-6">
					<h1 className="text-3xl" style={{ fontFamily: '"Cormorant Garamond", serif, Georgia', fontWeight: 300 }}>{t.title}</h1>
								<div className="flex items-center gap-2">
									{/* modern segmented language pills */}
									<div className="inline-flex bg-gray-100 rounded-full p-1 shadow-sm ring-1 ring-gray-100">
										{['en','fr','it','zh'].map(code => (
											<button
												key={code}
												onClick={() => setLang(code)}
												role="tab"
												aria-selected={lang===code}
												className={`px-3 py-1 rounded-full text-sm transition-colors duration-150 ${lang===code ? 'bg-neutral-900 text-white shadow-sm' : 'text-neutral-700 hover:bg-gray-200'}`}
											>
												{code.toUpperCase()}
											</button>
										))}
									</div>
								</div>
				</header>

                {/* Profile */}
				<section className="grid grid-cols-1 sm:grid-cols-3 gap-12 items-start">
											<div className="col-span-1 flex flex-col items-center space-y-4">
												<img src="./pictures/profile.jpg" alt="profile" className="w-40 h-40 rounded-full object-cover shadow-sm border" />
																		<h2 className="mt-4 text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>Erwan Achat</h2>
																		<div className="mt-2 text-sm text-neutral-600 text-center">Computer Science and Mathematics Engineering Student</div>
					</div>

					<div className="sm:col-span-2">
									<div className="mb-8">
										<h3 className="text-lg font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{t.bioTitle}</h3>
										<p className="mt-2 text-sm text-neutral-700">{t.bio}</p>
									</div>

									{/* Projects gallery */}
									<div className="mb-6">
										<ProjectGallery projects={projects} />
									</div>

						<div className="mb-10">
							<h3 className="text-lg font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{t.timelineTitle}</h3>
							<Timeline items={timelineItems} />
						</div>

						<div>
							<h3 className="text-lg font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{t.skillsTitle}</h3>
							<div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-6">
												{skills.map(s => (
													<div key={s.id} className="flex flex-col items-center text-center">
														<SkillIcon src={s.src} label={s.label} />
													</div>
												))}
							</div>
						</div>

					</div>
				</section>
			</div>
		</div>
	)
}

