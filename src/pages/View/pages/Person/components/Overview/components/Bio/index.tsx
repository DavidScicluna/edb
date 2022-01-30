import { ReactElement } from 'react';

import { useColorMode, useBoolean, VStack, Text, Collapse, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { handleFormatIntoParagraphs } from '../../../../../../../../common/utils';
import Button from '../../../../../../../../components/Clickable/Button';
import Panel from '../../../../../../../../components/Panel';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { BioProps } from './types';

const limit = 44;

const Bio = ({ biography = '', isLoading = true }: BioProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useBoolean();

  const [ref, { height }] = useElementSize();

  console.log(biography);

  return (
    <Panel isFullWidth size='sm'>
      {{
        header: {
          title: 'Biography',
          actions: (
            <ScaleFade in={isLoading || (height || 0) > limit} unmountOnExit>
              <Button isDisabled={isLoading} onClick={() => setIsExpanded.toggle()} size='sm' variant='text'>
                {`Read ${isExpanded ? 'Less' : 'More'}`}
              </Button>
            </ScaleFade>
          )
        },
        body: !isLoading ? (
          <Collapse in={isExpanded} startingHeight={(height || limit) >= limit ? limit : height || limit}>
            <VStack ref={ref} width='100%' alignItems='flex-start' spacing={2}>
              {handleFormatIntoParagraphs(biography)
                .filter((paragraph) => paragraph)
                .map((paragraph, index) => (
                  <Text key={index} align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md'>
                    {paragraph}
                  </Text>
                ))}
            </VStack>
          </Collapse>
        ) : (
          <VStack width='100%' spacing={1}>
            {_.range(0, 3).map((_dummy, index) => (
              <SkeletonText key={index} width='100%' fontSize='xs' isLoaded={false}>
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

export default Bio;
