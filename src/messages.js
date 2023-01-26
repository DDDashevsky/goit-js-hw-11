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
}
