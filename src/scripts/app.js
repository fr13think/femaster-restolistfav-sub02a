import RestaurantSource from './data/restaurant-source';
import UrlParser from './utils/url-parser';
import FavoriteRestaurantIdb from './data/favorite-restaurant-idb';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

class App {
  constructor({ content, button, drawer }) {
    this._content = content;
    this._button = button;
    this._drawer = drawer;
    this._initialAppShell();
  }

  _initialAppShell() {
    if (this._button && this._drawer) {
      this._button.addEventListener('click', (event) => {
        this._toggleDrawer(event);
      });

      document.addEventListener('click', (event) => {
        if (!this._button.contains(event.target) && !this._drawer.contains(event.target)) {
          this._drawer.classList.remove('open');
        }
      });
    }
  }

  _toggleDrawer(event) {
    event.stopPropagation();
    this._drawer.classList.toggle('open');
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    if (url.resource === '' || !url.resource) {
      await this._renderHome();
    } else if (url.resource === 'detail' && url.id) {
      await this._renderDetail(url.id);
    } else if (url.resource === 'favorite') {
      await this._renderFavorite();
    }
  }

  async _renderFavorite() {
    try {
      const favoriteModule = await import('./views/pages/favorite');
      const Favorite = favoriteModule.default;
      this._content.innerHTML = await Favorite.render();
      await Favorite.afterRender();
    } catch (error) {
      this._showError(error.message);
    }
  }

  async _renderHome() {
    try {
      this._showLoading();
      const [restaurants] = await Promise.all([
        RestaurantSource.list(),
        FavoriteRestaurantIdb.getAllRestaurants()
      ]);

      this._content.innerHTML = `
       <hero-element></hero-element>

       <!-- Popular Restaurants Section -->
       <section class="popular-section">
         <div class="popular-section__header">
           <h2>Popular Restaurants</h2>
         </div>
         <div class="swiper">
           <div class="swiper-wrapper">
             ${restaurants.slice(0, 8).map((restaurant) => `
               <div class="swiper-slide">
                 <a href="#/detail/${restaurant.id}">
                   <img 
                     src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}"
                     alt="${restaurant.name}"
                     crossorigin="anonymous"
                   >
                   <div class="swiper-slide__info">
                     <h3>${restaurant.name}</h3>
                   </div>
                 </a>
               </div>
             `).join('')}
           </div>
           <div class="swiper-pagination"></div>
           <div class="swiper-button-prev"></div>
           <div class="swiper-button-next"></div>
         </div>
       </section>

       <!-- Favorite Cities Section -->
       <section class="favorite-section">
         <div class="favorite-section__header">
           <h2>Favorite Cities</h2>
         </div>
         <div class="favorite-section__list">
           ${restaurants.filter((restaurant) => restaurant.rating > 4)
    .map((restaurant) => `
               <div class="favorite-card">
                 <div class="favorite-card__city">
                   <i class="fas fa-map-marker-alt"></i>
                   <span>${restaurant.city}</span>
                 </div>
                 <div class="favorite-card__content">
                   <h3>
                     <a href="#/detail/${restaurant.id}">${restaurant.name}</a>
                   </h3>
                   <div class="favorite-card__rating">
                     <i class="fas fa-star"></i>
                     <span>${restaurant.rating}</span>
                   </div>
                 </div>
               </div>
             `).join('')}
         </div>
       </section>

       <!-- All Restaurants Section -->
       <section class="content">
         <h2 class="content__heading">Explore All Restaurants</h2>
         <div id="restaurants" class="restaurants">
         </div>
       </section>
     `;

      const restaurantsContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        const restaurantElement = document.createElement('restaurant-item');
        restaurantElement.restaurant = restaurant;
        restaurantsContainer.appendChild(restaurantElement);
      });

      new Swiper('.swiper', {
        modules: [Navigation, Pagination],
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            centeredSlides: false,
          },
          968: {
            slidesPerView: 3,
            centeredSlides: false,
          }
        }
      });
    } catch (error) {
      this._showError(error.message);
    }
  }

  async _renderDetail(id) {
    try {
      this._showLoading();
      const restaurant = await RestaurantSource.detail(id);
      this._renderRestaurantDetail(restaurant);

      const likeButtonContainer = document.querySelector('#likeButtonContainer');
      await this._initializeLikeButton({
        likeButtonContainer,
        restaurant,
      });
    } catch (error) {
      this._showError(error.message);
    }
  }

  async _initializeLikeButton({ likeButtonContainer, restaurant }) {
    const LikeButtonInitiator = {
      async init({ likeButtonContainer, favoriteRestaurants, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurants = favoriteRestaurants;
        await this._renderButton();
      },

      async _renderButton() {
        const { id } = this._restaurant;
        if (await this._isRestaurantExist(id)) {
          this._renderLiked();
        } else {
          this._renderLike();
        }
      },

      async _isRestaurantExist(id) {
        const restaurant = await this._favoriteRestaurants.getRestaurant(id);
        return !!restaurant;
      },

      _renderLike() {
        this._likeButtonContainer.innerHTML = `
         <button aria-label="like this restaurant" id="likeButton" class="like">
           <i class="far fa-heart" aria-hidden="true"></i>
         </button>
       `;

        const likeButton = document.querySelector('#likeButton');
        let isProcessing = false;

        likeButton.addEventListener('click', async () => {
          if (isProcessing) return;
          try {
            isProcessing = true;
            await this._favoriteRestaurants.putRestaurant(this._restaurant);
            await this._renderButton();
          } catch (error) {
            console.error('Error while liking restaurant:', error);
          } finally {
            isProcessing = false;
          }
        });
      },

      _renderLiked() {
        this._likeButtonContainer.innerHTML = `
         <button aria-label="unlike this restaurant" id="likeButton" class="like">
           <i class="fas fa-heart" aria-hidden="true"></i>
         </button>
       `;

        const likeButton = document.querySelector('#likeButton');
        let isProcessing = false;

        likeButton.addEventListener('click', async () => {
          if (isProcessing) return;
          try {
            isProcessing = true;
            await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
            await this._renderButton();
          } catch (error) {
            console.error('Error while unliking restaurant:', error);
          } finally {
            isProcessing = false;
          }
        });
      },
    };

    await LikeButtonInitiator.init({
      likeButtonContainer,
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant,
    });
  }

  _renderRestaurantDetail(restaurant) {
    const {
      name,
      description,
      pictureId,
      city,
      address,
      rating,
      categories,
      menus,
      customerReviews
    } = restaurant;

    this._content.innerHTML = `
     <article class="restaurant-detail">
       <div class="restaurant-detail__header">
         <img 
           src="https://restaurant-api.dicoding.dev/images/medium/${pictureId}"
           alt="${name}"
           crossorigin="anonymous"
         >
         <div class="restaurant-detail__header__info">
           <h2>${name}</h2>
           <div class="restaurant__rating">
             <i class="fas fa-star"></i>
             <span>${rating}</span>
           </div>
         </div>
       </div>

       <div class="restaurant-detail__content">
         <div class="restaurant-detail__info">
           <div class="restaurant__location">
             <i class="fas fa-map-marker-alt"></i>
             <span>${address}, ${city}</span>
           </div>
           <div class="restaurant__categories">
             ${categories.map((category) => `
               <span class="category-tag">${category.name}</span>
             `).join('')}
           </div>
         </div>

         <div class="restaurant-detail__description">
           <h3>About</h3>
           <p>${description}</p>
         </div>

         <div class="restaurant-detail__menu">
           <h3>Menu</h3>
           <div class="restaurant-detail__menu-items">
             <div class="menu-section">
               <h4>Foods</h4>
               <ul>
                 ${menus.foods.map((food) => `
                   <li><i class="fas fa-utensils"></i>${food.name}</li>
                 `).join('')}
               </ul>
             </div>
             <div class="menu-section">
               <h4>Drinks</h4>
               <ul>
                 ${menus.drinks.map((drink) => `
                   <li><i class="fas fa-glass-martini-alt"></i>${drink.name}</li>
                 `).join('')}
               </ul>
             </div>
           </div>
         </div>

         <div class="restaurant-detail__reviews">
           <h3>Customer Reviews</h3>
           <div class="review-list">
             ${customerReviews.map((review) => `
               <div class="review-item">
                 <div class="review-item__header">
                   <span class="review-name">${review.name}</span>
                   <span class="review-date">${review.date}</span>
                 </div>
                 <p class="review-item__content">${review.review}</p>
               </div>
             `).join('')}
           </div>
         </div>
       </div>
       <div id="likeButtonContainer"></div>
     </article>
   `;
  }

  _showLoading() {
    this._content.innerHTML = `
     <div class="loader">
       <div class="loader-spinner"></div>
       <p>Loading restaurants...</p>
     </div>
   `;
  }

  _showError(message) {
    this._content.innerHTML = `
     <div class="error">
       <p>Error: ${message}</p>
       <button onclick="window.location.reload()">Try Again</button>
     </div>
   `;
  }
}

export default App;