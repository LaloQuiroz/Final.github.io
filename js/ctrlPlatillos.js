import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraPlatillos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoPlatillo = getFirestore().collection("Platillo");

const forma = document["forma"];
getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
  if (tieneRol(usuario,["Admnistrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData = new FormData(forma);

    const id = getString(formData, "id").trim();  
    const nombre = getString(formData, "nombre").trim();
    //const imagen = get(formData, "imagen");
    const precio = getString(formData, "precio").trim();
    const descrip = getString(formData, "descrip").trim();

    const modelo = {
      id,
      nombre,
     // imagen,
      precio,
      descrip 
    };
    await daoPlatillo.
      add(modelo);
    muestraPlatillos();
  } catch (e) {
    muestraError(e);
  }
}
