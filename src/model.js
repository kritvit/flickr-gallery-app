
class SearchResponseItem {
  constructor(item) {

    this.id = item.id;
    this.secret = item.secret;
    this.server = item.server;
    this.title = item.title;

  }
}

class SearchResponse {
  constructor(response = {}) {

    const photos = response.photos || {};

    this.page = photos.page;
    this.pages = photos.pages;
    this.perpage = photos.perpage;
    this.items = photos.photo ? photos.photo.map(item => new SearchResponseItem(item)) : [];
    this.total = photos.total;

  }
}

module.exports = {
  SearchResponse
};
