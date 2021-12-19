import { ReactElement } from 'react';

import { useColorMode, VStack, Text, ScaleFade } from '@chakra-ui/react';

import Card from '../../../../components/Card';
import SkeletonText from '../../../../components/Skeleton/Text';
import Label from './components/Label';
import Overview from './components/Overview';
import { DetailsProps } from './types';

const Details = (props: DetailsProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { renderCover, renderDetails, tagline, overview, isLoading = true } = props;

  return (
    <Card isFullWidth p={2}>
      {{
        body: (
          <VStack position='relative' alignItems='stretch' spacing={2}>
            {renderCover}

            <ScaleFade in={(tagline?.length || 0) > 0} unmountOnExit>
              <Label width='100%' label='Tagline'>
                <SkeletonText offsetY={8} isLoaded={!isLoading}>
                  <Text
                    align='left'
                    color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                    fontSize='md'
                    fontStyle='italic'
                  >
                    {tagline}
                  </Text>
                </SkeletonText>
              </Label>
            </ScaleFade>

            <Label width='100%' label='Overview'>
              <Overview overview={overview} isLoading={isLoading} />
            </Label>

            {renderDetails}
          </VStack>
        )
      }}
    </Card>
  );
};

export default Details;
