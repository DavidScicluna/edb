import { Genre } from '../../../common/types';

export type StateProps = {
  data: {
    data: {
      genres: {
        movie: Genre[];
        tv: Genre[];
      };
    };
    hasDownloaded: boolean;
  };
};
