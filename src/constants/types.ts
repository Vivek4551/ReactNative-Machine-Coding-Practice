export interface MoviesData {
  data: Movies[];
}

export interface Movies {
  id: number;
  title: string;
  poster: string;
  year: string;
  country: string;
  imdb_rating: string;
  genres: string[];
  images: string[];
}

export interface ToDoList {
  data: TODO[];
}

export interface TODO {
    id: number;
  text: string;
}
