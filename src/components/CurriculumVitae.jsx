(function(){})();
import React, { useState } from 'react'
import SkillIcon from './SkillIcon'
import Timeline from './Timeline'
import ProjectGallery from './ProjectGallery'

// Common static data (avoid repeating asset paths across languages)
const COMMON = {
	projects: [
		{ id: 'p1', tags: ['pymupdf', 'ollama', 'openai api'], image: './pictures/pdf_translation.png' },
		{ id: 'p2', tags: ['pandas', 'scikit-learn'], image: './pictures/machine_learning.png' },
		{ id: 'p3', tags: ['js', 'open layers', 'spring boot', 'react', 'sql', 'figma', 'jira'], image: './pictures/pin_it.png' },
		{ id: 'p4', tags: ['arduino', 'c++'], image: './pictures/directional_sound_level_meter.png' }
	],
	skills: [
		{ id: 'js', src: './icons/javascript.svg', defaultLabel: 'JavaScript' },
		{ id: 'cpp', src: './icons/cpp.svg', defaultLabel: 'C++' },
		{ id: 'arduino', src: './icons/arduino.svg', defaultLabel: 'Arduino' },
		{ id: 'git', src: './icons/git.svg', defaultLabel: 'Git' },
		{ id: 'sql', src: './icons/sql.svg', defaultLabel: 'SQL' },
		{ id: 'python', src: './icons/python.svg', defaultLabel: 'Python' }
	]
}

// Minimal i18n dictionary - use `fr` as the source of truth, other languages are
// translations derived from the French model to avoid duplication.
const DICT = {
	fr: {
		title: 'Curriculum Vitae',
		bioTitle: 'À propos de moi',
		bio: "Je suis étudiant en informatique, actuellement à la recherche d'un stage en informatique. Je suis particulièrement intéressé par le développement logiciel, la cybersécurité et les systèmes intelligents et j'ai de l'expérience dans le développement web.",
		profileName: 'Erwan Achat',
		profileSubtitle: 'Etudiant en Ingénierie Informatique',
		projectsTitle: 'Projets',
		projectsNoImage: 'Aucune image',
		scrollLeftLabel: 'Naviguer à gauche',
		scrollRightLabel: 'Naviguer à droite',
		projectsText: {
			p1: {
				title: "Traduction de PDF par IA générative",
				subtitle: "Flexibilité entre SLMs et LLMs, parcours séquentiel du document, traduction par morceau au fur et à mesure et reconstruction du PDF avec préservation des styles et de la mise en page"
			},
			p2: {
				title: "Classification d'images de nourriture",
				subtitle: "Approche de Machine Learning, choix des features et évaluation des performances"
			},
			p3: {
				title: "Développement de l'application PinIt",
				subtitle: "Développement web en équipe d'un mini réseau social de voyage avec ajout de pins (photos & journal), visibilité configurable, recherche text-to-coords, assistant de voyage et gestion sécurisée des accès"
			},
			p4: {
				title: "Conception et prototypage d'un appareil de mesure du niveau sonore directionnel",
				subtitle: "Extraction et analyse des signaux de 3 microphones analogiques avec ESP32, transmission via WebSocket et visualisations temps réel sur écran cylindrique"
			}
		},
		skillsLabels: {
			js: 'JavaScript',
			cpp: 'C++',
			arduino: 'Arduino',
			git: 'Git',
			sql: 'SQL',
			python: 'Python'
		},
		skillsTitle: 'Compétences',
		timelineTitle: 'Expériences Professionnelles & Formation',
		timelineItems: [
			{ id: 1, year: '2026', title: "Diplôme d'Ingénieur en Ingénierie Informatique et Mathématique", subtitle: 'Polytech Paris-Saclay' },
			{ id: 2, year: '2025', title: "Semestre Erasmus : Master en Informatique", subtitle: 'Sapienza Università di Roma' },
			{ id: 3, year: '2025', title: "Obtention de la certification TOEIC en Anglais", subtitle: 'Anglais niveau C1' },
			{ id: 4, year: '2025', title: "Stage de recherche dans la visualisation de données (6 mois)", subtitle: "INRIA : équipe Aviz" }
		]
	},

	// English (translated from fr)
	en: {
		title: 'Curriculum Vitae',
		bioTitle: 'About me',
		bio: "I am a computer science student currently looking for an internship in software engineering. I'm particularly interested in software development, cybersecurity and intelligent systems, and I have experience in web development.",
		profileName: 'Erwan Achat',
		profileSubtitle: 'Computer Science Engineering Student',
		projectsTitle: 'Projects',
		projectsNoImage: 'No image',
		scrollLeftLabel: 'Scroll left',
		scrollRightLabel: 'Scroll right',
		projectsText: {
			p1: {
				title: 'PDF Translation with Generative AI',
				subtitle: 'Flexible use of SLMs and LLMs, sequential document processing, chunk-wise translation and PDF reconstruction while preserving styles and layout'
			},
			p2: {
				title: 'Food Image Classification',
				subtitle: 'Machine Learning approach, feature selection and performance evaluation'
			},
			p3: {
				title: 'PinIt App Development',
				subtitle: 'Team development of a travel mini social network: pins (photos & journal), configurable visibility, text-to-coords search, travel assistant and secure access management'
			},
			p4: {
				title: 'Design & Prototyping of a Directional Sound Level Meter',
				subtitle: 'Signal extraction and analysis from 3 analog microphones with ESP32, data transmission via WebSocket and real-time visualizations on a cylindrical display'
			}
		},
		skillsLabels: {
			js: 'JavaScript', cpp: 'C++', arduino: 'Arduino', git: 'Git', sql: 'SQL', python: 'Python'
		},
		skillsTitle: 'Skills',
		timelineTitle: 'Experience & Education',
		timelineItems: [
			{ id: 1, year: '2026', title: 'Engineering Degree in Computer Science & Mathematics', subtitle: 'Polytech Paris-Saclay' },
			{ id: 2, year: '2025', title: 'Erasmus Semester: Master in Computer Science', subtitle: 'Sapienza Università di Roma' },
			{ id: 3, year: '2025', title: 'TOEIC Certification (English)', subtitle: 'English level C1' },
			{ id: 4, year: '2025', title: 'Research Internship in Data Visualization (6 months)', subtitle: 'INRIA : Aviz team' }
		]
	},

	// Italian (translated from fr)
	it: {
		title: 'Curriculum Vitae',
		bioTitle: 'Chi sono',
		bio: "Sono uno studente di informatica attualmente alla ricerca di uno stage in ambito software. Sono particolarmente interessato allo sviluppo software, alla cybersicurezza e ai sistemi intelligenti, e ho esperienza nello sviluppo web.",
		profileName: 'Erwan Achat',
		profileSubtitle: 'Studente di Ingegneria Informatica',
		projectsTitle: 'Progetti',
		projectsNoImage: 'Nessuna immagine',
		scrollLeftLabel: 'Scorri a sinistra',
		scrollRightLabel: 'Scorri a destra',
		projectsText: {
			p1: { title: 'Traduzione di PDF con IA generativa', subtitle: 'Uso flessibile di SLM e LLM, elaborazione sequenziale del documento, traduzione a pezzi e ricostruzione del PDF preservando stili e layout' },
			p2: { title: 'Classificazione di immagini alimentari', subtitle: "Approccio di Machine Learning, selezione delle feature e valutazione delle prestazioni" },
			p3: { title: 'Sviluppo dell’app PinIt', subtitle: 'Sviluppo in team di un mini social network di viaggio: pin (foto & diario), visibilità configurabile, ricerca text-to-coords, assistente di viaggio e gestione sicura degli accessi' },
			p4: { title: "Progettazione e prototipazione di un misuratore di livello sonoro direzionale", subtitle: "Estrazione e analisi dei segnali da 3 microfoni analogici con ESP32, trasmissione tramite WebSocket e visualizzazioni in tempo reale su display cilindrico" }
		},
		skillsLabels: { js: 'JavaScript', cpp: 'C++', arduino: 'Arduino', git: 'Git', sql: 'SQL', python: 'Python' },
		skillsTitle: 'Competenze',
		timelineTitle: 'Esperienza & Formazione',
		timelineItems: [
			{ id: 1, year: '2026', title: "Laurea d'Ingegneria in Informatica e Matematica", subtitle: 'Polytech Paris-Saclay' },
			{ id: 2, year: '2025', title: 'Semestre Erasmus: Master in Informatica', subtitle: 'Sapienza Università di Roma' },
			{ id: 3, year: '2025', title: 'Certificazione TOEIC (Inglese)', subtitle: 'Inglese livello C1' },
			{ id: 4, year: '2025', title: 'Tirocinio di ricerca in visualizzazione dei dati (6 mesi)', subtitle: 'INRIA : team Aviz' }
		]
	},

	// Chinese (simplified) (translated from fr)
	zh: {
		title: '简历',
		bioTitle: '关于我',
		bio: '我是一名计算机科学学生，目前正在寻找软件工程方向的实习。我对软件开发、网络安全和智能系统特别感兴趣，并拥有网页开发经验。',
		profileName: 'Erwan Achat',
		profileSubtitle: '计算机工程学生',
		projectsTitle: '项目',
		projectsNoImage: '无图像',
		scrollLeftLabel: '向左滚动',
		scrollRightLabel: '向右滚动',
		projectsText: {
			p1: { title: '使用生成式AI的PDF翻译', subtitle: '灵活使用SLM与LLM，按序处理文档，分块翻译并重建PDF，同时保留样式和布局' },
			p2: { title: '食物图像分类', subtitle: '机器学习方法，特征选择与性能评估' },
			p3: { title: 'PinIt 应用开发', subtitle: '团队开发的旅行迷你社交网络：添加 pin（照片 & 日志）、可配置可见性、文本到坐标搜索、旅行助手及安全的访问管理' },
			p4: { title: '定向声级计的设计与原型', subtitle: '使用 ESP32 对 3 个模拟麦克风信号进行提取与分析，通过 WebSocket 传输数据并在圆柱形显示屏上进行实时可视化' }
		},
		skillsLabels: { js: 'JavaScript', cpp: 'C++', arduino: 'Arduino', git: 'Git', sql: 'SQL', python: 'Python' },
		skillsTitle: '技能',
		timelineTitle: '经历与教育',
		timelineItems: [
			{ id: 1, year: '2026', title: '计算机与数学工程学位', subtitle: 'Polytech Paris-Saclay' },
			{ id: 2, year: '2025', title: 'Erasmus 学期：计算机科学硕士', subtitle: 'Sapienza Università di Roma' },
			{ id: 3, year: '2025', title: 'TOEIC 证书（英语）', subtitle: '英语水平 C1' },
			{ id: 4, year: '2025', title: '数据可视化研究实习（6 个月）', subtitle: 'INRIA : Aviz 团队' }
		]
	}
}

export default function CurriculumVitae({ initialLang = 'en' }){
	const [lang, setLang] = useState(initialLang)
	const t = DICT[lang] || DICT.en

	// localized timeline items
	const timelineItems = t.timelineItems || []

	// Build localized projects list by merging COMMON.projects with per-language texts
	const projects = COMMON.projects.map((p, idx) => {
		const key = `p${idx+1}`
		const text = (t.projectsText && t.projectsText[key]) || {}
		return {
			id: p.id || key,
			title: text.title || `Project ${idx+1}`,
			subtitle: text.subtitle || '',
			tags: p.tags || [],
			image: p.image
		}
	})

	// Build localized skills list from COMMON.skills and per-language labels
	const skills = COMMON.skills.map(s => ({
		id: s.id,
		src: s.src,
		label: (t.skillsLabels && t.skillsLabels[s.id]) || s.defaultLabel || s.id
	}))

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
																		<h2 className="mt-4 text-3xl font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{t.profileName}</h2>
																		<div className="mt-2 text-sm text-neutral-600 text-center">{t.profileSubtitle}</div>
					</div>

					<div className="sm:col-span-2">
									<div className="mb-8">
										<h3 className="text-lg font-semibold" style={{ fontFamily: '"Cormorant Garamond", serif' }}>{t.bioTitle}</h3>
										<p className="mt-2 text-sm text-neutral-700">{t.bio}</p>
									</div>

									{/* Projects gallery */}
									<div className="mb-6">
												<ProjectGallery projects={projects} labels={{ title: t.projectsTitle, noImage: t.projectsNoImage, scrollLeft: t.scrollLeftLabel, scrollRight: t.scrollRightLabel }} />
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

