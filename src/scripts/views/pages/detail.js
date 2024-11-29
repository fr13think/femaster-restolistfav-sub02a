import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/detail-template';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
    `;
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.slice(9); // Remove '#/detail/'

    try {
      const restaurant = await RestaurantSource.detail(id);
      const restaurantContainer = document.querySelector('#restaurant');

      if (!restaurant) {
        restaurantContainer.innerHTML = '<div class="restaurant-item__not__found">Restaurant not found</div>';
        return;
      }

      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    } catch (error) {
      console.error(error);
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = `<div class="error-container">Error: ${error.message}</div>`;
    }
  },
};

export default Detail;