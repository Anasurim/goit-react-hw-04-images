import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export async function fetchImages(searchQuerry, page = 1) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';
  const API_KEY = '34723681-f0b96f726e7635a8a0d729f9b';

  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${searchQuerry}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.data.hits.length === 0) {
      throw new Error(Notify.failure('Images not found'));
    }
    return response.data.hits;
  } catch (error) {
    console.log(error);
  }
}
