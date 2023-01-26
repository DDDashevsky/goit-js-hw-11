export default function makeMarkup(arr) {
  const markup = arr
    .map(
      item => `
      <a href="${item.largeImageURL}">
        <div class="photo-card">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
             <div class="info">
                 <p class="info-item">
                    <b><span>Likes</span>${item.likes}</b>
                </p>
                <p class="info-item">
                    <b><span>Views</span>${item.views}</b>
                </p>
                <p class="info-item">
                <b><span>Comments</span>${item.comments}</b>
                </p>
                <p class="info-item">
                    <b><span>Downloads</span> ${item.downloads}</b>
                </p>
            </div>
        </div>
     </a>
    `
    )
    .join('');
  return markup;
}
