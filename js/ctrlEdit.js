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
  eliminaStorage,
  urlStorage
} from "../lib/storage.js";

const daoPlatillo = getFirestore().collection("Platillo");
const params = new URL(location.href).searchParams;
const id = params.get("id");
const forma = document["forma"];
const img = document.querySelector("img");


getAuth().onAuthStateChanged(protege, muestraError);

async function protege(usuario) {
  if (tieneRol(usuario,
    ["Admnistrador"])) {
    busca();
  }
}

async function busca() {
  try {
    const doc =
      await daoPlatillo.doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      forma.idPlatillo.value = id;
      forma.nombre.value = data.nombrePlatillo || "";
      forma.precio.value = data.precioPlatillo;
      forma.desc.value = data.descripPlatillo || "";
      //img.src = await urlStorae forma.addEventListener("submit", guarda);
      forma.eliminar.addEventListener("click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraPlatillos();
  }
}

async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData = new FormData(forma); 
    const nombrePlatillo = getString(formData, "nombre").trim();
    const precioPlatillo = getString(formData, "precio").trim();
    const descripPlatillo = getString(formData, "desc").trim();

    await daoPlatillo.
      doc(id).
      set({
      	nombrePlatillo,
      	precioPlatillo, 
      	descripPlatillo
      });
    muestraPlatillos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoPlatillo.doc(id).delete();
      muestraPlatillos();
    }
  } catch (e) {
    muestraError(e);
  }
}

