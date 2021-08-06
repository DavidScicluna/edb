import { Department } from '../../types';

export type FilmographyProps = {
  departments: Department[];
  name?: string;
  isSuccess?: boolean;
  isLoading?: boolean;
  isError?: boolean;
};
