import { ReactElement } from 'react';

import { useColorMode, HStack, Input, Fade } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

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
        <SearchOutlinedIcon style={{ color: colorMode === 'light' ? 'gray.400' : 'gray.500', transition: 'none' }} />
        <Fade in={searchTypes.length > 0} unmountOnExit>
          <SearchTypes searchTypes={searchTypes} onClear={onClearSearchTypes} />
        </Fade>
        <Input
          borderRadius='none'
          placeholder={`Try "${placeholder}"`}
          isDisabled={isDisabled}
          onKeyPress={(event: InputKeyboardEvent) => onInputKeyPress(event)}
          onChange={(event: InputChangeEvent) => onInputChange(event)}
          variant='unstyled'
          value={query}
        />
      </HStack>
      <Actions hasQuery={query.length > 0} isDisabled={isDisabled} onClear={onClearQuery} onSubmit={onSubmitQuery} />
    </HStack>
  );
};

export default Form;
