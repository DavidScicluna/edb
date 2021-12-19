import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useWindowSize, useElementSize } from 'usehooks-ts';

import { handleFormatIntoParagraphs } from '../../../../common/utils';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import SkeletonText from '../../../../components/Skeleton/Text';
import { BioProps } from './types';

const Bio = ({ biography, isLoading = false }: BioProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useBoolean();

  const { width: windowWidth } = useWindowSize();
  const [biographyRef, { height: elementHeight }] = useElementSize();

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

  useEffect(() => {
    handleBiographyRef(biographyRef.current);
  }, [windowWidth]);

  return (
    <Card
      box={{
        header: { pb: 1.5 },
        body: { pt: 1.5 }
      }}
      isFullWidth
      px={2}
      pt={1.5}
      pb={2}>
      {{
        header: {
          title: 'Biography',
          actions: (
            <ScaleFade in={(height || 0) > 44} unmountOnExit>
              <Button isDisabled={isLoading} onClick={() => setIsExpanded.toggle()} size='sm' variant='text'>
                {`Read ${isExpanded ? 'Less' : 'More'}`}
              </Button>
            </ScaleFade>
          )
        },
        body: !isLoading ? (
          <Collapse in={isExpanded} startingHeight={(height || 44) >= 44 ? 44 : elementHeight || 44}>
            <VStack ref={biographyRef} width='100%' alignItems='flex-start' spacing={2}>
              {handleFormatIntoParagraphs(biography)
                .filter((paragraph) => paragraph)
                .map((paragraph, index) => (
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
          <VStack width='100%' spacing={1}>
            {_.range(0, 3).map((_dummy, index) => (
              <SkeletonText key={index} width='100%' offsetY={6} isLoaded={!isLoading}>
                <Text align='left' fontSize='xs'>
                  Lorem ipsum dolor sit amet
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
