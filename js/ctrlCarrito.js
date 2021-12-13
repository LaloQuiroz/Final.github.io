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

getAuth().onAuthStateChanged(protege, muestraError);

const firestore = getFirestore();
const daoPlatillo = firestore.collection("Platillo");
const forma = document["forma"];

llena();

 async function llena(){
	try{
		const doc = await daoPlatillo.get();
		querySnapshot.forEach((doc) => { forma.pago.value = doc});
	}catch(e){
		console.log(e);
	}
}

