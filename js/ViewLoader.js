// ---------------------------------------------------------------
// Carga dinámica de las vistas: cada módulo (Inicio, Historia, Tipos,
// Impacto y Escanear/AR) vive en su propio archivo HTML dentro de
// views/. ViewLoader los descarga con fetch() y los inyecta en los
// "slots" definidos en index.html, antes de que el resto de la app
// (Navigation, ContentBuilder, ARExperience, etc.) toque el DOM.
//
// NOTA: por usar fetch() para archivos locales, el sitio debe servirse
// por HTTP (por ejemplo: npx serve . / python3 -m http.server), no
// abrirse directamente como file:// en el navegador.
// ---------------------------------------------------------------
const VIEWS = [
  { url: "views/inicio.html", slotId: "view-inicio-slot" },
  { url: "views/historia.html", slotId: "view-historia-slot" },
  { url: "views/tipos.html", slotId: "view-tipos-slot" },
  { url: "views/impacto.html", slotId: "view-impacto-slot" },
  { url: "views/ar.html", slotId: "ar-wrap-slot" }
];

export class ViewLoader {
  static async loadAll(){
    await Promise.all(VIEWS.map(view => ViewLoader._loadOne(view)));
  }

  static async _loadOne({ url, slotId }){
    const slot = document.getElementById(slotId);
    if(!slot){
      console.error(`ViewLoader: no existe el slot "${slotId}" en index.html`);
      return;
    }
    try {
      const res = await fetch(url);
      if(!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      slot.outerHTML = html;
    } catch(err){
      console.error(`ViewLoader: no se pudo cargar ${url}`, err);
      slot.outerHTML = `<div style="padding:20px;color:#a83a1c;">No se pudo cargar ${url}</div>`;
    }
  }
}
