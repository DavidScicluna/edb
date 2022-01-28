export type Country = {
  iso_3166_1?: string;
  english_name?: string;
};

export type Language = {
  iso_639_1?: string;
  english_name?: string;
  name?: string;
};

export type Job = {
  department?: string;
  jobs?: string[];
};

export type Genres = {
  genres?: Genre[];
};

export type Genre = {
  id?: number;
  name?: string;
};

type OptionsGenre = {
  movie: Genre[];
  tv: Genre[];
};

export type StateProps = {
  data: {
    countries: Country[];
    languages: Language[];
    jobs: Job[];
    genres: OptionsGenre;
  };
};
