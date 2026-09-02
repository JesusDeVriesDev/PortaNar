// ---------------------------------------------------------------
// Módulo de Realidad Aumentada (MindAR)
// La información NO aparece como ventana emergente: cada pieza tiene
// una etiqueta HTML (.ar-tag) que el componente "ar-hud-updater" mueve,
// fotograma a fotograma, a la posición en pantalla que corresponde a un
// punto anclado justo encima del marcador en el espacio 3D. Así la
// tarjeta "flota" junto al portavasos y se mueve con él dentro de la
// cámara, en vez de quedar fija sobre la pantalla.
// ---------------------------------------------------------------
export class ARExperience {
  constructor(piezas){
    this.piezas = piezas;

    this.markersRoot = document.getElementById("markers");
    this.arTagsRoot = document.getElementById("ar-tags");
    this.dotsRoot = document.getElementById("dots");
    this.instructionText = document.getElementById("instruction-text");

    this.loading = document.getElementById("cam-loading");
    this.loadingText = document.getElementById("cam-loading-text");
    this.arScene = document.getElementById("ar-scene");
    this.arWrap = document.getElementById("ar-wrap");

    this.found = new Set();
    this.activeMarkers = new Set();
    this.cameraWatchdog = null;

    this._registerHudUpdaterComponent();
  }

  init(){
    this._buildMarkersAndTags();
    this._bindUIEvents();
  }

  _arTagHTML(p){
    return `
      <div class="tag-head">
        <span class="dot" style="background:${p.accent}"></span>
        <h4>${p.nombre}</h4>
      </div>
      <div class="msg" style="color:${p.accent}">${p.mensaje}</div>
      <div class="stats-row">
        <span>${p.peso}</span><span>${p.diametro}</span><span>${p.bio}</span>
      </div>
      <div class="historia">
        <p>${p.historia}</p>
        <p><strong>Color y técnica:</strong> ${p.colorBase} ${p.tecnica}.</p>
        <p><strong>Al final de su vida útil:</strong> ${p.final}</p>
      </div>
      <div class="hint">Toca para leer la historia completa</div>
    `;
  }

  _buildMarkersAndTags(){
    this.piezas.forEach(p => {
      // Marcador anclado a la imagen: aro visual + punto ancla para la etiqueta
      const marker = document.createElement("a-entity");
      marker.setAttribute("mindar-image-target", "targetIndex: " + p.id);
      marker.setAttribute("id", "marker-" + p.id);
      marker.innerHTML = `
        <a-torus color="${p.accent}" radius="0.5" radius-tubular="0.02" position="0 0 0" rotation="0 0 0"
          animation="property: scale; dir: alternate; dur: 900; loop: true; to: 1.06 1.06 1.06"></a-torus>
        <a-circle color="${p.accent}" opacity="0.18" radius="0.46" position="0 0 -0.005"></a-circle>
        <a-entity id="anchor-${p.id}" position="0 0.74 0"></a-entity>
      `;
      this.markersRoot.appendChild(marker);

      // Etiqueta flotante (no modal): vive sobre la cámara pero se posiciona
      // cada frame según el punto ancla proyectado a pantalla.
      const tag = document.createElement("div");
      tag.className = "ar-tag";
      tag.id = "tag-" + p.id;
      tag.style.setProperty("--accent", p.accent);
      tag.innerHTML = this._arTagHTML(p);
      tag.addEventListener("click", () => {
        tag.classList.toggle("expanded");
        tag.querySelector(".hint").textContent = tag.classList.contains("expanded")
          ? "Toca para cerrar"
          : "Toca para leer la historia completa";
      });
      this.arTagsRoot.appendChild(tag);

      const dot = document.createElement("div");
      dot.className = "d";
      dot.id = "dot-" + p.id;
      this.dotsRoot.appendChild(dot);

      marker.addEventListener("targetFound", () => {
        this.activeMarkers.add(p.id);
        tag.classList.add("visible");
        document.getElementById("hud").style.opacity = "0.55";
        if(!this.found.has(p.id)){
          this.found.add(p.id);
          dot.classList.add("seen");
          dot.style.background = p.accent;
          dot.style.borderColor = p.accent;
        }
        this.instructionText.textContent = p.lugar;
        this._updateProgressText();
      });
      marker.addEventListener("targetLost", () => {
        this.activeMarkers.delete(p.id);
        tag.classList.remove("visible");
        tag.classList.remove("expanded");
        document.getElementById("hud").style.opacity = "1";
        this._updateProgressText();
      });
    });
  }

  _updateProgressText(){
    if(this.activeMarkers.size > 0) return; // mientras algo está a la vista, el título ya muestra el lugar
    if(this.found.size === 0){
      this.instructionText.textContent = "Buscando un portavasos…";
    } else if(this.found.size === this.piezas.length){
      this.instructionText.textContent = "Colección completa — " + this.found.size + "/6 piezas descubiertas";
    } else {
      this.instructionText.textContent = this.found.size + "/6 piezas descubiertas";
    }
  }

  // Componente A-Frame: cada fotograma, proyecta el punto ancla de cada
  // marcador activo a coordenadas de pantalla y mueve su etiqueta ahí,
  // recortando los bordes para que la tarjeta no se salga de la pantalla.
  _registerHudUpdaterComponent(){
    const self = this;
    AFRAME.registerComponent("ar-hud-updater", {
      init: function(){ this.vec = new AFRAME.THREE.Vector3(); },
      tick: function(){
        const camera = this.el.camera;
        if(!camera || self.activeMarkers.size === 0) return;
        const w = window.innerWidth, h = window.innerHeight;
        self.activeMarkers.forEach(id => {
          const anchor = document.getElementById("anchor-" + id);
          const tag = document.getElementById("tag-" + id);
          if(!anchor || !tag) return;
          anchor.object3D.getWorldPosition(this.vec);
          const proj = this.vec.clone().project(camera);
          if(proj.z > 1){ tag.classList.remove("visible"); return; }
          let x = (proj.x * 0.5 + 0.5) * w;
          let y = (-proj.y * 0.5 + 0.5) * h;
          const rect = tag.getBoundingClientRect();
          const halfW = (rect.width || 220) / 2;
          const fullH = rect.height || 90;
          x = Math.min(Math.max(x, halfW + 8), w - halfW - 8);
          y = Math.min(Math.max(y, fullH + 16), h - 8);
          tag.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
        });
      }
    });
  }

  // ---------------------------------------------------------------
  // Arranque de la cámara: se activa solo al pulsar "Escanear" y se
  // mantiene un estado de carga hasta que el video esté en pantalla.
  // ---------------------------------------------------------------
  _watchForCameraVideo(){
    let settled = false;
    const trySettle = () => {
      const video = document.querySelector("video");
      if(video && video.readyState >= 2 && !settled){
        settled = true;
        clearInterval(poller);
        clearTimeout(this.cameraWatchdog);
        this.loading.classList.add("hidden");
      }
    };
    const poller = setInterval(trySettle, 250);
    trySettle();
    this.cameraWatchdog = setTimeout(() => {
      if(settled) return;
      clearInterval(poller);
      this.loading.classList.add("error");
      this.loadingText.textContent = "No se pudo mostrar la cámara. Revisa el permiso del sitio y que se sirva por HTTPS.";
    }, 7000);
  }

  start(){
    this.loading.classList.remove("hidden", "error");
    this.loadingText.textContent = "Activando cámara…";
    this.arWrap.style.display = "block";
    this._watchForCameraVideo();

    const arrancar = () => {
      const sistema = this.arScene.systems["mindar-image-system"];
      if(sistema){ sistema.start(); }
      else { this.arScene.addEventListener("renderstart", () => this.arScene.systems["mindar-image-system"].start(), { once:true }); }
    };
    if(this.arScene.hasLoaded) arrancar();
    else this.arScene.addEventListener("loaded", arrancar, { once:true });
  }

  stop(){
    const sistema = this.arScene.systems["mindar-image-system"];
    if(sistema) sistema.stop();
    this.arWrap.style.display = "none";
    this.activeMarkers.clear();
    document.querySelectorAll(".ar-tag.visible").forEach(t => { t.classList.remove("visible"); t.classList.remove("expanded"); });
  }

  _bindUIEvents(){
    document.getElementById("go-ar").addEventListener("click", () => this.start());
    document.getElementById("tab-ar").addEventListener("click", () => this.start());
    document.getElementById("retry-cam").addEventListener("click", () => location.reload());
    document.getElementById("close-ar").addEventListener("click", () => this.stop());
  }
}
