import { Genre, Certifications, Country, Language, Job } from '../../../common/types';

export type OptionsGenre = {
  movie: Genre[];
  tv: Genre[];
};

export type OptionsCertifications = {
  movie?: Certifications;
  tv?: Certifications;
};

export type StateProps = {
  data: {
    countries: Country[];
    languages: Language[];
    jobs: Job[];
    genres: OptionsGenre;
    certifications: OptionsCertifications;
  };
};
