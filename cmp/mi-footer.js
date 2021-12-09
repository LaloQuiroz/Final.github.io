class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Eduardo Quiroz Huante
      </p>`;
  }
}

customElements.define("mi-footer", MiFooter);
