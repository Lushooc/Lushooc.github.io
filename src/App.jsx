import { useEffect, useMemo, useState } from 'react'
import { Button, Carousel, Drawer, Modal, Tag } from 'antd'
import {
  ArrowRightOutlined, CloudOutlined, CodeOutlined, DatabaseOutlined,
  DownloadOutlined, GithubOutlined, LinkedinOutlined, MailOutlined,
  MenuOutlined, PhoneOutlined, RocketOutlined,
  SafetyCertificateOutlined, RobotOutlined,
} from '@ant-design/icons'
import {
  SiClaude, SiDatabricks, SiFastapi, SiGithubactions, SiGithubcopilot,
  SiPython, SiReact, SiSelenium,
} from 'react-icons/si'
import { RiMicrosoftFill } from 'react-icons/ri'
import { TbBrandOpenai } from 'react-icons/tb'
import { VscAzure } from 'react-icons/vsc'

const navigation = [
  ['Inicio', '#inicio'], ['Sobre mí', '#sobre-mi'], ['Experiencia', '#experiencia'],
  ['Habilidades', '#habilidades'], ['Proyectos', '#proyectos'], ['Contacto', '#contacto'],
]

const technologyLogos = [
  { name: 'Python', category: 'Backend & automatización', icon: SiPython, color: '#ffd343' },
  { name: 'React', category: 'Frontend', icon: SiReact, color: '#61dafb' },
  { name: 'FastAPI', category: 'APIs', icon: SiFastapi, color: '#00bfa5' },
  { name: 'Selenium', category: 'Automatización web', icon: SiSelenium, color: '#43b02a' },
  { name: 'Microsoft Azure', category: 'Cloud', icon: VscAzure, color: '#38bdf8' },
  { name: 'Power Automate', category: 'Power Platform', icon: RiMicrosoftFill, color: '#60a5fa' },
  { name: 'Power Apps', category: 'Power Platform', icon: RiMicrosoftFill, color: '#c084fc' },
  { name: 'GitHub Actions', category: 'CI/CD', icon: SiGithubactions, color: '#58a6ff' },
  { name: 'Databricks', category: 'Datos & IA', icon: SiDatabricks, color: '#ff6247' },
  { name: 'GitHub Copilot', category: 'Desarrollo agéntico', icon: SiGithubcopilot, color: '#f8fafc' },
  { name: 'Claude Code', category: 'Desarrollo agéntico', icon: SiClaude, color: '#d97757' },
  { name: 'Codex', category: 'Desarrollo agéntico', icon: TbBrandOpenai, color: '#6ee7f9' },
]

const chileDateFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: 'America/Santiago', year: 'numeric', month: 'numeric',
})

const monthNameFormatter = new Intl.DateTimeFormat('es-CL', {
  timeZone: 'UTC', month: 'long',
})

function getChileYearMonth(date = new Date()) {
  const parts = Object.fromEntries(chileDateFormatter.formatToParts(date).map(({ type, value }) => [type, value]))
  return { year: Number(parts.year), month: Number(parts.month) }
}

function formatMonth({ year, month }) {
  const monthName = monthNameFormatter.format(new Date(Date.UTC(year, month - 1, 1)))
  return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${year}`
}

function formatDuration(start, end) {
  const totalMonths = Math.max(1, ((end.year - start.year) * 12) + end.month - start.month + 1)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return [
    years > 0 ? `${years} ${years === 1 ? 'año' : 'años'}` : null,
    months > 0 ? `${months} ${months === 1 ? 'mes' : 'meses'}` : null,
  ].filter(Boolean).join(' ')
}

function formatExperiencePeriod(item, chileNow) {
  const end = item.current ? chileNow : item.end
  return `${formatMonth(item.start)} — ${item.current ? 'Actualidad' : formatMonth(item.end)} · ${formatDuration(item.start, end)}`
}

function useChileYearMonth() {
  const [chileNow, setChileNow] = useState(getChileYearMonth)

  useEffect(() => {
    const refreshChileDate = () => setChileNow(getChileYearMonth())
    const interval = window.setInterval(refreshChileDate, 60 * 60 * 1000)
    return () => window.clearInterval(interval)
  }, [])

  return chileNow
}

const experience = [
  {
    role: 'Asistente de Desarrollo y Mantención de Sistemas',
    company: 'PwC Chile',
    start: { year: 2025, month: 4 },
    current: true,
    location: 'Santiago, Chile · Híbrido',
    highlights: [
      'Desarrollo de soluciones de automatización con Python y Power Platform para optimizar procesos operativos.',
      'Construcción de aplicaciones web y APIs con React, Python y FastAPI, integradas con servicios cloud.',
      'Implementación de funciones serverless, gestión segura de secretos y despliegues automatizados mediante CI/CD.',
      'Desarrollo de soluciones de IA para lectura y análisis documental mediante prompts especializados y Databricks.',
    ],
    tags: ['Python', 'React', 'FastAPI', 'Azure', 'Power Platform', 'Databricks'],
  },
  {
    role: 'Practicante GeneXus',
    company: 'IT Factory',
    start: { year: 2024, month: 9 },
    end: { year: 2024, month: 11 },
    location: 'Santiago, Chile · Remoto',
    highlights: [
      'Desarrollo web y de aplicaciones móviles nativas con GeneXus 18 y WorkWithPlus.',
      'Participación en un equipo remoto, aplicando buenas prácticas de desarrollo y resolución de requerimientos.',
    ],
    tags: ['GeneXus 18', 'WorkWithPlus', 'Web', 'Mobile'],
  },
]

const projects = [
  {
    title: 'Styrka Producciones', type: 'Sitio corporativo · Sonido profesional', accent: '#f0a64a',
    status: 'En desarrollo',
    summary: 'Experiencia digital orientada a presentar servicios y equipamiento de sonido, resolver dudas y convertir visitas en solicitudes de cotización.',
    detail: 'Diseñé y construí una experiencia web corporativa para Styrka Producciones, enfocada en comunicar con claridad su propuesta de sonido profesional en la V Región. El sitio organiza sus servicios, inventario de equipos, proceso de trabajo y preguntas frecuentes, y conecta los principales puntos de conversión con WhatsApp, correo e Instagram. Actualmente continúa en etapa de validación y refinamiento de contenido antes de su entrega definitiva.',
    cover: '/assets/projects/client-sites/styrka-producciones.jpg',
    images: ['/assets/projects/client-sites/styrka-producciones.jpg'],
    imageLabels: ['Preview actual · Portada de Styrka Producciones'],
    tags: ['Sitio corporativo', 'UX/UI', 'Responsive', 'Conversión', 'WhatsApp'],
    liveUrl: 'https://styrka-producciones.lushooc.chatgpt.site/',
  },
  {
    title: 'Vía Interiores', type: 'Sitio corporativo · Carpintería y retail', accent: '#9aaa6a',
    status: 'En desarrollo',
    summary: 'Vitrina digital para exhibir proyectos de implementación comercial, comunicar servicios y generar nuevas oportunidades de contacto.',
    detail: 'Diseñé una propuesta web para Vía Interiores que transforma su trabajo visual en una experiencia corporativa clara y editorial. El sitio presenta servicios de carpintería, obras civiles e implementación comercial, una selección de proyectos reales y un proceso de trabajo de principio a fin. La versión actual funciona como preview y continúa en desarrollo mientras se validan contenidos y canales de contacto definitivos.',
    cover: '/assets/projects/client-sites/via-interiores.jpg',
    images: ['/assets/projects/client-sites/via-interiores.jpg'],
    imageLabels: ['Preview actual · Portada de Vía Interiores'],
    tags: ['Sitio corporativo', 'UX/UI', 'Responsive', 'Portfolio visual', 'Retail'],
    liveUrl: 'https://via-interiores.lushooc.chatgpt.site/',
  },
  {
    title: 'Evolución de mi Portafolio', type: 'Proyecto personal · Frontend & UX', accent: '#22d3ee',
    summary: 'Migración completa de un portafolio construido con HTML, CSS y JavaScript a una experiencia moderna con React, Tailwind CSS y Ant Design.',
    detail: 'Renové la arquitectura, el contenido y la experiencia visual de mi portafolio personal. La versión original utilizaba HTML, CSS y JavaScript sin framework; la nueva implementación incorpora componentes reutilizables con React, estilos responsivos con Tailwind CSS, componentes de Ant Design, Vite y despliegue automatizado en GitHub Pages. También implementé contenido dinámico: la antigüedad de mi cargo actual se calcula automáticamente cada mes con la zona horaria de Chile, eliminando la necesidad de actualizar manualmente el período. Las capturas muestran la evolución real del proyecto, desde la portada y la galería anteriores hasta la nueva experiencia.',
    cover: '/assets/projects/portfolio-migration/new-home.png',
    images: [
      '/assets/projects/portfolio-migration/old-home.png',
      '/assets/projects/portfolio-migration/old-projects.png',
      '/assets/projects/portfolio-migration/new-home.png',
    ],
    imageLabels: [
      'Antes · Portada con HTML, CSS y JavaScript',
      'Antes · Sección de proyectos original',
      'Después · React, Tailwind CSS y Ant Design',
    ],
    tags: ['React', 'Tailwind CSS', 'Ant Design', 'Intl API', 'Vite', 'GitHub Pages'],
    liveUrl: 'https://lushooc.github.io/',
    repositoryUrl: 'https://github.com/Lushooc/Lushooc.github.io',
  },
  {
    title: 'Air One', type: 'Fintech · Aplicación web y escritorio', accent: '#6ee7f9',
    summary: 'Sistema integral de gestión financiera con dashboard web, aplicación WPF e integración de pagos mediante Transbank.',
    detail: 'Una solución que conecta la operación financiera en web y escritorio. La propuesta integra autenticación, gestión de información, visualización de indicadores y procesamiento de pagos.',
    cover: '/assets/projects/air-one/dashboard.png',
    images: ['/assets/projects/air-one/dashboard.png', '/assets/projects/air-one/transactions.png'],
    tags: ['Django', 'WPF', 'Transbank API', 'PostgreSQL'],
  },
  {
    title: 'Registra APP', type: 'EdTech · Aplicación móvil', accent: '#a78bfa',
    summary: 'Aplicación híbrida para consultar y gestionar información académica desde dispositivos móviles.',
    detail: 'Plataforma académica desarrollada con Ionic y Django REST Framework. Centraliza calificaciones, asistencia e información relevante para estudiantes y docentes.',
    cover: '/assets/projects/registra-app/login.png',
    images: ['/assets/projects/registra-app/login.png', '/assets/projects/registra-app/dashboard.png'],
    tags: ['Ionic', 'Django REST', 'Angular', 'SQLite'],
  },
  {
    title: 'Sismos Chile', type: 'Data · Cloud analytics', accent: '#fbbf24',
    summary: 'Pipeline de datos en Google Cloud para procesar y visualizar información sísmica de Chile.',
    detail: 'Proyecto de analítica que reúne procesamiento, almacenamiento y visualización en servicios de Google Cloud, transformando datos sísmicos en información explorable.',
    cover: '/assets/projects/sismos-chile/bigquery.png',
    images: ['/assets/projects/sismos-chile/bigquery.png', '/assets/projects/sismos-chile/functions.png', '/assets/projects/sismos-chile/looker.png'],
    tags: ['GCP', 'BigQuery', 'Cloud Functions', 'Looker'],
  },
  {
    title: 'Rescate Soft', type: 'GovTech · Gestión de emergencias', accent: '#fb7185',
    summary: 'Sistema para registrar siniestros, visualizar indicadores y apoyar decisiones de respuesta comunal.',
    detail: 'Solución creada con Angular y Node.js para automatizar el ingreso de incidentes. Complementa la operación con dashboards y análisis orientados a zonas de riesgo.',
    cover: '/assets/projects/rescate-soft/dashboard.png',
    images: ['/assets/projects/rescate-soft/dashboard.png', '/assets/projects/rescate-soft/incidents.png', '/assets/projects/rescate-soft/analytics.png'],
    tags: ['Angular', 'Node.js', 'Power BI', 'Data Mining'],
  },
]

function SectionHeading({ eyebrow, title, description }) {
  return <div className="section-heading reveal">
    <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const chileNow = useChileYearMonth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible')
    }), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <div className="site-shell">
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark">LV</span>
        <span className="brand-copy">Luis Valenzuela<small>Full Stack Developer</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navegación principal">
        {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <Button className="desktop-cv" icon={<DownloadOutlined />} href="/documents/cv-luis-valenzuela.pdf" download="CV-Luis-Valenzuela-Madrid.pdf">Descargar CV</Button>
        <Button className="mobile-menu" type="text" icon={<MenuOutlined />} aria-label="Abrir menú" onClick={() => setMenuOpen(true)} />
      </div>
    </header>

    <Drawer title="Navegación" placement="right" open={menuOpen} onClose={() => setMenuOpen(false)} size={300}>
      <nav className="drawer-nav" aria-label="Navegación móvil">
        {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRightOutlined /></a>)}
        <Button type="primary" icon={<DownloadOutlined />} href="/documents/cv-luis-valenzuela.pdf" download="CV-Luis-Valenzuela-Madrid.pdf" block>Descargar CV</Button>
      </nav>
    </Drawer>

    <main>
      <section id="inicio" className="hero-section">
        <div className="hero-grid container-wide">
          <div className="hero-copy reveal is-visible">
            <div className="availability"><span className="availability-dot" />Disponible para nuevos desafíos</div>
            <p className="hero-kicker">Hola, soy Luis Valenzuela</p>
            <h1>Construyo soluciones digitales que conectan <span>software, datos y personas.</span></h1>
            <p className="hero-description">Ingeniero en Informática con experiencia en automatización, desarrollo full stack, cloud e inteligencia artificial aplicada. Convierto procesos complejos en soluciones seguras, claras y escalables.</p>
            <div className="hero-action-panel">
              <div className="hero-actions">
                <Button className="hero-primary-cta" type="primary" size="large" href="#proyectos" icon={<RocketOutlined />}>Explorar proyectos</Button>
                <Button className="hero-secondary-cta" size="large" href="mailto:luisvalenzuela0202@gmail.com" icon={<MailOutlined />}>Hablemos</Button>
              </div>
              <div className="hero-socials" aria-label="Perfiles profesionales">
                <span className="hero-socials-label">Conecta conmigo</span>
                <a className="social-button social-button--github" href="https://github.com/Lushooc" target="_blank" rel="noreferrer">
                  <span className="social-icon"><GithubOutlined /></span>
                  <span className="social-copy"><strong>GitHub</strong><small>@Lushooc</small></span>
                  <ArrowRightOutlined className="social-arrow" />
                </a>
                <a className="social-button social-button--linkedin" href="https://www.linkedin.com/in/luis-valenzuelam/" target="_blank" rel="noreferrer">
                  <span className="social-icon"><LinkedinOutlined /></span>
                  <span className="social-copy"><strong>LinkedIn</strong><small>Perfil profesional</small></span>
                  <ArrowRightOutlined className="social-arrow" />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-visual reveal is-visible">
            <div className="portrait-frame">
              <div className="portrait-glow" />
              <img src="/assets/profile/luis-valenzuela.png" alt="Luis Valenzuela" />
              <div className="portrait-card portrait-card--top"><CodeOutlined /><span>Enfoque<strong>Full stack</strong></span></div>
              <div className="portrait-card portrait-card--bottom"><SafetyCertificateOutlined /><span>Formación<strong>Ingeniería en Informática</strong></span></div>
            </div>
          </div>
        </div>
        <div className="hero-orb hero-orb--one" /><div className="hero-orb hero-orb--two" />
      </section>

      <section id="sobre-mi" className="section about-section"><div className="container">
        <SectionHeading eyebrow="Perfil profesional" title="Tecnología con propósito y una mirada práctica" description="Combino automatización, desarrollo de software, cloud e IA para crear soluciones que simplifican el trabajo y pueden evolucionar de forma segura." />
        <div className="about-grid">
          <article className="about-story reveal">
            <p className="large-copy">Soy Ingeniero en Informática titulado de DUOC UC, con experiencia profesional construyendo automatizaciones, aplicaciones web, APIs y soluciones de inteligencia artificial.</p>
            <p>Durante mi experiencia en PwC Chile he evolucionado desde la automatización de procesos con Python y Power Platform hacia el desarrollo de productos con React, FastAPI, Azure y Databricks. Me motiva resolver problemas complejos con tecnología mantenible, segura y orientada a las personas.</p>
          </article>
          <div className="principles-grid reveal">
            {[
              [<RobotOutlined />, 'Automatización', 'Procesos más simples, consistentes y eficientes.'],
              [<CodeOutlined />, 'Software', 'Aplicaciones y APIs claras y mantenibles.'],
              [<CloudOutlined />, 'Cloud', 'Soluciones seguras preparadas para evolucionar.'],
              [<DatabaseOutlined />, 'IA aplicada', 'Información compleja convertida en resultados útiles.'],
            ].map(([icon, title, text]) => <div className="principle-card" key={title}>{icon}<h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </div></section>

      <section id="experiencia" className="section experience-section"><div className="container">
        <SectionHeading eyebrow="Trayectoria" title="Experiencia construyendo soluciones reales" description="Automatización, desarrollo de software e inteligencia artificial aplicados en entornos profesionales y equipos multidisciplinarios." />
        <div className="experience-list">
          {experience.map((item, index) => <article className="experience-card reveal" key={item.company} style={{ '--delay': `${index * 90}ms` }}>
            <div className="experience-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
            <div className="experience-content">
              <div className="experience-heading"><div><p className="experience-company">{item.company}</p><h3>{item.role}</h3></div><div className="experience-meta"><span>{formatExperiencePeriod(item, chileNow)}</span><span>{item.location}</span></div></div>
              <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              <div className="project-tags">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            </div>
          </article>)}
        </div>
      </div></section>

      <section id="habilidades" className="section skills-section"><div className="container">
        <SectionHeading eyebrow="Stack tecnológico" title="Herramientas para construir de principio a fin" description="Experiencia práctica en automatización, frontend, backend, plataformas cloud, inteligencia artificial y desarrollo asistido por agentes." />
        <div className="logo-marquee reveal" aria-label="Tecnologías y herramientas">
          <div className="logo-track">
            {[...technologyLogos, ...technologyLogos].map((technology, index) => {
              const TechnologyIcon = technology.icon
              return <article className="logo-card" key={`${technology.name}-${index}`} aria-hidden={index >= technologyLogos.length} style={{ '--logo-color': technology.color }}>
                <span className="logo-icon"><TechnologyIcon aria-hidden="true" /></span>
                <span className="logo-copy"><strong>{technology.name}</strong><small>{technology.category}</small></span>
              </article>
            })}
          </div>
        </div>
      </div></section>

      <section id="proyectos" className="section projects-section"><div className="container-wide">
        <SectionHeading eyebrow="Trabajo seleccionado" title="Proyectos que combinan producto y tecnología" description="Productos personales, académicos y experiencias web en desarrollo, presentados con capturas reales, propósito y contexto técnico." />
        <div className="projects-grid">
          {projects.map((project, index) => <article className="project-card reveal" key={project.title} style={{ '--accent': project.accent, '--delay': `${index * 90}ms` }}>
            <button type="button" className="project-image" onClick={() => setSelectedProject(project)} aria-label={`Ver detalles de ${project.title}`}>
              <img src={project.cover} alt={`Captura del proyecto ${project.title}`} loading="lazy" />
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              {project.status && <span className="project-status"><span />{project.status}</span>}
              <span className="project-view">Ver caso <ArrowRightOutlined /></span>
            </button>
            <div className="project-body"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.summary}</p>
              <div className="project-tags">{project.tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
              <button className="text-button" type="button" onClick={() => setSelectedProject(project)}>Explorar proyecto <ArrowRightOutlined /></button>
            </div>
          </article>)}
        </div>
      </div></section>

      <section id="contacto" className="section contact-section"><div className="container"><div className="contact-panel reveal">
        <div><span className="eyebrow">Construyamos algo</span><h2>¿Tienes un proyecto o una oportunidad en mente?</h2><p>Estoy disponible para conversar sobre desarrollo de software, datos y nuevas oportunidades profesionales.</p></div>
        <div className="contact-actions">
          <Button type="primary" size="large" href="mailto:luisvalenzuela0202@gmail.com" icon={<MailOutlined />}>Enviar un correo</Button>
          <a className="contact-detail" href="tel:+56992244708"><PhoneOutlined /><span>Teléfono<strong>+56 9 9224 4708</strong></span></a>
        </div>
      </div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-inner">
      <div><span className="brand-mark brand-mark--small">LV</span><p>© {currentYear} Luis Valenzuela. Construido con React.</p></div>
      <div className="footer-links">
        <a href="https://github.com/Lushooc" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubOutlined /></a>
        <a href="https://www.linkedin.com/in/luis-valenzuelam/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinOutlined /></a>
        <a href="mailto:luisvalenzuela0202@gmail.com" aria-label="Correo electrónico"><MailOutlined /></a>
      </div>
    </div></footer>

    <Modal open={Boolean(selectedProject)} onCancel={() => setSelectedProject(null)} footer={null} width={960} centered destroyOnHidden title={selectedProject?.title} className="project-modal">
      {selectedProject && <div className="modal-layout">
        <Carousel arrows dots={{ className: 'carousel-dots' }}>{selectedProject.images.map((image, index) => <div className="modal-slide" key={image}>
          <img src={image} alt={`${selectedProject.title}, captura ${index + 1}`} />
          {selectedProject.imageLabels?.[index] && <span className="modal-slide-label">{selectedProject.imageLabels[index]}</span>}
        </div>)}</Carousel>
        <div className="modal-copy"><div className="modal-project-heading"><p className="project-type">{selectedProject.type}</p>{selectedProject.status && <span className="project-status project-status--inline" style={{ '--accent': selectedProject.accent }}><span />{selectedProject.status}</span>}</div><p>{selectedProject.detail}</p><div className="project-tags">{selectedProject.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
          {(selectedProject.liveUrl || selectedProject.repositoryUrl) && <div className="project-links">
            {selectedProject.liveUrl && <Button type="primary" href={selectedProject.liveUrl} target="_blank" icon={<RocketOutlined />}>{selectedProject.status ? 'Ver preview' : 'Ver sitio'}</Button>}
            {selectedProject.repositoryUrl && <Button href={selectedProject.repositoryUrl} target="_blank" icon={<GithubOutlined />}>Ver repositorio</Button>}
          </div>}
        </div>
      </div>}
    </Modal>
  </div>
}

export default App
