const gallery = document.querySelector('.gallery');
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function createMarkup(responseArray) {
  const markup = responseArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a href=${largeImageURL}>
        <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width=340 height=250/>
       
    <div class="info">

      <p class="info-item">
        <b>Likes </b>
       <br>${likes}<br/>
      </p>
      <p class="info-item">
        <b>Views</b>
        <br>${views}<br/>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <br>${comments}<br/>
      </p>
      <p class="info-item">
        <b>Downloads</b>
       <br>${downloads}<br/>
      </p>
    </div>
    </div>
    </a>
  `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a');
}
export { createMarkup, gallery };
