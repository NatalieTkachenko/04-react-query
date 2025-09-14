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

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResponse> => {
  console.log('I see your request ', query);
  try {
    const response = await instance.get<FetchMoviesResponse>(
      `search/movie?query=${query}&page=${page}`
    );

    return {
      results: response.data.results ?? [],
      total_pages: response.data.total_pages ?? 0,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
