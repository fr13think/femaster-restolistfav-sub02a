class RestaurantItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    const { id, name, description, pictureId, city, rating } = this._restaurant;

    this.innerHTML = `
        <article class="restaurant-item">
          <div class="restaurant-item__header">
            <img 
              class="restaurant-item__thumbnail"
              src="https://restaurant-api.dicoding.dev/images/small/${pictureId}"
              alt="${name}"
              crossorigin="anonymous"
            >
          </div>
          <div class="restaurant-item__content">
            <h3 class="restaurant__title">
              <a href="#/detail/${id}">${name}</a>
            </h3>
            <div class="restaurant__info">
              <div class="restaurant__city">
                <i class="fa fa-map-marker"></i>
                <span>${city}</span>
              </div>
              <div class="restaurant__rating">
                <i class="fa fa-star"></i>
                <span>${rating}</span>
              </div>
            </div>
            <p class="restaurant__description">
              ${description.length > 150 ? `${description.substring(0, 150)  }...` : description}
            </p>
          </div>
        </article>
      `;
  }
}

customElements.define('restaurant-item', RestaurantItem);