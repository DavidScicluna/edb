import { ReactElement, useRef } from 'react';

import { useTheme, useColorMode, useBoolean, useOutsideClick, VStack, Fade, Collapse } from '@chakra-ui/react';
import _ from 'lodash';

import Divider from '../../../../components/Divider';
import usePanelStyles from '../../../../components/Panel/styles';
import { Theme } from '../../../../theme/types';
import { FormProps } from './types';

const Form = ({ children }: FormProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isHovering, setIsHovering] = useBoolean();
  const [isFocused, setIsFocused] = useBoolean();

  const style = usePanelStyles(theme, { color: 'gray', isFullWidth: true });

  useOutsideClick({
    ref: inputRef,
    handler: isFocused && !isHovering ? () => setIsFocused.off() : undefined
  });

  return (
    <VStack width='100%' spacing={0.5}>
      <VStack
        width='100%'
        divider={
          <Fade in={isFocused} unmountOnExit style={{ width: '100%' }}>
            <Divider my={2} />
          </Fade>
        }
        onClick={() => setIsFocused.on()}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        spacing={0}
        p={2}
        sx={{ ..._.merge(style.panel.outlined, style[colorMode].outlined) }}
      >
        {children.input}
        <Collapse in={isFocused} unmountOnExit style={{ width: '100%' }}>
          {children.collapsibleContent}
        </Collapse>
      </VStack>
      {children.display}
    </VStack>
  );
};

export default Form;
