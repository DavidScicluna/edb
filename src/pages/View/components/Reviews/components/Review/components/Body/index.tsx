import { ReactElement, useState, useCallback, useEffect } from 'react';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useWindowSize, useElementSize } from 'usehooks-ts';

import { handleFormatIntoParagraphs } from '../../../../../../../../common/utils';
import Button from '../../../../../../../../components/Clickable/Button';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { BodyProps } from './types';

const Body = (props: BodyProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { width: windowWidth } = useWindowSize();
  const [contentRef, { height: elementHeight }] = useElementSize();

  const { content, isLoading = true } = props;

  const [isExpanded, setIsExpanded] = useBoolean();

  const [height, setHeight] = useState<number>();

  const handleContentRef = useCallback(
    _.debounce((ref: HTMLDivElement | null) => {
      if (ref) {
        setHeight(ref.offsetHeight);
      } else {
        handleContentRef(contentRef.current);
      }
    }, 250),
    [contentRef]
  );

  useEffect(() => {
    setIsExpanded.off();
  }, [isLoading]);

  useEffect(() => {
    handleContentRef(contentRef.current);
  }, [windowWidth]);

  useEffect(() => {
    return () => {
      setHeight(undefined);

      setIsExpanded.off();
    };
  }, []);

  return (
    <VStack width='100%' maxWidth='100%' spacing={2}>
      {!isLoading && content ? (
        <Collapse
          in={isExpanded}
          startingHeight={(height || 176) >= 176 ? 176 : elementHeight || 176}
          style={{ width: 'inherit', maxWidth: 'inherit' }}>
          <VStack ref={contentRef} width='100%' maxWidth='100%' alignItems='flex-start' spacing={2}>
            {handleFormatIntoParagraphs(content)
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
      )}

      <ScaleFade in={(height || 0) > 176} unmountOnExit style={{ width: '100%' }}>
        <Button isFullWidth isDisabled={isLoading} onClick={() => setIsExpanded.toggle()} size='sm' variant='text'>
          {`Read ${isExpanded ? 'Less' : 'More'}`}
        </Button>
      </ScaleFade>
    </VStack>
  );
};

export default Body;
