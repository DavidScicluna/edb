import { ReactElement } from 'react';

import { FullMovie } from '../../../../../../../../../../../common/types/movie';

export type List = {
  label: string;
  children?: ReactElement;
};

export type InfoProps = {
  budget?: FullMovie['budget'];
  revenue?: FullMovie['revenue'];
  originalLanguage?: FullMovie['original_language'];
  languages?: FullMovie['spoken_languages'];
  isLoading?: boolean;
};
