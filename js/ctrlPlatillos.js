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
import {
  guardaFoto
} from "./platillos.js";


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
    const precio = getString(formData, "precio").trim();
    const descrip = getString(formData, "desc").trim();

    const modelo = {
      id,
      nombre,
      precio,
      descrip 
    };
    //await daoPlatillo.add(modelo);
    await guardaFoto(evt,formData,id, nombre, precio, descrip);
    muestraPlatillos();
  } catch (e) {
    muestraError(e);
  }
}
