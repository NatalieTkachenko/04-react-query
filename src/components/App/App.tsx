import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../../services/movieService';

import type { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import style from './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  // const [movies, setMovies] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isError, setError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, isError, isFetchedAfterMount } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isFetchedAfterMount && data?.results.length === 0) {
      toast.error('No movies found for your request.', {
        duration: 1500,
      });
    }
  }, [data, isFetchedAfterMount]);

  const handleSubmit = (query: string) => {
    setQuery(query);
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
      {data?.results ? (
        <ReactPaginate
          pageCount={data?.total_pages ?? 0}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={style.pagination}
          activeClassName={style.active}
          nextLabel="→"
          previousLabel="←"
        />
      ) : null}

      {isLoading ? <Loader /> : null}
      {(data?.results?.length ?? 0) > 0 && (
        <MovieGrid movies={data!.results} onSelect={handleSelect} />
      )}
      {isError ? <ErrorMessage /> : null}
      {modalIsOpen && movie ? (
        <MovieModal movie={movie} onClose={handleModalClose} />
      ) : null}
    </>
  );
}

export default App;
