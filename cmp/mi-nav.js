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
  }
}

customElements.define("mi-nav", MiNav);