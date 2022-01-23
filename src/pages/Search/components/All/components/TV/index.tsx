import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../common/hooks';
import { PartialTV } from '../../../../../../common/types/tv';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal/Default';
import VerticalTVShowPoster from '../../../../../TV/components/Poster/Vertical';
import { TVProps } from './types';

const TV = ({ query, shows = [], total = 0 }: TVProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={`Found ${total} TV show${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
      footer={
        total > 20 ? (
          <Link to={{ pathname: '/search/tv', search: qs.stringify({ query }) }} isFullWidth>
            <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
              {`View all ${total} TV show${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
    >
      {shows.map((show: PartialTV) => (
        <VerticalTVShowPoster key={show.id} width={['185px', '205px', '230px']} show={show} isLoading={false} />
      ))}
    </HorizontalGrid>
  );
};

export default TV;
