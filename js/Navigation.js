// ---------------------------------------------------------------
// Navegación entre módulos (Inicio / Historia / Tipos / Impacto)
// ---------------------------------------------------------------
export class Navigation {
  constructor(){
    this.views = document.querySelectorAll(".view");
    this.tabButtons = document.querySelectorAll("#tabbar button[data-goto]");
  }

  init(){
    document.querySelectorAll("[data-goto]").forEach(el => {
      el.addEventListener("click", () => this.goto(el.dataset.goto));
    });
  }

  goto(name){
    this.views.forEach(v => v.classList.toggle("active", v.id === "view-" + name));
    this.tabButtons.forEach(b => b.classList.toggle("active", b.dataset.goto === name));
    const app = document.getElementById("app");
    app.scrollTop = 0;
    const active = document.getElementById("view-" + name);
    if(active) active.scrollTop = 0;
  }
}
