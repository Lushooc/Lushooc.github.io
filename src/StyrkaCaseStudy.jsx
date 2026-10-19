import { ArrowRightOutlined, ArrowUpOutlined, CheckOutlined, RobotOutlined } from '@ant-design/icons'
import './styrka-case-study.css'

const comparison = [
  {
    stage: 'Antes',
    label: 'Primera propuesta',
    image: '/assets/projects/client-sites/styrka-producciones.jpg',
    alt: 'Primera propuesta de Styrka: portada negra, acentos ámbar, un símbolo grande y el mensaje Tu evento, a otro nivel.',
    headline: '«Tu evento, a otro nivel»',
    description: 'Una primera dirección visual en negro y ámbar, con el símbolo de la marca como protagonista.',
    variant: 'before',
  },
  {
    stage: 'Después',
    label: 'Sitio publicado',
    image: '/assets/projects/styrka/home.png',
    alt: 'Sitio publicado de Styrka con el mensaje Haz que suene, una identidad cromada, tipografía expresiva y fotografías reales.',
    headline: '«Haz que suene»',
    description: 'Una identidad cromada, tipografía expresiva y fotografías reales que llevan la energía de los eventos a la web.',
    variant: 'after',
  },
]

const scope = [
  { value: '5', label: 'secciones del sitio' },
  { value: '16', label: 'entradas de catálogo · 3 categorías' },
  { value: '7', label: 'trabajos en la galería' },
  { value: '.cl', label: 'dominio propio publicado' },
]

const decisions = [
  ['Identidad con carácter', 'Cromados y una tipografía expresiva articulan la nueva dirección visual de la marca.'],
  ['El trabajo real, al frente', 'El logotipo y las fotografías originales de Styrka dan contexto al equipamiento y a los eventos.'],
  ['Un recorrido hacia la cotización', 'La selección del catálogo llega al formulario y se convierte en un mensaje de WhatsApp que la persona puede revisar.'],
]

const technologies = [
  { label: 'Desarrollo web', items: ['React', 'TypeScript', 'Vinext', 'Vite', 'CSS / Tailwind', 'Sites'] },
  { label: 'Contenido audiovisual', items: ['Remotion · motion', 'Python · audio'] },
  { label: 'Publicación y dominio', items: ['NIC Chile · dominio', 'Cloudflare · DNS'] },
]

export default function StyrkaCaseStudy() {
  return <article className="styrka-case" aria-labelledby="styrka-case-title">
    <header className="styrka-case__intro">
      <div className="styrka-case__meta">
        <span className="styrka-case__eyebrow">Styrka Producciones · Caso de estudio</span>
        <span className="styrka-case__status"><span aria-hidden="true" />Sitio publicado</span>
      </div>
      <h2 id="styrka-case-title">De la primera propuesta<br className="styrka-case__desktop-break" /> a una <span>marca en escena.</span></h2>
      <p>La evolución de una propuesta web para sonido profesional hacia un sitio con identidad propia, trabajo real y un recorrido claro para cotizar.</p>
    </header>

    <section className="styrka-case__comparison" aria-label="Antes y después de Styrka Producciones">
      {comparison.map((version) => <figure className={`styrka-case__version styrka-case__version--${version.variant}`} key={version.stage}>
        <div className="styrka-case__version-bar">
          <span className="styrka-case__version-label">{version.stage}</span>
          <span>{version.label}</span>
        </div>
        <a className="styrka-case__capture" href={version.image} target="_blank" rel="noreferrer" aria-label={`Ampliar captura: ${version.label} (se abre en otra pestaña)`}>
          <img src={version.image} alt={version.alt} loading="lazy" width="1600" height="900" />
          <span className="styrka-case__zoom">Ampliar <ArrowUpOutlined aria-hidden="true" /></span>
        </a>
        <figcaption>
          <h3>{version.headline}</h3>
          <p>{version.description}</p>
        </figcaption>
      </figure>)}
    </section>
    <p className="styrka-case__comparison-note">El antes es la propuesta anterior que mostraba en mi portafolio. Ambas versiones forman parte del mismo proyecto.</p>

    <dl className="styrka-case__scope" aria-label="Alcance entregado">
      {scope.map((item) => <div key={item.value}>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>)}
    </dl>

    <section className="styrka-case__decisions" aria-labelledby="styrka-decisions-title">
      <div className="styrka-case__section-heading">
        <span className="styrka-case__eyebrow">Decisiones de diseño</span>
        <h3 id="styrka-decisions-title">Una web que se siente<br /> como Styrka.</h3>
      </div>
      <ol className="styrka-case__decision-list">
        {decisions.map(([title, description], index) => <li key={title}>
          <span className="styrka-case__step" aria-hidden="true">0{index + 1}</span>
          <div><h4>{title}</h4><p>{description}</p></div>
        </li>)}
      </ol>
    </section>

    <section className="styrka-case__experience" aria-labelledby="styrka-experience-title">
      <figure className="styrka-case__gallery">
        <img src="/assets/projects/styrka/gallery.png" alt="Galería del sitio de Styrka con fotografías de sus trabajos y eventos." loading="lazy" width="1600" height="900" />
        <figcaption>Los trabajos de Styrka, dentro de la experiencia.</figcaption>
      </figure>
      <div className="styrka-case__experience-copy">
        <span className="styrka-case__eyebrow">Experiencia entregada</span>
        <h3 id="styrka-experience-title">Explorar, elegir<br /> y conversar.</h3>
        <ul>
          <li><CheckOutlined aria-hidden="true" /><span>Catálogo con 16 entradas en 3 categorías y selección conectada al formulario.</span></li>
          <li><CheckOutlined aria-hidden="true" /><span>Galería de 7 trabajos, navegación con teclado y fotografías ampliables.</span></li>
          <li><CheckOutlined aria-hidden="true" /><span>Formulario que prepara un mensaje para revisar antes de enviarlo por WhatsApp.</span></li>
        </ul>
      </div>
    </section>

    <section className="styrka-case__launch" aria-labelledby="styrka-launch-title">
      <span className="styrka-case__eyebrow">Campaña de lanzamiento</span>
      <h3 id="styrka-launch-title">La misma identidad, fuera de la web.</h3>
      <p>El lanzamiento se acompañó con dos versiones de un reel vertical de 30 segundos, música sintetizada con Python y piezas para Instagram. Los encuadres y los textos se adaptaron para leerse desde el teléfono.</p>
      <figure>
        <a href="/assets/projects/styrka/launch.png" target="_blank" rel="noreferrer" aria-label="Ampliar piezas de lanzamiento para Instagram (se abre en otra pestaña)">
          <img src="/assets/projects/styrka/launch.png" alt="Tres piezas de Instagram para presentar la nueva web, sus servicios y la consulta de eventos de Styrka." loading="lazy" width="1328" height="768" />
        </a>
        <figcaption>Selección de las piezas gráficas de lanzamiento.</figcaption>
      </figure>
    </section>

    <section className="styrka-case__ai" aria-labelledby="styrka-ai-title">
      <div className="styrka-case__ai-mark" aria-hidden="true"><RobotOutlined /></div>
      <div className="styrka-case__ai-content">
        <span className="styrka-case__eyebrow">Proceso de desarrollo</span>
        <h3 id="styrka-ai-title">Desarrollo asistido por IA</h3>
        <div className="styrka-case__ai-tools" aria-label="Herramienta y modelos utilizados">
          <span>Codex</span><span>GPT-6.1 Sol</span><span>GPT-6 Astra</span>
        </div>
        <p>Trabajé con Codex y los modelos GPT-6.1 Sol y GPT-6 Astra para desarrollar e iterar el sitio. La dirección del proyecto, las decisiones de diseño y la revisión final estuvieron a mi cargo: Luis Valenzuela.</p>
      </div>
    </section>

    <section className="styrka-case__stack" aria-labelledby="styrka-stack-title">
      <div className="styrka-case__stack-heading"><span className="styrka-case__eyebrow">Herramientas utilizadas</span><h3 id="styrka-stack-title">De la interfaz a la publicación.</h3></div>
      <dl className="styrka-case__technology-groups">
        {technologies.map((group) => <div key={group.label}>
          <dt>{group.label}</dt>
          <dd>{group.items.map((item) => <span key={item}>{item}</span>)}</dd>
        </div>)}
      </dl>
    </section>

    <footer className="styrka-case__footer">
      <div><strong>Styrka Producciones</strong><span>Identidad, desarrollo y publicación.</span></div>
      <a href="https://styrkaproducciones.cl/" target="_blank" rel="noreferrer" className="styrka-case__visit">Visitar Styrka <ArrowRightOutlined aria-hidden="true" /><span className="styrka-case__sr-only"> (se abre en otra pestaña)</span></a>
    </footer>
  </article>
}
