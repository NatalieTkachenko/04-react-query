import type { Movie } from '../../types/movie.ts';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[] | null;
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={styles.grid}>
      {Array.isArray(movies) &&
        movies &&
        movies.map(movie => {
          return (
            <li key={movie.id}>
              <div className={styles.card}>
                <img
                  className={styles.image}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : '/placeholder.jpg'
                  }
                  alt={movie.title}
                  loading="lazy"
                  onClick={() => onSelect(movie)}
                />
                <h2 className={styles.title}>{movie.title}</h2>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
