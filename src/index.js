const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import FetchApi from './fetchAPI';
import makeMarkup from './markup';
import Notification from './messages';
import LightboxApi from './lightbox';

const fetchAPI = new FetchApi();
const notification = new Notification();
const lightboxApi = new LightboxApi();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  load: document.querySelector('.load-more'),
};

refs.load.setAttribute('disabled', 'true');

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  if (
    refs.form.elements[0].value.trim() === '' &&
    fetchAPI.searchQuery === ''
  ) {
    notification.emptyInput();
    return;
  }
  if (fetchAPI.searchQuery === refs.form.elements[0].value.trim()) {
    return;
  }
  if (fetchAPI.searchQuery && !refs.form.elements[0].value.trim()) {
    refs.gallery.innerHTML = '';
    fetchAPI.resetSearchQuery();
    toggleBtn('dis');
    return;
  }

  fetchAPI.resetPage();
  searchImgs();
});

async function searchImgs() {
  fetchAPI.searchQuery = refs.form.elements[0].value.trim();

  await fetchAPI
    .fetchImage()
    .then(res => {
      if (res.data.totalHits === 0) {
        notification.noRes();
        fetchAPI.resetSearchQuery;
        return;
      } else {
        toggleBtn('en');
        refs.gallery.innerHTML = ' ';
        refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(res.data.hits));
        lightboxApi.createGallery();
        notification.totalHits(res.data.totalHits);
        if (res.data.totalHits <= 40) {
          toggleBtn('dis');
          notification.theEnd();
          return;
        }
      }
    })
    .catch(err => console.log(err));
}

refs.load.addEventListener('click', async () => {
  fetchAPI.incrementPage();

  await fetchAPI
    .fetchImage()
    .then(res => {
      refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(res.data.hits));
      lightboxApi.resetGallery();
      if (res.data.totalHits <= fetchAPI.page * 40) {
        notification.theEnd();
        toggleBtn('dis');
        return;
      }
    })
    .catch(err => console.log(err));
});

function toggleBtn(action) {
  if (action === 'dis') {
    refs.load.setAttribute('disabled', 'true');
  }
  if (action === 'en') {
    refs.load.removeAttribute('disabled');
  }
}
