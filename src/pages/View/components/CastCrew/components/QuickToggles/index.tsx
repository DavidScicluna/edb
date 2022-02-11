import { ReactElement } from 'react';

import { useColorMode, HStack, Center, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import Button from '../../../../../../components/Clickable/Button';
import Divider from '../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import Department from './components/Department';
import { QuickTogglesProps } from './types';

const QuickToggles = (props: QuickTogglesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [buttonRef, { width, height }] = useElementSize<HTMLButtonElement>();

  const { departments, openedPanels, isLoading = true, onTogglePanel, onToggleAllPanels } = props;

  return (
    <HStack width='100%' justifyContent='stretch' divider={<Divider orientation='vertical' height={`${height}px`} />}>
      <HStack width='100%' justifyContent='stretch'>
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' whiteSpace='nowrap'>
          Jump to:
        </Text>

        <Center width={`calc(100% - ${width}px)`} height='100%'>
          <HorizontalScroll
            renderDivider={({ padding }) => (
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md' px={padding}>
                •
              </Text>
            )}
            isDisabled={isLoading}
          >
            {[...(!isLoading ? departments : _.range(0, 5))].map((department, index) => (
              <Department
                key={index}
                department={typeof department !== 'number' ? department : undefined}
                isLoading={isLoading}
                isDisabled={typeof department === 'number'}
                onTogglePanel={() => onTogglePanel(index)}
              />
            ))}
          </HorizontalScroll>
        </Center>
      </HStack>

      <Button ref={buttonRef} isDisabled={isLoading} onClick={() => onToggleAllPanels()} size='sm' variant='text'>
        {departments.length === openedPanels ? 'Hide all' : 'Show all'}
      </Button>
    </HStack>
  );
};

export default QuickToggles;
