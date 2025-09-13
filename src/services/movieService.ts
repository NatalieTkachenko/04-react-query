import axios from 'axios';
import type { Movie } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_API_Read_Access_Token;

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {},
});

interface FetchMoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  console.log('I see your request ', query);
  try {
    const response = await instance.get<FetchMoviesResponse>(
      `search/movie?query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
