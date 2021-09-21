import { ReactElement, useRef, useState, useCallback, useEffect } from 'react';

import {
  useTheme,
  useColorMode,
  useBreakpointValue,
  useBoolean,
  VStack,
  Text,
  Collapse,
  ScaleFade
} from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';

import { useWindowSize, useElementSize } from '../../../../../../common/hooks';
import { handleFormatIntoParagraphs } from '../../../../../../common/utils';
import Card from '../../../../../../components/Card';
import Button from '../../../../../../components/Clickable/Button';
import Rating from '../../../../../../components/Rating';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../theme/types';
import Header from './components/Header';
import { ReviewProps } from './types';

const Review = (props: ReviewProps): ReactElement => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const iconFontsize = useBreakpointValue({
    'base': theme.fontSizes['2xl'],
    'sm': theme.fontSizes['2xl'],
    'md': theme.fontSizes['3xl'],
    'lg': theme.fontSizes['3xl'],
    'xl': theme.fontSizes['3xl'],
    '2xl': theme.fontSizes['3xl']
  });

  const { width: windowWidth } = useWindowSize();
  const { height: elementHeight } = useElementSize(contentRef);

  const { author, author_details, created_at, updated_at, content, isLoading = true } = props;

  const [contentChildrenRefs, setContentChildrenRefs] = useState<(HTMLParagraphElement | null)[]>([]);

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

  const handleCalculateMaxHeight = useCallback((): number => {
    let index = -1;
    let maxHeight = 0;

    if (contentChildrenRefs && contentChildrenRefs.length > 0) {
      contentChildrenRefs.forEach((child) => {
        if (child && maxHeight <= 88) {
          index = index + 1;
          maxHeight = maxHeight + child?.offsetHeight;
        }
      });
    }

    const marginHeight = 16 * index;
    const finalMaxHeight = maxHeight + marginHeight;

    return finalMaxHeight;
  }, [contentChildrenRefs]);

  const maxHeight = handleCalculateMaxHeight();
  const hasFooter = updated_at && !moment(updated_at).isSame(created_at);

  useEffect(() => {
    setIsExpanded.off();
  }, [isLoading]);

  useEffect(() => {
    handleContentRef(contentRef.current);
  }, [windowWidth]);

  useEffect(() => {
    return () => {
      setContentChildrenRefs([]);
      setHeight(undefined);

      setIsExpanded.off();
    };
  }, []);

  return (
    <Card
      box={{ header: { pb: 1.5 }, body: { pt: 1.5, pb: hasFooter ? 1.5 : 0 }, footer: { pt: 1.5 } }}
      isFullWidth
      px={2}
      pt={1.5}
      pb={hasFooter ? 1.5 : 2}>
      {{
        header: {
          title: (
            <Header
              avatar={author_details?.avatar_path || ''}
              name={author_details?.name || author || ''}
              username={author_details?.username || ''}
              date={created_at || ''}
            />
          ),
          actions: author_details?.rating ? (
            <Rating
              rating={{
                rating: author_details?.rating || null,
                count: null
              }}
              isLoading={isLoading}
              iconFontsize={iconFontsize}
              textFontsize={['lg', 'lg', 'xl', 'xl', 'xl', 'xl']}
            />
          ) : undefined
        },
        body: (
          <VStack width='100%' spacing={2}>
            {!isLoading && content ? (
              <Collapse
                in={isExpanded}
                startingHeight={(height || maxHeight) >= maxHeight ? maxHeight : elementHeight || maxHeight}
                style={{ width: '100%' }}>
                <VStack ref={contentRef} width='100%' alignItems='flex-start' spacing={2}>
                  {handleFormatIntoParagraphs(content).map((paragraph, index) => (
                    <Text
                      key={index}
                      ref={_.debounce((ref) => {
                        if (ref && !contentChildrenRefs.includes(ref)) {
                          setContentChildrenRefs([...contentChildrenRefs, ref]);
                        }
                      }, 50)}
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </Text>
                  </SkeletonText>
                ))}
              </VStack>
            )}

            <ScaleFade in={(height || 0) > maxHeight} unmountOnExit style={{ width: '100%' }}>
              <Button
                isFullWidth
                isDisabled={isLoading}
                onClick={() => setIsExpanded.toggle()}
                size='sm'
                variant='text'>
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </ScaleFade>
          </VStack>
        ),
        footer:
          updated_at && !moment(updated_at).isSame(created_at) ? (
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
              {`* Updated on: ${moment(updated_at).format('LLL')}`}
            </Text>
          ) : undefined
      }}
    </Card>
  );
};

export default Review;
