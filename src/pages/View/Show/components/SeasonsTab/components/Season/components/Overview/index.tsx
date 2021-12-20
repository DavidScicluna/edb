import { ReactElement } from 'react';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { handleFormatIntoParagraphs } from '../../../../../../../../../common/utils';
import Button from '../../../../../../../../../components/Clickable/Button';
import Panel from '../../../../../../../../../components/Panel';
import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import { OverviewProps } from './types';

const Overview = ({ overview, isLoading = false }: OverviewProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useBoolean();

  // const { width } = useWindowSize();
  const [overviewRef, { height }] = useElementSize();

  // const [height, setHeight] = useState<number>();

  // const handleOverviewRef = useCallback(
  //   _.debounce((ref: unknown | null) => {
  //     if (ref) {
  //       setHeight(ref.offsetHeight);
  //     } else {
  //       handleOverviewRef(overviewRef);
  //     }
  //   }, 250),
  //   [overviewRef]
  // );

  // useEffect(() => {
  //   handleOverviewRef(overviewRef);
  // }, [windowWidth]);

  return (
    <Panel isFullWidth size='sm'>
      {{
        header: {
          title: 'Overview',
          actions: (
            <ScaleFade in={(height || 0) > 44} unmountOnExit>
              <Button isDisabled={isLoading} onClick={() => setIsExpanded.toggle()} size='sm' variant='text'>
                {`Read ${isExpanded ? 'Less' : 'More'}`}
              </Button>
            </ScaleFade>
          )
        },
        body: !isLoading ? (
          <Collapse in={isExpanded} startingHeight={(height || 44) >= 44 ? 44 : height || 44}>
            <VStack ref={overviewRef} width='100%' alignItems='flex-start' spacing={2}>
              {handleFormatIntoParagraphs(overview)
                .filter((paragraph: string) => paragraph)
                .map((paragraph: string, index: number) => (
                  <Text
                    key={index}
                    align='left'
                    color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                    fontSize='md'
                    fontWeight='medium'
                  >
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
    </Panel>
  );
};

export default Overview;
