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

async function searchImgs() {
  fetchAPI.searchQuery = refs.form.elements[0].value.trim();

  await fetchAPI
    .fetchImage()
    .then(res => {
      console.log(res);
      if (res.data.totalHits === 0) {
        notification.noRes();
        fetchAPI.resetSearchQuery;
        return;
      } else {
        toggleBtn('en');
        refs.gallery.innerHTML = ' ';
        refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(res.data.hits));
        notification.totalHits(res.data.totalHits);
      }
    })
    .catch(err => console.log('smthtns wrong :('));
}

refs.load.addEventListener('click', async () => {
  fetchAPI.incrementPage();

  await fetchAPI
    .fetchImage()
    .then(res => {
      refs.gallery.insertAdjacentHTML('beforeend', makeMarkup(res.data.hits));
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
