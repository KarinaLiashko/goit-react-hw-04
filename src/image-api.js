import axios from "axios";

const API_KEY = "05C8W4uTHoRmqXF9zb_xfnyAsGpjS6wA4tBljE26_xo";
const BASE_URL = "https://api.unsplash.com/";

export const fetchedPhotos = async (query, page = 1) => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    params: {
      query,
      page: page,
      per_page: 10,
      client_id: API_KEY,
    },
  });
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};
