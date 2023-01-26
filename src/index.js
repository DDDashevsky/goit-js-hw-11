const axios = require('axios').default;
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import FetchApi from './fetchAPI';
import makeMarkup from './markup';
import Notification from './messages';

const fetchAPI = new FetchApi();
const notification = new Notification();

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  load: document.querySelector('.load-more'),
};
refs.load.setAttribute('disabled', 'true');

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  if (refs.form.elements[0].value.trim() === '') {
    notification.emptyInput();
    return;
  }

  fetchAPI.resetPage();
  searchImgs();
});

refs.load.addEventListener('click', () => {
  fetchAPI.page += 1;

  searchImgs();
});

async function searchImgs() {
  fetchAPI.searchQuery = refs.form.elements[0].value.trim();

  await fetchAPI
    .fetchImage()
    .then(res => {
      if (res.length === 0) {
        notification.noRes();
        fetchAPI.resetSearchQuery;
        return;
      }
      refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(res));
    })
    .catch(err => console.log(err));
}
