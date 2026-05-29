import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in the field!',
      position: 'topRight',
    });

    return;
  }

  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const images = await getImagesByQuery(currentQuery, currentPage);

    if (images.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      return;
    }

    createGallery(images.hits);

    if (images.totalHits <= 15) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();

  currentPage += 1;

  try {
    const images = await getImagesByQuery(currentQuery, currentPage);

    createGallery(images.hits);

    const totalPages = Math.ceil(images.totalHits / 15);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const card = document.querySelector('.gallery-item');

    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
