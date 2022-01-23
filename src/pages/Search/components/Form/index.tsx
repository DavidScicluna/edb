import { ReactElement, useRef } from 'react';

import {
  useTheme,
  useColorMode,
  useBoolean,
  useOutsideClick,
  VStack,
  HStack,
  Input,
  Fade,
  Collapse
} from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import Divider from '../../../../components/Divider';
import usePanelStyles from '../../../../components/Panel/styles';
import { Theme } from '../../../../theme/types';
import { InputKeyboardEvent, InputChangeEvent } from '../../types';
import Actions from './components/Actions';
import SearchTypes from './components/SearchTypes';
import { FormProps } from './types';

const placeholders = [
  'The Godfather',
  'Seinfeld',
  'The Dark Knight',
  'I Love Lucy',
  'Pulp Fiction',
  'The Sopranos',
  'Fight Club',
  'The Simpsons',
  'The Matrix',
  'Friends',
  'GoodFellas',
  'South Park',
  'Hamilton',
  'Family Guy',
  'Star Wars',
  'Breaking Bad',
  'Parasite',
  'Game of Thrones',
  'Gladiator',
  'Star Trek'
];
const placeholder = _.sample(placeholders);

const Form = (props: FormProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    children,
    query,
    isDisabled = false,
    searchTypes,
    onInputKeyPress,
    onInputChange,
    onClearQuery,
    onSubmitQuery,
    onClearSearchTypes
  } = props;

  const [isHovering, setIsHovering] = useBoolean();
  const [isFocused, setIsFocused] = useBoolean();

  const style = usePanelStyles(theme, { color: 'gray', isFullWidth: true });

  const handleFocusOnInput = (): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useOutsideClick({
    ref: inputRef,
    handler: !isHovering ? () => setIsFocused.off() : undefined
  });

  return (
    <VStack
      width='100%'
      divider={
        <Fade in={isFocused} unmountOnExit style={{ width: '100%' }}>
          <Divider my={2} />
        </Fade>
      }
      onClick={() => handleFocusOnInput()}
      onMouseEnter={() => setIsHovering.on()}
      onMouseLeave={() => setIsHovering.off()}
      spacing={0}
      p={2}
      sx={{ ..._.merge(style.panel.outlined, style[colorMode].outlined) }}
    >
      <HStack width='100%' justifyContent='space-between'>
        <HStack flex={1}>
          <SearchOutlinedIcon style={{ color: colorMode === 'light' ? 'gray.400' : 'gray.500', transition: 'none' }} />
          <Fade in={searchTypes.length > 0} unmountOnExit>
            <SearchTypes searchTypes={searchTypes} onClear={onClearSearchTypes} />
          </Fade>
          <Input
            ref={inputRef}
            borderRadius='none'
            placeholder={`Try "${placeholder}"`}
            isDisabled={isDisabled}
            onFocus={() => setIsFocused.on()}
            onKeyPress={(event: InputKeyboardEvent) => onInputKeyPress(event)}
            onChange={(event: InputChangeEvent) => onInputChange(event)}
            variant='unstyled'
            value={query}
          />
        </HStack>
        <Actions hasQuery={query.length > 0} isDisabled={isDisabled} onClear={onClearQuery} onSubmit={onSubmitQuery} />
      </HStack>
      <Collapse in={isFocused} unmountOnExit style={{ width: '100%' }}>
        {children}
      </Collapse>
    </VStack>
  );
};

export default Form;
