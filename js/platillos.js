import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraUsuarios,
  muestraPlatillos
} from "./navegacion.js";

const SIN_PLATILLOS = /* html */
  `<option value="">
    -- Sin Alumnos --
  </option>`;

const firestore = getFirestore();

const daoRol = firestore.collection("Rol");
const daoPlatillo = firestore.collection("Platillo");

export async function guardaPlatillo(evt, formData, id) { 
  try {
    evt.preventDefault();
    const nombrePlatillo = getForánea(formData,"nombre");
    const precioPlatillo = formData.getAll("precio");
    const descripPlatillo = formData.getAll("desc");
    await daoPlatillo.
      doc(id).
      set({
        nombrePlatillo,
        precioPlatillo,
        descripPlatillo
      });
    const avatar =
      formData.get("imagen");
    await subeStorage(id, avatar);
    muestraPlatillos();
  } catch (e) {
    muestraError(e);
  }
}
