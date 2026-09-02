// ---------------------------------------------------------------
// Ficha de detalle (bottom sheet) — reutilizada por Tipos y por AR
// ---------------------------------------------------------------
export class DetailSheet {
  constructor(sheetSelector = "#detail-sheet", backdropSelector = "#sheet-backdrop"){
    this.sheetEl = document.querySelector(sheetSelector);
    this.backdropEl = document.querySelector(backdropSelector);
    this.backdropEl.addEventListener("click", () => this.close());
  }

  html(p, withClose){
    return `
      ${withClose ? '<button class="close-sheet" data-close>×</button>' : ''}
      <div class="grip"></div>
      <div class="head">
        <div class="ring" style="--accent:${p.accent}"><div class="core" style="background:${p.accent}"></div></div>
        <div>
          <h2>${p.nombre}</h2>
          <div class="loc">${p.material}</div>
        </div>
      </div>
      <div class="msg" style="color:${p.accent}">${p.mensaje}</div>
      <div class="rule"></div>
      <div class="block">
        <div class="label">Historia</div>
        <div class="body-text">${p.historia}</div>
      </div>
      <div class="block">
        <div class="label">Color y técnica</div>
        <div class="body-text">${p.colorBase} ${p.tecnica}.</div>
      </div>
      <div class="stats">
        <div class="stat"><div class="num">${p.peso}</div><div class="lbl">Peso</div></div>
        <div class="stat"><div class="num">${p.diametro}</div><div class="lbl">Diámetro</div></div>
        <div class="stat"><div class="num">${p.bio}</div><div class="lbl">Biodegradable</div></div>
      </div>
      <div class="fate">
        <div class="label">Al final de su vida útil</div>
        <div class="body-text">${p.final}</div>
      </div>
    `;
  }

  open(p){
    this.sheetEl.style.setProperty("--accent", p.accent);
    this.sheetEl.innerHTML = this.html(p, true);
    this.sheetEl.classList.add("visible");
    this.backdropEl.classList.add("visible");
    this.sheetEl.querySelector("[data-close]").addEventListener("click", () => this.close());
  }

  close(){
    this.sheetEl.classList.remove("visible");
    this.backdropEl.classList.remove("visible");
  }
}
