const axios = require('axios').default;
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import FetchApi from './fetchAPI';
import makeMarkup from './markup';

const fetchAPI = new FetchApi();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  load: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', callback);
// refs.load.setAttribute('disabled', 'true');

async function callback(e) {
  e.preventDefault();
}

refs.load.addEventListener('click', () => {
  fetchAPI.page += 1;
  fetchAPI
    .fetchImage()
    .then(result => makeMarkup(result))
    .then(res => {
      refs.gallery.insertAdjacentHTML('beforeend', res);
    });
});

async function searchImage() {
  fetchAPI.searchQuery = e.target.elements[0].value;

  await fetchAPI
    .fetchImage()
    .then(result => makeMarkup(result))
    .then(res => {
      refs.gallery.insertAdjacentHTML('beforeend', res);
    });
}
