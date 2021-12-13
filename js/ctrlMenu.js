import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  urlStorage
} from "../lib/storage.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

const lista = document.querySelector("#lista");
const firestore = getFirestore();

const daoRol = firestore.collection("Rol");
const daoPlatillo = firestore.collection("Platillo");
const daoUsuario = firestore.collection("Usuario");
const daoCarrito = firestore.collection("Ticket");

consulta();

function carrito(nombre, precio){
try{
    daoCarrito.add({
      nombre, 
      precio});
      window.alert("El platillo se ha agregado");
}catch(Exception e){
  console.log(e);
}
}

function consulta() {
  daoPlatillo.onSnapshot(htmlLista, errConsulta);
}

async function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    let platillos = [];
    snap.forEach(doc => platillos.
      push(htmlFila(doc)));
    const htmlFilas =
      await Promise.all(platillos);
    html += htmlFilas.join("");
  } else {
    html += /* html */
      `<li class="vacio">
        -- No hay platillos
        registrados. --
      </li>`;
  }
  lista.innerHTML = html;
}



async function htmlFila(doc) {

  const data = doc.data();

  const img = cod(await urlStorage(doc.id));
  const platillo = cod(data.nombrePlatillo);
  const precio = cod(data.precioPlatillo);
  const desc = cod(data.descPlatillo);
  const parámetros = new URLSearchParams();

  parámetros.append("id", doc.id);
  return (
    `<li>
        <span>
          <img src="${img}"
            alt="Falta el Avatar" class="imgMenu">
        </span>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
            ${platillo}<br>
            ${precio}<br>
            ${desc}<br>
          </span>
        </span>
        <button type="button" name="agregar"  onclick="carrito(this.platillo, this.precio)>Agregar al carrito</button>
        <br>
        <br>
    </li>`);
}

async function buscaPlatillo(id) {
  if (id) {
    const doc = await daoPlatillo.
        doc(id).
        get();
    if (doc.exists) {
      const data = doc.data();
      return (/* html */
        `${cod(data.nombrePlatillo)}`);
    }
  }
  return " ";
}

async function buscarPrecio(idp) {
  if (idp) {
    const doc = await daoPlatillo.
        doc(idp).
        get();
    if (doc.exists) {
      const data = doc.data();
      return (/* html */
        `${cod(data.precioPlatillo)}`);
    }
  }
  return " ";
}

async function buscarDesc(id) {
  if (id) {
    const doc = await daoPlatillo.
        doc(id).
        get();
    if (doc.exists) {
      const data = doc.data();
      return (/* html */
        `${cod(data.descpPlatillo)}`);
    }
  }
  return " ";
}
function errConsulta(e) {
  muestraError(e);
  consulta();
}
