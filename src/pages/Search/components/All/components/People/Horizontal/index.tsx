import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import qs from 'query-string';


import { HorizontalSearchPeopleProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import { PartialPerson } from '../../../../../../../common/types/person';
import Button from '../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import VerticalPersonPoster from '../../../../../../People/components/Poster/Vertical';

const HorizontalSearchPeople = ({ query, people = [], total = 0 }: HorizontalSearchPeopleProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={`Found ${total || 0} ${total === 0 || total > 1 ? 'people' : 'person'} with "${query}"`}
      footer={
        total > 20 ? (
          <Link to={{ pathname: '/search', search: qs.stringify({ query }), hash: 'person' }} isFullWidth>
            <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
              {`View all ${total || 0} ${total === 0 || total > 1 ? 'people' : 'person'} with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
    >
      {people.map((person: PartialPerson) => (
        <VerticalPersonPoster key={person.id} width={['185px', '205px', '230px']} person={person} isLoading={false} />
      ))}
    </HorizontalGrid>
  );
};

export default HorizontalSearchPeople;
