import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul class="lin">
        <li>
          <a href="index.html">
            Inicio</a>
        </li>
        <li>
          <a href="menu.html">
            Menú</a>
        </li>
        <li>
          <a href="carrito.html">
            Carrito</a>
        </li>
		</ul>
      `;
	  this.ul = this.querySelector("ul");
      getAuth().onAuthStateChanged(
        usuario => this.cambiaUsuario(usuario), muestraError);
  }
  async cambiaUsuario(usu){
    if(usu && usu.email){
      let html = "";
      const roles = await cargaRoles(usu.email);
	    let a = false;
      if (roles.has("Admnistrador")) {
	      a = true;
	      console.log(a)
        html += 
       `<li>
          <a href=
            "admin.html">-Administrador-</a>
        </li>`; 
      }
      this.ul.innerHTML += html;
    }
  } 
}

customElements.define("mi-nav", MiNav);
