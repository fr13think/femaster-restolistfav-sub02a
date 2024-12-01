import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate, createSkeletonRestaurantTemplate } from '../templates/restaurant-template';

const Favorite = {
  async render() {
    return `
      <div class="content favorite-restaurants">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="restaurants" class="restaurants">
          ${createSkeletonRestaurantTemplate(20)}
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      const restaurantsContainer = document.querySelector('#restaurants');

      restaurantsContainer.innerHTML = '';

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = `
            <div class="favorite-item__not__found">
              <i class="fas fa-heart-broken"></i>
              <h3>No Favorites Found</h3>
              <p>You don't have any favorite restaurants yet.</p>
            </div>
        `;
        return;
      }

      restaurants.forEach((restaurant) => {
        if (restaurant && restaurant.pictureId) {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        }
      });

      const lazyLoadImages = document.querySelectorAll('img.lazyload');
      if ('loading' in HTMLImageElement.prototype) {
        lazyLoadImages.forEach((img) => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
        });
      } else {
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
      }
    } catch (error) {
      console.error('Error:', error);
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurantsContainer.innerHTML = `
        <div class="error-container">
          <p>Error loading favorite restaurants. Please try again later.</p>
        </div>
      `;
    }
  },
};

export default Favorite;