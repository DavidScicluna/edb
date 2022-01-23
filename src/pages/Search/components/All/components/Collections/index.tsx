import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, AspectRatio, Text, VStack } from '@chakra-ui/react';
import qs from 'query-string';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import Link from '../../../../../../components/Clickable/Link';
import HorizontalGrid from '../../../../../../components/Grid/Horizontal/Default';
import Image from '../../../../../../components/Image';
import Panel from '../../../../../../components/Panel';
import { CollectionsProps } from './types';

const Collections = ({ query, collections = [], total = 0 }: CollectionsProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <HorizontalGrid
      title={`Found ${total} collection${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
      footer={
        total > 20 ? (
          <Link to={{ pathname: '/search/collections', search: qs.stringify({ query }) }} isFullWidth>
            <Button color={color} isFullWidth size={isSm ? 'sm' : 'md'} variant='text'>
              {`View all ${total} collection${total === 0 || total > 1 ? 's' : ''} with "${query}"`}
            </Button>
          </Link>
        ) : undefined
      }
    >
      {/* TODO: Implement a proper Collection component */}
      {collections.map((collection) => (
        <Panel key={collection.id}>
          {{
            body: (
              <VStack width={['185px', '205px', '230px']}>
                <AspectRatio width='100%' minWidth='100%' maxWidth='100%' borderRadius='base' ratio={2 / 3}>
                  <Image
                    alt={`${collection.name} collection poster`}
                    mediaType='movie' // TODO: Remove mediaType prop and add a boringsrc type instead
                    maxWidth='none'
                    height='100%'
                    borderRadius='base'
                    thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w92${collection.poster_path || ''}`}
                    fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${collection.poster_path || ''}`}
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
                  {collection.name}
                </Text>
              </VStack>
            )
          }}
        </Panel>
      ))}
    </HorizontalGrid>
  );
};

export default Collections;
