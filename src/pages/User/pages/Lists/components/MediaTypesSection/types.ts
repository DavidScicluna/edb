import { ReactElement } from 'react';

import { PartialMovie } from '../../../../../../common/types/movie';
import { PartialTV } from '../../../../../../common/types/tv';

export type MediaTypesSectionProps = {
  movies: PartialMovie[];
  tv: PartialTV[];
  renderActions?: () => ReactElement;
};
