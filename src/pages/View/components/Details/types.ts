import { ReactElement } from 'react';

export type DetailsProps = {
  renderCover: ReactElement;
  renderDetails: ReactElement;
  tagline?: string | null;
  overview?: string | null;
  isLoading?: boolean;
};
