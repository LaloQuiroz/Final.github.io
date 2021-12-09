import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";
import {
  iniciaSesión,
  terminaSesión
} from "./seguridad.js";

const forma = document["forma"];

getAuth().onAuthStateChanged(muestraSesión, muestraError);

async function
  muestraSesión(usuario) {
  if (usuario && usuario.email) {
    forma.user.value = usuario.displayName || "";
    forma.terminarSesión.
      addEventListener(
        "click", terminaSesión);
  } else {
    iniciaSesión();
  }
}
