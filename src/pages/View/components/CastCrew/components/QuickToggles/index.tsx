import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnDummyWidths, handleReturnColor } from '../../../../../../common/utils';
import Button from '../../../../../../components/Clickable/Button';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { QuickTogglesProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(200, 4);

const QuickToggles = (props: QuickTogglesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { departments, openedPanels, isLoading = true, onTogglePanel, onToggleAllPanels } = props;

  return (
    <HStack width='100%' maxWidth='100%' justifyContent='stretch' spacing={isLoading ? 1 : 0}>
      <Text
        align='left'
        color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
        fontSize='sm'
        whiteSpace='nowrap'
        py={0.75}
      >
        Jump to:
      </Text>

      <HorizontalScroll
        width={`calc(100% - ${departments.length === openedPanels ? 140.1 : 148.19}px)`}
        spacing='0'
        isLoading={isLoading}
      >
        <HStack
          width='100%'
          maxWidth='100%'
          divider={
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='md'
              mx={isLoading ? 0.75 : 0}
            >
              •
            </Text>
          }
        >
          {[...(!isLoading ? departments : _.range(0, 4))].map((department, index) => (
            <SkeletonText
              key={index}
              width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
              offsetY={6}
              isLoaded={!isLoading}
            >
              <Link
                to={`${
                  typeof department !== 'number'
                    ? `${department.toLowerCase()}${department !== 'cast' ? '-crew' : ''}`
                    : ''
                }`}
                spy
                smooth
                isDynamic={false}
                offset={-82}
                delay={1000}
              >
                <Button
                  color={handleReturnColor(color)}
                  onClick={
                    typeof department !== 'number'
                      ? () => onTogglePanel(departments.findIndex((paramDepartment) => paramDepartment === department))
                      : undefined
                  }
                  isDisabled={isLoading}
                  size='sm'
                  variant='text'
                >
                  {typeof department !== 'number' ? department : 'Lorem'}
                </Button>
              </Link>
            </SkeletonText>
          ))}
        </HStack>
      </HorizontalScroll>

      <Button isDisabled={isLoading} onClick={() => onToggleAllPanels()} size='sm' variant='text'>
        {departments.length === openedPanels ? 'Hide all' : 'Show all'}
      </Button>
    </HStack>
  );
};

export default QuickToggles;
