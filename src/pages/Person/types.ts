import { CastMovieCredit, CrewMovieCredit, CastTVCredit, CrewTVCredit } from '../../common/types/person';

export type Department = {
  label: string;
  credits: {
    cast?: {
      movie?: CastMovieCredit[];
      tv?: CastTVCredit[];
    };
    crew?: {
      movie?: CrewMovieCredit[];
      tv?: CrewTVCredit[];
    };
  };
};

// export type KnownFor = (CastMovieCredit | CastTVCredit | CrewMovieCredit | CrewTVCredit)[];
export type KnownFor = any[];
