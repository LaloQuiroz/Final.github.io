import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesion,
  terminaSesion
} from "./seguridad.js";

const forma = document["forma"];

getAuth().onAuthStateChanged(muestraSesión, muestraError);

async function
  muestraSesión(usuario) {
  if (usuario && usuario.email) {
    forma.nombre.value = usuario.displayName || "";
    forma.terminarSesion.
      addEventListener(
        "click", terminaSesion);
  } else {
    iniciaSesion();
  }
}
