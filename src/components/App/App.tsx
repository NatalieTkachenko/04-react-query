import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';

import type { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setError(false);
      const data = await fetchMovies(query);

      if (data?.length === 0) {
        toast.error('No movies found for your request.', {
          duration: 1500,
        });
        return;
      } else setMovies(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setModalIsOpen(true);
    setMovie(movie);
    console.log(movie);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
    setMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster />
      {isLoading ? <Loader /> : null}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {isError ? <ErrorMessage /> : null}
      {modalIsOpen && movie ? (
        <MovieModal movie={movie} onClose={handleModalClose} />
      ) : null}
    </>
  );
}

export default App;
