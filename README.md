# Portafolio Full Stack - Luis Valenzuela

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-6-1677FF?logo=antdesign&logoColor=white)](https://ant.design/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github)](https://lushooc.github.io/)

Portafolio profesional de **Luis Valenzuela Madrid**, Ingeniero en Informática y Full Stack Developer. El proyecto presenta experiencia profesional, stack tecnológico, proyectos seleccionados y un CV generado automáticamente como parte del proceso de despliegue.

**Producción:** [lushooc.github.io](https://lushooc.github.io/)

## Características principales

- SPA responsiva construida con React y Vite.
- Sistema visual personalizado con Tailwind CSS, CSS moderno y componentes de Ant Design.
- Animaciones de entrada mediante `IntersectionObserver` y soporte para `prefers-reduced-motion`.
- Experiencia profesional con fechas calculadas usando la zona horaria `America/Santiago`.
- Carrusel tecnológico con herramientas de frontend, backend, automatización, cloud e IA.
- Galería de proyectos con capturas, etiquetas, modales y enlaces externos.
- CV de una página, compatible con ATS y regenerado antes de cada despliegue.
- Publicación automatizada en GitHub Pages mediante GitHub Actions.

## Arquitectura

```mermaid
flowchart LR
    Visitor[Visitante] --> Pages[GitHub Pages]
    Pages --> SPA[React SPA]

    subgraph Frontend
        SPA --> Sections[Secciones del portafolio]
        SPA --> UI[Ant Design + Tailwind CSS]
        SPA --> Dates[Intl API - America/Santiago]
        SPA --> Projects[Galería de proyectos]
    end

    Sections --> Experience[Experiencia y habilidades]
    Projects --> Assets[Capturas en public/assets]
    SPA --> CV[CV descargable]
    SPA --> External[GitHub, LinkedIn y previews]
```

La aplicación mantiene el contenido principal en estructuras de datos dentro de React. Las fechas del cargo actual se calculan en el navegador, evitando valores de antigüedad hardcodeados y respetando el calendario de Chile.

## Pipeline de despliegue

```mermaid
flowchart TD
    Push[Push a main o ejecución manual] --> Checkout[Checkout del repositorio]
    Checkout --> Node[Configurar Node.js 22]
    Checkout --> Python[Configurar Python 3.12]
    Node --> NpmCi[npm ci]
    Python --> PdfDeps[Instalar requirements-cv.txt]
    PdfDeps --> GenerateCV[Ejecutar scripts/generate_cv.py]
    NpmCi --> Lint[npm run lint]
    GenerateCV --> Lint
    Lint --> Build[npm run build]
    Build --> Artifact[Subir artefacto dist]
    Artifact --> Deploy[Deploy a GitHub Pages]
```

El PDF no se genera al momento de hacer clic. GitHub Pages sirve archivos estáticos, por lo que el pipeline crea la versión vigente del CV antes de construir y publicar el sitio.

## Stack tecnológico

| Área | Tecnologías |
| --- | --- |
| Frontend | React 19, JavaScript, Tailwind CSS 4, CSS3 |
| UI | Ant Design 6, Ant Design Icons, React Icons |
| Build | Vite 8 |
| Calidad | ESLint 10 |
| CV | Python 3.12, ReportLab |
| CI/CD | GitHub Actions, GitHub Pages |

## Estructura del proyecto

```text
Lushooc.github.io/
|-- .github/workflows/
|   `-- deploy.yml              # Pipeline de build y despliegue
|-- public/
|   |-- assets/                 # Fotografías y capturas de proyectos
|   `-- documents/
|       `-- cv-luis-valenzuela.pdf
|-- scripts/
|   `-- generate_cv.py          # Fuente reproducible del CV
|-- src/
|   |-- App.jsx                 # Contenido y componentes principales
|   |-- index.css               # Sistema visual y diseño responsivo
|   `-- main.jsx                # Entrada de React
|-- requirements-cv.txt         # Dependencias del generador PDF
|-- package.json
`-- vite.config.js
```

## Desarrollo local

### Requisitos

- Node.js 22 o compatible.
- npm.
- Python 3.12 para regenerar el CV.

### Instalación

```bash
git clone https://github.com/Lushooc/Lushooc.github.io.git
cd Lushooc.github.io
npm ci
python -m pip install -r requirements-cv.txt
```

### Servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173/`.

## Generación del CV

```bash
python scripts/generate_cv.py
```

El generador produce dos copias idénticas:

- `output/pdf/cv-luis-valenzuela.pdf`: artefacto local de salida.
- `public/documents/cv-luis-valenzuela.pdf`: archivo incluido por Vite y descargado desde el portafolio.

La experiencia vigente utiliza el formato `Abr 2025 - Actualidad`. Los cambios de cargo, responsabilidades o tecnologías deben realizarse en el generador y publicarse mediante un nuevo push.

## Verificación

```bash
npm run lint
npm run build
```

El build de producción se escribe en `dist/`. Tanto `dist/` como los artefactos temporales están excluidos del control de versiones.

## Publicación

El workflow [deploy.yml](.github/workflows/deploy.yml) se ejecuta automáticamente con cada push a `main` y también puede iniciarse manualmente desde **Actions**. En **Settings > Pages**, la fuente de publicación debe estar configurada como **GitHub Actions**.

## Contacto

- [LinkedIn](https://www.linkedin.com/in/luis-valenzuelam/)
- [GitHub](https://github.com/Lushooc)
- [Portafolio](https://lushooc.github.io/)
