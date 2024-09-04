import axios from 'axios';

export async function getImagesResponse({ query, page }) {
  const cacheKey = page + '--' + query;

  const cachedData = window.localStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await axios.get('https://api.unsplash.com/search/photos', {
    headers: {
      'Accept-Version': 'v1',
      Authorization: `Client-ID 46lYTdwNeZiDkkiLq-TwNjU7FU0zBV1w0I-IXCgDkd0`,
    },
    params: {
      query,
      page,
      per_page: 12,
    },
  });

  window.localStorage.setItem(cacheKey, JSON.stringify(data.data));

  return data.data;
}
