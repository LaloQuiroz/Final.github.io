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
  guardaFoto(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const idPlatillo = getForánea(formData,"id");
    const rolIds = formData.getAll("rolIds");
    await daoUsuario.
      doc(id).
      set({
        idPlatillo,
        rolIds
      });
    const avatar = formData.get("imagen");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
