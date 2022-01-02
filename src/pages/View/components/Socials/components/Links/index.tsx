import { ReactElement } from 'react';

import { useColorMode, useTheme } from '@chakra-ui/react';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, Instagram as InstagramIcon } from '@material-ui/icons';
import _ from 'lodash';

import { Theme } from '../../../../../../theme/types';
import Link from './components/Link';
import { LinksProps } from './types';

const ImdbIcon = (): ReactElement => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      role='img'
      width='24px'
      height='24px'
      preserveAspectRatio='xMidYMid meet'
      viewBox='0 0 448 512'
    >
      <path
        d='M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1.2-.3.3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9c1.7 7.6 1.4 16.3 1.4 24.4c0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9c-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2c21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2.3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7c-6 0-4.9 8.9-4.9 12.7c0 .6-1.1 39.6 1.1 44.7c.8 1.6 2.2 2.4 3.8 2.4c7.8 0 6.2-9 6.2-14.4z'
        fill='currentColor'
      />
    </svg>
  );
};

const Links = (props: LinksProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { socials, name, color, isLoading = true } = props;

  return !isLoading ? (
    <>
      {/* Facebook */}
      {socials?.facebook_id ? (
        <Link
          defaultColor={color}
          color='#4267B2'
          name={name}
          href={`https://www.facebook.com/${socials.facebook_id}`}
          type='Facebook'
          icon={<FacebookIcon />}
        />
      ) : null}

      {/* Twitter */}
      {socials?.twitter_id ? (
        <Link
          defaultColor={color}
          color='#1DA1F2'
          name={name}
          href={`https://www.twitter.com/${socials.twitter_id}`}
          type='Twitter'
          icon={<TwitterIcon />}
        />
      ) : null}

      {/* Instagram */}
      {socials?.instagram_id ? (
        <Link
          defaultColor={color}
          color={colorMode === 'light' ? theme.colors.gray[900] : theme.colors.gray[50]}
          name={name}
          href={`https://www.instagram.com/${socials.instagram_id}`}
          type='Instagram'
          icon={<InstagramIcon />}
        />
      ) : null}

      {/* IMDB */}
      {socials?.imdb_id ? (
        <Link
          defaultColor={color}
          color='#F5C518'
          name={name}
          href={`https://www.imdb.com/name/${socials.imdb_id}`}
          type='IMDB'
          icon={<ImdbIcon />}
        />
      ) : null}
    </>
  ) : (
    <>
      {_.range(0, 4).map((_dummy, index) => (
        <Link key={index} isDisabled />
      ))}
    </>
  );
};

export default Links;
