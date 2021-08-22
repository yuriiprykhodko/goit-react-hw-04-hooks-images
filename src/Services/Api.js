import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '21893173-2e6903a6fb362f8aa14208207';

const fatchPictures = ({ request = "", currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `/?key=${API_KEY}&q=${request}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then((response) => response.data.hits);
};

export default { fatchPictures };
