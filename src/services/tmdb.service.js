import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async (page) => {
  const response = await axios.get(
    `${TMDB_BASE_URL}/movie/popular`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page
      }
    }
  );

  return response.data.results;
};
