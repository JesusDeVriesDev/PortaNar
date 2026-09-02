import { PIEZAS } from "./data.js";
import { ViewLoader } from "./ViewLoader.js";
import { Navigation } from "./Navigation.js";
import { DetailSheet } from "./DetailSheet.js";
import { ContentBuilder } from "./ContentBuilder.js";
import { ARExperience } from "./ARExperience.js";

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar las vistas separadas (Inicio, Historia, Tipos, Impacto, AR)
  //    antes de tocar el DOM con el resto de la app.
  await ViewLoader.loadAll();

  // 2. Inicializar navegación entre vistas y tabbar
  const navigation = new Navigation();
  navigation.init();

  // 3. Ficha de detalle compartida (bottom sheet)
  const detailSheet = new DetailSheet();

  // 4. Construir chips, mini-grid y grilla de Tipos con los datos de PIEZAS
  const contentBuilder = new ContentBuilder(PIEZAS, detailSheet);
  contentBuilder.build();

  // 5. Módulo de Realidad Aumentada (botón "Escanear")
  const ar = new ARExperience(PIEZAS);
  ar.init();
});
