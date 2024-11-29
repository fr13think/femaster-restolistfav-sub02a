class HeroElement extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="hero">
          <div class="hero__inner">
            <h2 class="hero__title">Find Your Perfect Restaurant</h2>
            <p class="hero__tagline">Discover the best dining experience</p>
          </div>
        </div>
      `;
  }
}

customElements.define('hero-element', HeroElement);