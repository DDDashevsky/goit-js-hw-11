const axios = require('axios').default;

export default class FetchApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImage() {
    const KEY = '16191632-24b25e12a8d3e8a37fcf33b11';
    const BASE_URL = 'https://pixabay.com/api/';

    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${this.searchQuery.toLocaleLowerCase()}&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=40`
    );

    return response.data.hits;
  }
}
