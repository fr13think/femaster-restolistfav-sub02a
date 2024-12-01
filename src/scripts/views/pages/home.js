import RestaurantSource from '../../data/restaurant-source';

const Home = {
  async render() {
    return `
      <hero-element></hero-element>
      <section id="mainContent" class="content" tabindex="0">
        <h2 class="content__heading">Explore Restaurants</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </section>
    `;
  },

  async afterRender() {
    try {
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurantsContainer.innerHTML = '<div class="loader">Loading...</div>';

      const restaurants = await RestaurantSource.list();

      if (restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<div class="restaurant-item__not__found">No restaurants found</div>';
        return;
      }

      restaurantsContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        const restaurantElement = document.createElement('restaurant-item');
        restaurantElement.restaurant = restaurant;
        restaurantsContainer.appendChild(restaurantElement);
      });
    } catch (error) {
      console.error(error);
      const restaurantsContainer = document.querySelector('#restaurants');
      if (restaurantsContainer) {
        restaurantsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
      }
    }
  },
};

export default Home;