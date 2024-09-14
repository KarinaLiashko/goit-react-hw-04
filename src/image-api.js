import axios from "axios";

export const fetchedPhotos = async (topic, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=05C8W4uTHoRmqXF9zb_xfnyAsGpjS6wA4tBljE26_xo`,
    {
      params: {
        query: topic,
        page: page,
        per_page: 10,
      },
    }
  );
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
};
