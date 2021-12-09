class MiCabeza extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="borde margen" >
	<a href="index.html"><img src="img/logo_small.png" id="logo"></a>
	</div>
    `;
  }
}

customElements.define("mi-cabeza", MiCabeza);