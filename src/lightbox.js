import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class LightboxApi {
  constructor() {
    this.gallery;
  }
  createGallery() {
    return (this.gallery = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      animationSpeed: 150,
    }));
  }

  resetGallery() {
    this.gallery.refresh();
  }
}
