import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  static async fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.fetchWithTimeout(url, options);
      } catch (error) {
        if (i === retries - 1) throw error;

        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  static async list() {
    try {
      const response = await this.fetchWithRetry(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      console.error('Error while fetching restaurants:', error);
      if (!navigator.onLine) {
        console.log('Offline mode: returning empty restaurants list');
        return [];
      }
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Server is taking too long to respond');
      }
      throw new Error('Failed to fetch restaurants. Please try again later.');
    }
  }

  static async detail(id) {
    try {
      const response = await this.fetchWithRetry(API_ENDPOINT.DETAIL(id));
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
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - Server is taking too long to respond');
      }
      throw new Error('Failed to fetch restaurant detail. Please try again later.');
    }
  }
}

export default RestaurantSource;