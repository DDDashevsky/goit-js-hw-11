import Notiflix from 'notiflix';

export default class Notification {
  noRes() {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  emptyInput() {
    Notiflix.Notify.warning('Type something');
  }

  theEnd() {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }

  totalHits(value) {
    Notiflix.Notify.info(`Hooray! We found ${value} images.`);
  }
}
