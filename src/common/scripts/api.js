
import { sanitize } from '@scripts/helpers';
import { getCache, setCache } from '@scripts/cache';

const clean = input => typeof input === 'string' ? sanitize(input).toLowerCase() : '';

class Item {
  constructor(item) {

    this.id = item.id;

    this.secret = item.secret;
    this.server = item.server;

    // https://www.flickr.com/services/api/misc.urls.html
    this.src = {
      small: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`, // 400
      large: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg` // 1024
    };

    this.url = {
      profile: `https://www.flickr.com/people/${item.owner}/`,
      photo: `https://www.flickr.com/photos/${item.owner}/${item.id}`
    };

    this.alt = item.title;
    this.title = item.title;

  }
}

class Photos {
  constructor(photos) {

    this.page = photos.page;
    this.pages = photos.pages;
    this.perpage = photos.perpage;
    this.items = photos.items.map(item => new Item(item));
    this.total = photos.total;

  }
}

function cachePhotos(cache, photos) {

  if (cache && cache.photo && photos.photo) {

    photos.photo = cache.photo.concat(photos.photo);

  }

  return photos;

}

export async function searchPhotos(query, page = 1, take= 20) {

  // Remove html and make query lover case
  const cleanQuery = clean(query);
  // Create id for localStorage
  const cacheKey = `FGA__SEARCH_${cleanQuery.split(' ').join('-')}-${page}`;
  // Get cache from localStorage
  const cache = getCache(cacheKey);

  if (cache) {

    // If cache. Return formatted response.
    return new Photos(cache);

  } else {

    try {

      // Fetch data from API
      const url = encodeURI(`/api/search/${cleanQuery}/${page}/${take}`);
      const response = await fetch(url);

      if (200 === response.status) {

        // Parse response into json format
        const parsedResponse = await response.json();

        // Model data for returning to component
        const returnData = new Photos(parsedResponse);

        // Model data for saving in localStorage
        const saveData = cachePhotos(cache, parsedResponse);

        // Save in loacalStorage
        setCache(cacheKey, saveData);

        // Return to component
        return returnData;

      } else if (503 === response.status) {

        // Return timeout so app can display a 
        return {
          status: 'timeout'
        };

      }

    } catch (message) {

      // Throw error for all other errors that are not handled in "try"
      console.error(message);

    }

  }

}
