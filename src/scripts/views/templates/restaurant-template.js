const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img 
        class="restaurant-item__header__poster lazyload"
        data-src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}"
        alt="${restaurant.name}"
        crossorigin="anonymous"
      >
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3 class="restaurant__title">
        <a href="#/detail/${restaurant.id}">${restaurant.name}</a>
      </h3>
      <p class="restaurant__location">
        <i class="fas fa-map-marker-alt"></i> ${restaurant.city}
      </p>
      <p class="restaurant__description">${restaurant.description.slice(0, 100)}...</p>
    </div>
  </div>
`;

const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i++) {
    template += `
      <div class="restaurant-item">
        <div class="restaurant-item__header">
          <div class="skeleton" style="width: 100%; height: 200px;"></div>
        </div>
        <div class="restaurant-item__content">
          <h3 class="skeleton" style="width: 70%; height: 20px; margin-bottom: 8px;"></h3>
          <p class="skeleton" style="width: 40%; height: 16px; margin-bottom: 8px;"></p>
          <p class="skeleton" style="width: 100%; height: 16px;"></p>
        </div>
      </div>
    `;
  }

  return template;
};

export {
  createRestaurantItemTemplate,
  createSkeletonRestaurantTemplate,
};