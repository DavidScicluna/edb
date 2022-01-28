import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../../common/hooks';
import Button from '../../../../../../../components/Clickable/Button';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../../components/Grid/Horizontal/Default';
import VerticalPoster from '../../../../../../../components/Poster/Vertical';
import { CompaniesProps } from './types';

const Companies = ({ query, companies = [], total = 0 }: CompaniesProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);
  const countries = useSelector((state) => state.options.data.countries);

  return (
    <HorizontalGrid
      title={`Found ${total} ${total === 0 || total > 1 ? 'companies' : 'company'} with "${query}"`}
      footer={
        total > 20 ? (
          <Link to={{ pathname: '/search/movies', search: qs.stringify({ query }) }} isFullWidth>
            <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
              {`View all ${total} ${total === 0 || total > 1 ? 'companies' : 'company'} with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
    >
      {companies.map((company) => (
        <VerticalPoster
          key={company.id}
          width={['185px', '205px', '230px']}
          mediaItem={company ? { ...company } : undefined}
          mediaType='collection'
          image={{
            alt: `${company.name || ''} company poster`,
            src: company.logo_path || '',
            size: {
              thumbnail: 'w45',
              full: 'original'
            }
          }}
          title={company.name || ''}
          subtitle={countries.find((country) => country.iso_3166_1 === company.origin_country)?.english_name || ''}
          isLoading={false}
        />
      ))}
    </HorizontalGrid>
  );
};

export default Companies;
