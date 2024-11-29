const API_ENDPOINT = {
  LIST: 'https://restaurant-api.dicoding.dev/list',
  DETAIL: (id) => `https://restaurant-api.dicoding.dev/detail/${id}`,
};

class RestaurantSource {
  static async list() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      return error;
    }
  }

  static async detail(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      return error;
    }
  }
}

export default RestaurantSource;