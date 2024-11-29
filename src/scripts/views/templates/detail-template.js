const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <div class="restaurant-detail__header">
      <img 
        class="restaurant-detail__poster lazyload"
        data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}"
        alt="${restaurant.name}"
        crossorigin="anonymous"
      >
      <div class="restaurant-detail__info">
        <h2 class="restaurant-detail__name">${restaurant.name}</h2>
        <div class="restaurant-detail__rating">
          <i class="fa fa-star" aria-hidden="true"></i>
          <span>${restaurant.rating}</span>
        </div>
        <div class="restaurant-detail__address">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>${restaurant.address}, ${restaurant.city}</span>
        </div>
        <div class="restaurant-detail__categories">
          ${restaurant.categories.map((category) => `
            <span class="category-tag">${category.name}</span>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="restaurant-detail__content">
      <section class="restaurant-detail__description">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </section>

      <section class="restaurant-detail__menus">
        <h3>Menus</h3>
        <div class="menus-container">
          <div class="menu-section">
            <h4>Foods</h4>
            <ul class="menu-list">
              ${restaurant.menus.foods.map((food) => `
                <li class="menu-item">
                  <i class="fa fa-cutlery" aria-hidden="true"></i>
                  ${food.name}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="menu-section">
            <h4>Drinks</h4>
            <ul class="menu-list">
              ${restaurant.menus.drinks.map((drink) => `
                <li class="menu-item">
                  <i class="fa fa-coffee" aria-hidden="true"></i>
                  ${drink.name}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="restaurant-detail__reviews">
        <h3>Customer Reviews</h3>
        <div class="reviews-list">
          ${restaurant.customerReviews.map((review) => `
            <div class="review-item">
              <div class="review-item__header">
                <div class="review-item__user">
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                  <span class="review-item__name">${review.name}</span>
                </div>
                <span class="review-item__date">${review.date}</span>
              </div>
              <p class="review-item__content">${review.review}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createSkeletonDetailTemplate = () => `
  <div class="restaurant-detail">
    <div class="restaurant-detail__header">
      <div class="restaurant-detail__poster skeleton"></div>
      <div class="restaurant-detail__info">
        <h2 class="skeleton">Restaurant Name</h2>
        <div class="skeleton">Rating</div>
        <div class="skeleton">Address</div>
        <div class="restaurant-detail__categories">
          <span class="category-tag skeleton"></span>
          <span class="category-tag skeleton"></span>
        </div>
      </div>
    </div>

    <div class="restaurant-detail__content">
      <section class="restaurant-detail__description">
        <h3 class="skeleton">Description</h3>
        <p class="skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      </section>

      <section class="restaurant-detail__menus">
        <h3 class="skeleton">Menus</h3>
        <div class="menus-container">
          <div class="menu-section">
            <h4 class="skeleton">Foods</h4>
            <ul class="menu-list">
              ${[1, 2, 3].map(() => `
                <li class="menu-item skeleton">Menu item</li>
              `).join('')}
            </ul>
          </div>
          <div class="menu-section">
            <h4 class="skeleton">Drinks</h4>
            <ul class="menu-list">
              ${[1, 2, 3].map(() => `
                <li class="menu-item skeleton">Menu item</li>
              `).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="restaurant-detail__reviews">
        <h3 class="skeleton">Customer Reviews</h3>
        <div class="reviews-list">
          ${[1, 2].map(() => `
            <div class="review-item skeleton">
              <div class="review-item__header">
                <div class="review-item__user skeleton">User Name</div>
                <span class="review-item__date skeleton">Date</span>
              </div>
              <p class="review-item__content skeleton">Review content</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  </div>
`;

export {
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createSkeletonDetailTemplate,
};