import { ReactElement } from 'react';

export type BackgroundProps = {
  children: {
    poster: ReactElement;
    socials: ReactElement;
  };
  alt: string;
  size: string;
};
