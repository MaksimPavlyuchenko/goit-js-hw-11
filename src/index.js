import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup, gallery } from './js/markup';
import { fetchGallery } from './js/fetch';

const form = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');

let inputValue = '';
let numberPage = 1;
let allPages = 0;

form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
buttonLoadMore.addEventListener('click', onClick);

function onInput(event) {
  numberPage = 1;
  buttonLoadMore.classList.remove('active');
  gallery.innerHTML = '';
  inputValue = event.target.value.trim();
}

async function onSubmit(event) {
  event.preventDefault();
  const response = await fetchGallery(numberPage, inputValue);
  allPages = Math.ceil(response.data.total / response.data.hits.length);
  const responseArray = response.data.hits;
  if (response.data.total === 0) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notify.success(`Hooray! We found ${response.data.total} images.`);
    createMarkup(responseArray);
    buttonLoadMore.classList.add('active');
  }
}

async function onClick() {
  numberPage += 1;
  const response = await fetchGallery(numberPage, inputValue);
  if (numberPage > allPages) {
    buttonLoadMore.classList.remove('active');
    Notify.failure(`We're sorry, but you've reached the end of search results`);
  } else {
    const responseArray = response.data.hits;
    createMarkup(responseArray);
  }
  lightbox.refresh();
}
