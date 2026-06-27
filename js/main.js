// =========================================================
// MUSEO DE LA ADMINISTRACIÓN — render del mapa de recorrido
// Pinta dinámicamente las 7 paradas en index.html a partir de
// salas-data.js, con enlaces relativos "./salas/salaN.html".
// =========================================================

import SALAS from "./salas-data.js";

function render() {
  const contenedor = document.getElementById("mapa-recorrido");
  if (!contenedor) return;

  contenedor.innerHTML = SALAS.map((sala) => `
    <a class="parada" href="./salas/${sala.slug}.html">
      <span class="parada__num">${sala.id}</span>
      <span class="parada__cuerpo">
        <span>
          <h3>${sala.nombre}</h3>
          <span>${sala.tema}</span>
        </span>
        <span class="parada__flecha" aria-hidden="true">→</span>
      </span>
    </a>
  `).join("");
}

document.addEventListener("DOMContentLoaded", render);
