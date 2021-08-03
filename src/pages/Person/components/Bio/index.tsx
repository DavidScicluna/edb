import React, { ReactElement } from 'react';

import { useColorMode, useBoolean, VStack, HStack, Text, Collapse } from '@chakra-ui/react';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import Card from '../../../../components/Card';
import Button from '../../../../components/Clickable/Button';
import SkeletonText from '../../../../components/Skeleton/Text';
import { BioProps } from './types';

const Bio = ({ biography, isLoading }: BioProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isExpanded, setIsExpanded] = useBoolean();

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Card minWidth='100%' p={2}>
      <VStack width='100%' spacing={1}>
        <HStack
          width='100%'
          justifyContent='space-between'
          borderBottom='solid2'
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          spacing={0}
          pb={2}>
          <Text
            width='100%'
            align='left'
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
            fontSize='md'
            fontWeight='medium'>
            Biography
          </Text>
        </HStack>

        <Collapse startingHeight={44} in={isExpanded}>
          <SkeletonText isLoaded={!isLoading} noOfLines={5}>
            <VStack spacing={2}>
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
          </SkeletonText>
        </Collapse>

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
