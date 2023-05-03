import axios from 'axios';

const API_KEY = '35821375-3a14f4eca52135baa3bb1fa80';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchGallery(numberPage, inputValue) {
  const parameters = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: numberPage,
    per_page: 40,
  });
  const responseArray = await axios.get(`${BASE_URL}?${parameters}`);
  return responseArray;
}
export { fetchGallery };
