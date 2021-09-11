import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../common/hooks';
import utils from '../../../../../../common/utils/utils';
import Button from '../../../../../../components/Clickable/Button';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { QuickTogglesProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(200, 4);

const QuickToggles = (props: QuickTogglesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { departments, isLoading = false, onToggleAccordion } = props;

  return (
    <HStack justifyContent='stretch' spacing={isLoading ? 1 : 0}>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
        whiteSpace='nowrap'
        py={0.75}>
        Jump to:
      </Text>

      <HorizontalScroll width='calc(100% - 61.47px)' spacing='0' isLoading={isLoading}>
        <HStack
          width='100%'
          maxWidth='100%'
          divider={
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='md'
              mx={isLoading ? 0.75 : 0}>
              •
            </Text>
          }>
          {[...(!isLoading ? departments : _.range(0, 4))].map((department, index) => (
            <SkeletonText
              key={index}
              width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
              offsetY={14}
              isLoaded={!isLoading}>
              <Link
                to={`${typeof department !== 'number' ? department.toLowerCase() : ''}-accordion`}
                spy={true}
                smooth={true}
                offset={-81}>
                <Button
                  color={utils.handleReturnColor(color)}
                  onClick={typeof department !== 'number' ? () => onToggleAccordion(department) : undefined}
                  isDisabled={isLoading}
                  size='sm'
                  variant='text'>
                  {typeof department !== 'number' ? department : 'Lorem'}
                </Button>
              </Link>
            </SkeletonText>
          ))}
        </HStack>
      </HorizontalScroll>
    </HStack>
  );
};

export default QuickToggles;
