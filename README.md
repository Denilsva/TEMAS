# Museo de la Administración — Catálogo digital

Sitio estático Mobile-First para GitHub Pages, repositorio `Denilsva/TEMAS`.
URL final: **https://denilsva.github.io/TEMAS/**

## Estructura

```
museo-admin/
├── index.html              ← Portada (concepto, público, mapa del recorrido)
├── salas/
│   ├── sala1.html  … sala7.html
├── css/
│   └── style.css           ← Paleta y estilos globales (mobile-first)
├── js/
│   ├── salas-data.js        ← Datos de las 7 salas (módulo ES)
│   └── main.js               ← Pinta el mapa de recorrido en index.html
└── assets/
    ├── favicon.png
    └── qr/
        └── qr-museo-gato.png  ← QR personalizado (escanea a la URL del sitio)
```

Todos los nombres de archivos y carpetas están en minúsculas.
Todas las rutas son **relativas** (`./css/...`, `./salas/...`, `../css/...`,
`../assets/...`), por lo que el sitio funciona igual en local, en una subruta
de GitHub Pages, o en cualquier otro subdirectorio, sin editar nada.

## Cómo publicarlo en GitHub Pages

1. Descomprime este ZIP.
2. Copia **el contenido** de la carpeta `museo-admin/` (no la carpeta en sí)
   a la raíz de tu repositorio `Denilsva/TEMAS`.
3. Sube los cambios:
   ```bash
   git add .
   git commit -m "Catálogo digital del museo"
   git push origin main
   ```
4. En GitHub: **Settings → Pages → Source → Deploy from a branch → main / (root)**.
5. Espera 1-2 minutos. Tu sitio quedará en:
   `https://denilsva.github.io/TEMAS/`

## El código QR

`assets/qr/qr-museo-gato.png` es un QR real (no decorativo): se generó con
corrección de errores nivel **H** (tolera hasta ~30% de daño/oclusión) y luego
se fusionó como halftone con la foto de tu gato, dejando los 3 patrones de
esquina y la línea de timing 100% intactos (son los que el lector usa para
ubicar el código). Fue validado escaneándolo con un decodificador automático
antes de entregarlo: apunta exactamente a `https://denilsva.github.io/TEMAS/`.

Si lo imprimes, hazlo a un tamaño mínimo de 3×3 cm y con buen contraste de
impresora para que el lector del celular lo enfoque sin problemas.

## Completar fotos de la maqueta

Cada sala tiene un bloque "Fotografías de la maqueta" con 2 placeholders.
Para usar tus propias fotos:

1. Coloca las imágenes dentro de `assets/fotos/` (ej. `sala1-maqueta-01.jpg`).
2. En `salas/salaN.html`, reemplaza:
   ```html
   <div class="galeria__item">
     <p class="galeria__placeholder">Foto 1<br>sala1-maqueta-01.jpg</p>
   </div>
   ```
   por:
   ```html
   <div class="galeria__item">
     <img src="../assets/fotos/sala1-maqueta-01.jpg" alt="Maqueta sala 1">
   </div>
   ```
