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
const daoUsuario = firestore.collection("Usuario");

export async function
   guardaFoto(evt,formData,id, nombre, precio, descrip) {
  try {
    evt.preventDefault();
    const idPlatillo = getForánea(formData,"id");
    const nombrePlatillo = getForánea(formData, "nombre");
    const precioPlatillo = getForánea(formData, "precio");
    const descripPlatillo = getForánea(formData, "descrip");

    await daoPlatillo.
      doc(id).
      set({
      	nombrePlatillo,
      	precioPlatillo,
      	descripPlatillo
      });
    const avatar = formData.get("imagen");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
