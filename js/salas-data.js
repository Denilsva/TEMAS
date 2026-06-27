// =========================================================
// MUSEO DE LA ADMINISTRACIÓN — datos centrales de las salas
// Usado por index.html (mapa del recorrido) y por las salas
// para pintar la navegación inferior "anterior / siguiente".
// Rutas SIEMPRE relativas: este archivo no asume host ni subruta.
// =========================================================

const SALAS = [
  { id: 1, slug: "sala1", nombre: "Contexto histórico",            tema: "Hitos administrativos y análisis del entorno local" },
  { id: 2, slug: "sala2", nombre: "Escuelas administrativas",       tema: "Escuelas clásicas y comparación de casos peruanos" },
  { id: 3, slug: "sala3", nombre: "Gestión contemporánea",          tema: "Prácticas digitales y herramientas tecnológicas actuales" },
  { id: 4, slug: "sala4", nombre: "Proceso administrativo aplicado",tema: "Aplicación del proceso administrativo (PODC)" },
  { id: 5, slug: "sala5", nombre: "Liderazgo y sistemas de control",tema: "Liderazgo, comunicación y KPIs observados" },
  { id: 6, slug: "sala6", nombre: "Sostenibilidad y RSE",           tema: "Prácticas responsables y análisis de impacto" },
  { id: 7, slug: "sala7", nombre: "Benchmarking y propuestas",      tema: "Comparación con empresas referentes y propuestas de mejora" },
];

export default SALAS;
