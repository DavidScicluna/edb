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

  const [textRef, { width: textWidth }] = useElementSize<HTMLParagraphElement>();
  const [buttonRef, { width: buttonWidth, height: buttonHeight }] = useElementSize<HTMLButtonElement>();

  const { departments, openedPanels, isLoading = true, onTogglePanel, onToggleAllPanels } = props;

  return (
    <HStack
      width='100%'
      justifyContent='stretch'
      divider={<Divider orientation='vertical' height={`${buttonHeight}px`} />}
      spacing={2}
    >
      {/* Width is calculated by the width of the hide/show button component and the 32 pixels, 
      2 pixels of the divider in spacing between the button & container below */}
      <HStack width={`calc(100% - ${buttonWidth + 34}px)`} justifyContent='stretch'>
        <Text
          ref={textRef}
          align='left'
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          fontSize='sm'
          whiteSpace='nowrap'
        >
          Jump to:
        </Text>

        {/* Width is calculated by the width of the text component above and the 8 pixels in spacing between the text & scroll */}
        <Center width={`calc(100% - ${textWidth + 8}px)`} height='100%'>
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
