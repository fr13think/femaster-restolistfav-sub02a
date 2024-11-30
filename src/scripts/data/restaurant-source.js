import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async list() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error while fetching restaurants:', error);
      // Jika offline dan tidak ada cache, kembalikan data minimal
      if (!navigator.onLine) {
        return [];
      }
      throw new Error('Failed to fetch restaurants');
    }
  }

  static async detail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error while fetching restaurant detail for id ${id}:`, error);
      if (!navigator.onLine) {
        throw new Error('You are offline. Please check your connection.');
      }
      throw new Error('Failed to fetch restaurant detail');
    }
  }
}

export default RestaurantSource;