import { ReactElement } from 'react';

import { useColorMode, HStack, Input as CUIInput, Center, Fade } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { InputKeyboardEvent, InputChangeEvent } from '../../types';
import Actions from './components/Actions';
import SearchTypes from './components/SearchTypes';
import { InputProps } from './types';

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

const Input = (props: InputProps): ReactElement => {
  const { colorMode } = useColorMode();

  const {
    query,
    isDisabled = false,
    searchTypes,
    onInputKeyPress,
    onInputChange,
    onClearQuery,
    onSubmitQuery,
    onClearSearchTypes
  } = props;

  return (
    <HStack width='100%' justifyContent='space-between'>
      <HStack flex={1}>
        <Center
          sx={{ '& svg': { color: colorMode === 'light' ? 'gray.400' : 'gray.500', transition: 'none !important' } }}
        >
          <SearchOutlinedIcon />
        </Center>
        <Fade in={searchTypes.length > 0} unmountOnExit>
          <SearchTypes searchTypes={searchTypes} onClear={onClearSearchTypes} />
        </Fade>
        <CUIInput
          borderRadius='none'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          placeholder={`Try "${placeholder}"`}
          isDisabled={isDisabled}
          onKeyPress={(event: InputKeyboardEvent) => onInputKeyPress(event)}
          onChange={(event: InputChangeEvent) => onInputChange(event)}
          variant='unstyled'
          value={query}
          sx={{ transition: 'none !important' }}
        />
      </HStack>
      <Actions hasQuery={query.length > 0} isDisabled={isDisabled} onClear={onClearQuery} onSubmit={onSubmitQuery} />
    </HStack>
  );
};

export default Input;
