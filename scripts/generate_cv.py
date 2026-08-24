from pathlib import Path
import shutil

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "output" / "pdf" / "cv-luis-valenzuela.pdf"
PUBLIC_PDF = ROOT / "public" / "documents" / "cv-luis-valenzuela.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 38
CONTENT_WIDTH = PAGE_WIDTH - (MARGIN_X * 2)

NAVY = HexColor("#071524")
NAVY_SOFT = HexColor("#10243A")
CYAN = HexColor("#22B8CF")
CYAN_LIGHT = HexColor("#7DD3FC")
TEXT = HexColor("#243447")
MUTED = HexColor("#5B6B7C")
LINE = HexColor("#D7E0E8")
PANEL = HexColor("#F3F7FA")
WHITE = HexColor("#FFFFFF")


REGULAR = "Helvetica"
SEMIBOLD = "Helvetica-Bold"
BOLD = "Helvetica-Bold"


def register_fonts():
    global REGULAR, SEMIBOLD, BOLD

    candidates = [
        {
            "regular": Path("C:/Windows/Fonts/segoeui.ttf"),
            "semibold": Path("C:/Windows/Fonts/seguisb.ttf"),
            "bold": Path("C:/Windows/Fonts/segoeuib.ttf"),
        },
        {
            "regular": Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            "semibold": Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            "bold": Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
        },
    ]

    selected = next((fonts for fonts in candidates if all(path.exists() for path in fonts.values())), None)
    if not selected:
        return

    pdfmetrics.registerFont(TTFont("CV-Regular", str(selected["regular"])))
    pdfmetrics.registerFont(TTFont("CV-Semibold", str(selected["semibold"])))
    pdfmetrics.registerFont(TTFont("CV-Bold", str(selected["bold"])))
    REGULAR = "CV-Regular"
    SEMIBOLD = "CV-Semibold"
    BOLD = "CV-Bold"


def text_width(text, font, size):
    return pdfmetrics.stringWidth(text, font, size)


def wrap_text(text, font, size, max_width):
    lines = []
    current = ""
    for word in text.split():
        candidate = word if not current else f"{current} {word}"
        if text_width(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font=REGULAR, size=8.7, leading=12.0, color=TEXT):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap_text(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullet(c, text, x, y, width):
    bullet_y = y + 2.6
    c.setFillColor(CYAN)
    c.circle(x + 2.4, bullet_y, 1.8, stroke=0, fill=1)
    return draw_wrapped(c, text, x + 12, y, width - 12, size=8.65, leading=11.8)


def draw_section(c, title, y):
    c.setFillColor(NAVY)
    c.setFont(BOLD, 10.8)
    c.drawString(MARGIN_X, y, title.upper())
    title_end = MARGIN_X + text_width(title.upper(), BOLD, 10.8) + 10
    c.setStrokeColor(CYAN)
    c.setLineWidth(1.2)
    c.line(title_end, y + 3, PAGE_WIDTH - MARGIN_X, y + 3)
    return y - 18


def draw_role(c, role, company, dates, location, y):
    c.setFillColor(NAVY)
    c.setFont(SEMIBOLD, 10.1)
    c.drawString(MARGIN_X, y, role)
    c.setFont(SEMIBOLD, 8.6)
    c.drawRightString(PAGE_WIDTH - MARGIN_X, y, dates)
    y -= 12
    c.setFillColor(CYAN)
    c.setFont(SEMIBOLD, 8.4)
    c.drawString(MARGIN_X, y, company)
    c.setFillColor(MUTED)
    c.setFont(REGULAR, 8.0)
    c.drawRightString(PAGE_WIDTH - MARGIN_X, y, location)
    return y - 13


def draw_skill_line(c, label, value, y):
    size = 8.15
    c.setFillColor(CYAN)
    c.circle(MARGIN_X + 11, y + 2.3, 1.55, stroke=0, fill=1)
    c.setFillColor(TEXT)
    c.setFont(REGULAR, size)
    c.drawString(MARGIN_X + 20, y, f"{label} {value}")
    return y - 12.2


def draw_link(c, label, url, x, y, font=REGULAR, size=8.0, color=CYAN_LIGHT):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, label)
    width = text_width(label, font, size)
    c.linkURL(url, (x, y - 2, x + width, y + size + 1), relative=0)
    return x + width


def build_cv(output_path):
    output_path.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output_path), pagesize=A4, pageCompression=1)
    c.setTitle("CV Luis Valenzuela Madrid - Full Stack Developer")
    c.setAuthor("Luis Valenzuela Madrid")
    c.setSubject("Curriculum vitae profesional - Full Stack Developer")
    c.setKeywords("Full Stack Developer, React, Node.js, Python, FastAPI, Azure, automatizacion, inteligencia artificial")

    # Header
    header_height = 118
    c.setFillColor(NAVY)
    c.rect(0, PAGE_HEIGHT - header_height, PAGE_WIDTH, header_height, stroke=0, fill=1)
    c.setFillColor(CYAN)
    c.rect(0, PAGE_HEIGHT - header_height, 7, header_height, stroke=0, fill=1)

    header_x = MARGIN_X
    c.setFillColor(WHITE)
    c.setFont(BOLD, 24)
    c.drawString(header_x, PAGE_HEIGHT - 41, "Luis Valenzuela Madrid")
    c.setFillColor(CYAN_LIGHT)
    c.setFont(SEMIBOLD, 9.2)
    c.drawString(header_x, PAGE_HEIGHT - 60, "FULL STACK DEVELOPER  |  INGENIERO EN INFORMÁTICA")

    contact_y = PAGE_HEIGHT - 82
    c.setFillColor(WHITE)
    c.setFont(REGULAR, 7.9)
    c.drawString(header_x, contact_y, "Santiago, Chile  |  +56 9 9224 4708  |  ")
    x = header_x + text_width("Santiago, Chile  |  +56 9 9224 4708  |  ", REGULAR, 7.9)
    x = draw_link(c, "luisvalenzuela0202@gmail.com", "mailto:luisvalenzuela0202@gmail.com", x, contact_y)

    contact_y -= 15
    x = draw_link(c, "linkedin.com/in/luis-valenzuelam", "https://www.linkedin.com/in/luis-valenzuelam/", header_x, contact_y)
    c.setFillColor(WHITE)
    c.setFont(REGULAR, 8.0)
    c.drawString(x, contact_y, "  |  ")
    x += text_width("  |  ", REGULAR, 8.0)
    x = draw_link(c, "lushooc.github.io", "https://lushooc.github.io/", x, contact_y)
    c.setFillColor(WHITE)
    c.setFont(REGULAR, 8.0)
    c.drawString(x, contact_y, "  |  ")
    x += text_width("  |  ", REGULAR, 8.0)
    draw_link(c, "github.com/Lushooc", "https://github.com/Lushooc", x, contact_y)

    y = PAGE_HEIGHT - header_height - 24

    # Profile
    y = draw_section(c, "Perfil profesional", y)
    profile = (
        "Full Stack Developer e Ingeniero en Informática con experiencia profesional desarrollando aplicaciones web, "
        "APIs, automatizaciones y soluciones cloud e inteligencia artificial aplicada. Trabajo con React, Node.js, "
        "Python y FastAPI, integrando servicios de Azure y despliegues CI/CD. Orientado a crear software seguro, "
        "mantenible y alineado con las necesidades del negocio."
    )
    y = draw_wrapped(c, profile, MARGIN_X, y, CONTENT_WIDTH, size=9.0, leading=12.6)
    y -= 9

    # Experience
    y = draw_section(c, "Experiencia profesional", y)
    y = draw_role(c, "Asistente de Desarrollo y Mantención de Sistemas", "PwC Chile", "Abr 2025 - Actualidad", "Santiago, Chile | Híbrido", y)
    pwc_bullets = [
        "Desarrollo de aplicaciones web full stack con React en frontend y Python/FastAPI en backend, integradas con APIs y servicios externos.",
        "Automatización de procesos con Python, Selenium, Eel y PyInstaller, además de flujos y aplicaciones con Power Automate y Power Apps.",
        "Implementación de funciones serverless con Azure Functions, gestión segura de secretos mediante Azure Key Vault y despliegues CI/CD.",
        "Desarrollo de soluciones de IA para lectura y análisis masivo de documentos mediante prompts de sistema especializados y Databricks.",
        "Colaboración con equipos ágiles y multidisciplinarios en análisis, desarrollo, mantención y mejora continua de soluciones.",
    ]
    for bullet in pwc_bullets:
        y = draw_bullet(c, bullet, MARGIN_X + 2, y, CONTENT_WIDTH - 2)
        y -= 2.8

    y -= 2
    y = draw_role(c, "Practicante GeneXus", "IT Factory", "Sep 2024 - Nov 2024", "Santiago, Chile | Remoto", y)
    it_bullets = [
        "Desarrollo web y de aplicaciones móviles con GeneXus 18 y WorkWithPlus.",
        "Apoyo en el diseño y construcción de un Mini CRM, aplicando buenas prácticas y resolución colaborativa de requerimientos.",
    ]
    for bullet in it_bullets:
        y = draw_bullet(c, bullet, MARGIN_X + 2, y, CONTENT_WIDTH - 2)
        y -= 2.8

    y -= 4

    # Skills
    y = draw_section(c, "Competencias técnicas", y)
    panel_top = y + 7
    panel_height = 83
    c.setFillColor(PANEL)
    c.roundRect(MARGIN_X, panel_top - panel_height, CONTENT_WIDTH, panel_height, 7, stroke=0, fill=1)
    y -= 5
    y = draw_skill_line(c, "Frontend:", "React, JavaScript, TypeScript, Tailwind CSS, Ant Design, HTML y CSS", y)
    y = draw_skill_line(c, "Backend y APIs:", "Python, FastAPI, Node.js, Django, APIs REST", y)
    y = draw_skill_line(c, "Automatización:", "Selenium, Power Automate, Power Apps, Eel, PyInstaller", y)
    y = draw_skill_line(c, "Cloud y DevOps:", "Microsoft Azure, Azure Functions, Azure Key Vault, GitHub Actions, CI/CD", y)
    y = draw_skill_line(c, "Datos e IA:", "SQL, PostgreSQL, Pandas, Databricks, análisis documental, prompting e IA aplicada", y)
    y = draw_skill_line(c, "Desarrollo agéntico:", "GitHub Copilot, Claude Code y Codex (proyectos personales)", y)
    y = panel_top - panel_height - 13

    # Projects
    y = draw_section(c, "Proyectos seleccionados", y)
    c.setFillColor(NAVY)
    c.setFont(SEMIBOLD, 8.9)
    c.drawString(MARGIN_X, y, "Evolución de mi portafolio personal")
    x = MARGIN_X + text_width("Evolución de mi portafolio personal", SEMIBOLD, 8.9) + 6
    draw_link(c, "Ver proyecto", "https://lushooc.github.io/", x, y, size=7.8, color=CYAN)
    y -= 11
    y = draw_wrapped(c, "Migración de HTML, CSS y JavaScript a React, Tailwind CSS y Ant Design, con componentes reutilizables y despliegue automatizado en GitHub Pages.", MARGIN_X, y, CONTENT_WIDTH, size=8.1, leading=11.0, color=MUTED)
    y -= 4
    c.setFillColor(NAVY)
    c.setFont(SEMIBOLD, 8.9)
    c.drawString(MARGIN_X, y, "Sitios corporativos en desarrollo")
    y -= 11
    x = draw_link(c, "Ver Styrka Producciones", "https://styrka-producciones.lushooc.chatgpt.site/", MARGIN_X, y, font=SEMIBOLD, size=8.0, color=CYAN)
    c.setFillColor(MUTED)
    c.setFont(REGULAR, 8.0)
    c.drawString(x, y, "  |  ")
    x += text_width("  |  ", REGULAR, 8.0)
    draw_link(c, "Ver Vía Interiores", "https://via-interiores.lushooc.chatgpt.site/", x, y, font=SEMIBOLD, size=8.0, color=CYAN)
    y -= 12
    y = draw_wrapped(c, "Diseño de experiencias responsivas orientadas a comunicar servicios, exhibir trabajos y facilitar el contacto comercial mediante previews funcionales.", MARGIN_X, y, CONTENT_WIDTH, size=8.1, leading=11.0, color=MUTED)
    y -= 4
    c.setFillColor(NAVY)
    c.setFont(SEMIBOLD, 8.9)
    c.drawString(MARGIN_X, y, "Rescate Soft - Proyecto educativo de tesis | Duoc UC")
    y -= 11
    y = draw_wrapped(c, "Proyecto de tesis desarrollado con Angular y Node.js para registrar incidentes y apoyar decisiones mediante visualización de indicadores y analítica en Power BI.", MARGIN_X, y, CONTENT_WIDTH, size=8.1, leading=11.0, color=MUTED)
    y -= 8

    # Education and languages
    y = draw_section(c, "Formación", y)
    c.setFillColor(NAVY)
    c.setFont(SEMIBOLD, 8.5)
    c.drawString(MARGIN_X, y, "Ingeniería en Informática | Duoc UC, Sede Puente Alto")
    c.setFillColor(MUTED)
    c.setFont(REGULAR, 8.0)
    c.drawRightString(PAGE_WIDTH - MARGIN_X, y, "Titulado | Dic 2024")
    y -= 17
    y = draw_section(c, "Idiomas", y)
    c.setFillColor(TEXT)
    c.setFont(REGULAR, 8.0)
    c.drawString(MARGIN_X, y, "Español: nativo  |  Inglés: intermedio (TOEIC Bridge)")

    # Footer
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_X, 28, PAGE_WIDTH - MARGIN_X, 28)
    c.setFillColor(MUTED)
    c.setFont(REGULAR, 6.8)
    c.drawCentredString(PAGE_WIDTH / 2, 17, "Curriculum vitae | Luis Valenzuela Madrid")

    c.showPage()
    c.save()


if __name__ == "__main__":
    register_fonts()
    build_cv(OUTPUT_PDF)
    PUBLIC_PDF.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUTPUT_PDF, PUBLIC_PDF)
    print(f"CV generado: {OUTPUT_PDF}")
    print(f"CV publicado localmente: {PUBLIC_PDF}")
