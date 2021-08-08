import React, { ReactElement } from 'react';

import { useColorMode, useBoolean, VStack, HStack, Text, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import SkeletonText from '../../../../components/Skeleton/Text';
import { BioProps } from './types';

const Bio = ({ biography, isLoading = false }: BioProps): ReactElement => {
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const [isExpanded, setIsExpanded] = useBoolean();

  return (
    <Card minWidth='100%' px={2} pt={1.5} pb={2}>
      <VStack width='100%' spacing={2}>
        <HStack
          width='100%'
          justifyContent='space-between'
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          spacing={0}
          pb={1.5}>
          <Text
            width='100%'
            align='left'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontSize='md'
            fontWeight='medium'>
            Biography
          </Text>
        </HStack>

        {!isLoading ? (
          <Collapse startingHeight={44} in={isExpanded}>
            <VStack width='100%' spacing={2}>
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
              <SkeletonText key={index} width='100%' isLoaded={!isLoading}>
                <Text align='left' fontSize='xs'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </Text>
              </SkeletonText>
            ))}
          </VStack>
        )}

        <Button
          color={utils.handleReturnColor(color)}
          isDisabled={isLoading}
          isFullWidth
          onClick={() => setIsExpanded.toggle()}
          size='sm'
          variant='text'>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </VStack>
    </Card>
  );
};

export default Bio;
