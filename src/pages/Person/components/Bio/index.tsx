import React, { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';

import { useWindowSize, useElementSize } from '../../../../common/hooks';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import SkeletonText from '../../../../components/Skeleton/Text';
import { BioProps } from './types';

const Bio = ({ biography, isLoading = false }: BioProps): ReactElement => {
  const biographyRef = useRef<HTMLDivElement | null>(null);

  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useBoolean();

  const { width: windowWidth } = useWindowSize();
  const { height: elementHeight } = useElementSize(biographyRef);

  const [height, setHeight] = useState<number>();

  const handleBiographyRef = useCallback(
    _.debounce((ref: HTMLDivElement | null) => {
      if (ref) {
        setHeight(ref.offsetHeight);
      } else {
        handleBiographyRef(biographyRef.current);
      }
    }, 250),
    [biographyRef]
  );

  const handleResize = useCallback(() => handleBiographyRef(biographyRef.current), [biographyRef, handleBiographyRef]);

  useEffect(() => {
    handleResize();
  }, [windowWidth]);

  return (
    <Card
      box={{
        header: { pb: 2 },
        body: { pt: 2 }
      }}
      isFullWidth
      p={2}>
      {{
        header: {
          title: 'Biography',
          actions: (
            <ScaleFade in={(height || 0) > 44} unmountOnExit>
              <Button
                isDisabled={isLoading}
                isFullWidth
                onClick={() => setIsExpanded.toggle()}
                size='sm'
                variant='text'>
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </ScaleFade>
          )
        },
        body: !isLoading ? (
          <Collapse startingHeight={(height || 44) >= 44 ? 44 : elementHeight} in={isExpanded}>
            <VStack ref={biographyRef} width='100%' spacing={2}>
              {biography.split('\n'[0]).map((paragraph, index) => (
                <Text
                  key={index}
                  align='left'
                  color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                  fontSize='md'
                  fontWeight='medium'>
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </Collapse>
        ) : (
          <VStack width='100%' spacing={2}>
            {_.range(0, 3).map((_dummy, index) => (
              <SkeletonText key={index} width='100%' offsetY={6} isLoaded={!isLoading}>
                <Text align='left' fontSize='xs'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Text>
              </SkeletonText>
            ))}
          </VStack>
        )
      }}
    </Card>
  );
};

export default Bio;
