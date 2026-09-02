// ---------------------------------------------------------------
// Construcción de bloques dinámicos: chips del hero, mini-grid,
// grilla de Tipos.
// ---------------------------------------------------------------
export class ContentBuilder {
  constructor(piezas, detailSheet){
    this.piezas = piezas;
    this.detailSheet = detailSheet;
    this.chipRow = document.getElementById("chip-row");
    this.miniGrid = document.getElementById("mini-grid");
    this.tiposGrid = document.getElementById("tipos-grid");
  }

  build(){
    this.piezas.forEach(p => {
      this._buildChip(p);
      this._buildMiniCard(p);
      this._buildTipoRow(p);
    });
  }

  _buildChip(p){
    const chip = document.createElement("div");
    chip.className = "dotc";
    chip.style.background = p.accent;
    this.chipRow.appendChild(chip);
  }

  _buildMiniCard(p){
    const mini = document.createElement("button");
    mini.className = "mini-card";
    mini.innerHTML = `<div class="sw" style="background:${p.accent}"></div><div class="t">${p.lugar}</div><div class="st">${p.peso}</div>`;
    mini.addEventListener("click", () => this.detailSheet.open(p));
    this.miniGrid.appendChild(mini);
  }

  _buildTipoRow(p){
    const row = document.createElement("button");
    row.className = "tipo-row";
    row.style.setProperty("--accent", p.accent);
    row.innerHTML = `
      <div class="ring"><div class="core"></div></div>
      <div class="info">
        <h3>${p.nombre}</h3>
        <div class="loc">${p.lugar}</div>
        <div class="msg">${p.mensaje}</div>
      </div>
      <div class="weight"><b>${p.peso}</b>${p.diametro}</div>
    `;
    row.addEventListener("click", () => this.detailSheet.open(p));
    this.tiposGrid.appendChild(row);
  }
}
