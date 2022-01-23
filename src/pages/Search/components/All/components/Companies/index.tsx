import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, AspectRatio, Text, VStack } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal/Default';
import Image from '../../../../../../components/Image';
import Panel from '../../../../../../components/Panel';
import { CompaniesProps } from './types';

const Companies = ({ query, companies = [], total = 0 }: CompaniesProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

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
      {/* TODO: Implement a proper Company component */}
      {companies.map((company) => (
        <Panel key={company.id}>
          {{
            body: (
              <VStack width={['185px', '205px', '230px']}>
                <AspectRatio width='100%' minWidth='100%' maxWidth='100%' borderRadius='base' ratio={2 / 3}>
                  <Image
                    alt={`${company.name} company poster`}
                    mediaType='movie' // TODO: Remove mediaType prop and add a boringsrc type instead
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w45${company.logo_path || ''}`}
                    fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${company.logo_path || ''}`}
                  />
                </AspectRatio>
                <Text
                  // ref={handleIsTruncated}
                  align='left'
                  fontSize='sm'
                  fontWeight='semibold'
                  color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                  isTruncated
                  overflow='hidden'
                  whiteSpace='nowrap'
                >
                  {company.name}
                </Text>
              </VStack>
            )
          }}
        </Panel>
      ))}
    </HorizontalGrid>
  );
};

export default Companies;
