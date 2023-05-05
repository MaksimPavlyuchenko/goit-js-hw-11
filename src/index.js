import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './js/markup';
import { fetchGallery } from './js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const buttonLoadMore = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

let inputValue = '';
let numberPage = 1;
let allPages = 0;

form.addEventListener('change', onInput);
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
  if (inputValue === '') {
    return;
  }
  const response = await fetchGallery(numberPage, inputValue);
  allPages = Math.ceil(response.data.total / response.data.hits.length);
  console.log(allPages);
  console.log(response);
  const responseArray = response.data.hits;

  if (response.data.total === 0) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
  } else {
    Notify.success(`Hooray! We found ${response.data.total} images.`);
    buttonLoadMore.classList.add('active');
    createMarkup(responseArray);
    lightbox.refresh();
  }
}

async function onClick(event) {
  numberPage += 1;
  const response = await fetchGallery(numberPage, inputValue);

  if (numberPage > allPages) {
    buttonLoadMore.classList.remove('active');
    Notify.failure(`We're sorry, but you've reached the end of search results`);
  } else {
    const responseArray = response.data.hits;
    createMarkup(responseArray);
    if (gallery.childElementCount % 40) {
      buttonLoadMore.classList.remove('active');
      Notify.failure(
        `We're sorry, but you've reached the end of search results`
      );
    }
  }
  lightbox.refresh();
}
export { gallery };
