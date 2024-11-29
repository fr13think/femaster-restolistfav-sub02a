const createRestaurantItemTemplate = (restaurant) => `
  <article class="restaurant-item">
    <div class="restaurant-item__header">
      <img 
        class="restaurant-item__thumbnail lazyload"
        data-src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}"
        alt="${restaurant.name}"
        crossorigin="anonymous"
      >
      <div class="restaurant-item__header__rating">
        <i class="fa fa-star" aria-hidden="true"></i>
        <span>${restaurant.rating}</span>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title">
        <a href="#/detail/${restaurant.id}">${restaurant.name}</a>
      </h3>
      <div class="restaurant__info">
        <div class="restaurant__city">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>${restaurant.city}</span>
        </div>
        <div class="restaurant__rating">
          <i class="fa fa-star" aria-hidden="true"></i>
          <span>${restaurant.rating}</span>
        </div>
      </div>
      <p class="restaurant__description">
        ${restaurant.description.length > 150 ? `${restaurant.description.substring(0, 150)  }...` : restaurant.description}
      </p>
    </div>
  </article>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
      <article class="restaurant-item">
        <div class="restaurant-item__header">
          <img class="restaurant-item__thumbnail skeleton" src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" alt="skeleton">
        </div>
        <div class="restaurant-item__content">
          <h3 class="skeleton">Lorem ipsum dolor sit amet</h3>
          <div class="restaurant__info">
            <div class="restaurant__city skeleton">City</div>
            <div class="restaurant__rating skeleton">Rating</div>
          </div>
          <p class="restaurant__description skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, soluta!</p>
        </div>
      </article>
    `;
  }
  return template;
};

export { createRestaurantItemTemplate, createSkeletonRestaurantTemplate };