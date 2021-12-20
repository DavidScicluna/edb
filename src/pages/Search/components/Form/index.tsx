import { ReactElement, useRef } from 'react';

import {
  useBoolean,
  useColorMode,
  useOutsideClick,
  VStack,
  Box,
  HStack,
  Icon,
  Input,
  Collapse,
  ScaleFade
} from '@chakra-ui/react';
import sort from 'array-sort';
import _ from 'lodash';
import moment from 'moment';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import Error from '../../../../components/Error';
import { setRecentSearches } from '../../../../store/slices/User';
import { InputKeyboardEvent, InputChangeEvent } from '../../types';
import Actions from './components/Actions';
import Display from './components/Display';
import List from './components/List';
import Row from './components/Row';
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
const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

const Form = (props: FormProps): ReactElement => {
  const { colorMode } = useColorMode();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const {
    keywords,
    query,
    mediaType,
    submittedQuery,
    hasUnsubmitted = false,
    totalResults,
    isInputDisabled = false,
    onInputKeyPress,
    onInputChange,
    onSubmitQuery,
    onClearQuery
  } = props;

  const [isFormLocked, setIsFormLocked] = useBoolean();
  const [isHoveringLock, setIsHoveringLock] = useBoolean();

  const [isHoveringForm, setIsHoveringForm] = useBoolean();
  const [isFormFocused, setIsFormFocused] = useBoolean();

  const handleFocusOnInput = (): void => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOnHoverLock = (bool: boolean) => {
    if (bool) {
      setIsHoveringLock.on();
    } else {
      setIsHoveringLock.off();
    }
  };

  useOutsideClick({
    ref: inputRef,
    handler: !isHoveringLock && !isFormLocked && !isHoveringForm ? () => setIsFormFocused.off() : undefined
  });

  return (
    <VStack width='100%' spacing={1} p={2}>
      <Box
        width='100%'
        cursor='text'
        border='solid2'
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        borderRadius='lg'
        px={2}
        py={1.5}
        onClick={() => handleFocusOnInput()}
        onMouseEnter={!keywords.isFetching || !keywords.isLoading ? () => setIsHoveringForm.on() : undefined}
        onMouseLeave={!keywords.isFetching || !keywords.isLoading ? () => setIsHoveringForm.off() : undefined}
      >
        <HStack
          borderBottom={isFormFocused || isFormLocked ? 'solid2' : 'none'}
          borderBottomColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
          pb={isFormFocused || isFormLocked ? 1.5 : 0}
          mb={isFormFocused || isFormLocked ? 2 : 0}
        >
          <Icon as={SearchIcon} color={colorMode === 'light' ? 'gray.400' : 'gray.500'} />
          <Input
            ref={inputRef}
            borderRadius='none'
            placeholder={`Try "${placeholder}"`}
            isDisabled={isInputDisabled}
            onFocus={!isHoveringLock && !isFormLocked ? () => setIsFormFocused.on() : undefined}
            onKeyPress={(event: InputKeyboardEvent) => onInputKeyPress(event)}
            onChange={(event: InputChangeEvent) => onInputChange(event)}
            variant='unstyled'
            value={query}
          />
          <Actions
            hasQuery={query.length > 0}
            isFormLocked={isFormLocked}
            isHoveringLock={isHoveringLock}
            onToggleLock={() => setIsFormLocked.toggle()}
            onHoverLock={handleOnHoverLock}
            onClearQuery={onClearQuery}
          />
        </HStack>

        <Collapse in={isFormFocused || isFormLocked} unmountOnExit>
          <List
            title={!hasUnsubmitted ? 'Recent searches' : ''}
            actions={
              !hasUnsubmitted ? (
                <ScaleFade in={recentSearches.length > 0}>
                  <Button onClick={() => dispatch(setRecentSearches([]))} size='sm' variant='text'>
                    Clear
                  </Button>
                </ScaleFade>
              ) : undefined
            }
          >
            <>
              {!hasUnsubmitted ? (
                recentSearches.length > 0 ? (
                  sort([...recentSearches], 'date', { reverse: true }).map((search) => (
                    <Row
                      key={search.id}
                      id={search.id}
                      title={search.label}
                      subtitle={moment(search.date).fromNow()}
                      mediaType={search.mediaType}
                      state='isLoaded'
                      onSearch={(query: string) => onSubmitQuery(query, search.mediaType)}
                    />
                  ))
                ) : (
                  <Empty hasIllustration={false} label='No recent searches!' size='xs' />
                )
              ) : keywords.isError ? (
                <Error
                  hasIllustration={false}
                  label='Oh no! Something went wrong'
                  description='Failed to fetch keywords!'
                  size='xs'
                />
              ) : keywords.isSuccess && keywords.data?.length === 0 ? (
                <Empty hasIllustration={false} label='No keywords found!' size='xs' />
              ) : keywords.isSuccess && keywords.data?.length > 0 ? (
                keywords.data.map((keyword) => (
                  <Row
                    key={keyword.id}
                    id={String(keyword.id)}
                    title={keyword.name}
                    state='isLoaded'
                    type='isKeyword'
                    onSearch={(query: string) => onSubmitQuery(query)}
                  />
                ))
              ) : (
                [..._.range(0, 7)].map((_dummy, index) => (
                  <Row key={index} id={String(index)} title='Lorem Ipsum' state='isLoading' type='isKeyword' />
                ))
              )}
            </>
          </List>
        </Collapse>
      </Box>

      <Display
        query={submittedQuery}
        mediaType={mediaType}
        hasUnsubmitted={hasUnsubmitted}
        totalResults={totalResults}
      />
    </VStack>
  );
};

export default Form;
