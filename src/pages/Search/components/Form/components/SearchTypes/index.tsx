import { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';

import {
  LibraryBooksOutlined as LibraryBooksOutlinedIcon,
  LibraryBooksTwoTone as LibraryBooksTwoToneIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PeopleAltTwoTone as PeopleAltTwoToneIcon,
  TheatersOutlined as TheatersOutlinedIcon,
  TheatersTwoTone as TheatersTwoToneIcon,
  TvOutlined as TvOutlinedIcon,
  TvTwoTone as TvTwoToneIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  BusinessTwoTone as BusinessTwoToneIcon
} from '@material-ui/icons';
import { useElementSize } from 'usehooks-ts';

import SearchType from './components/SearchType';
import { SearchType as SearchTypeType } from './components/SearchType/types';
import { SearchTypesProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import Divider from '../../../../../../components/Divider';
import Panel from '../../../../../../components/Panel';
import { SearchType as SearchTypeValue } from '../../../../../../store/slices/User/types';

export const searchTypes: SearchTypeType[] = [
  {
    value: 'movie',
    label: 'Movies',
    color: 'blue',
    renderLeftIcon: ({ isActive, fontSize }) =>
      isActive ? <TheatersTwoToneIcon style={{ fontSize }} /> : <TheatersOutlinedIcon style={{ fontSize }} />
  },
  {
    value: 'tv',
    label: 'TV Shows',
    color: 'orange',
    renderLeftIcon: ({ isActive, fontSize }) =>
      isActive ? <TvTwoToneIcon style={{ fontSize }} /> : <TvOutlinedIcon style={{ fontSize }} />
  },
  {
    value: 'person',
    label: 'People',
    color: 'yellow',
    renderLeftIcon: ({ isActive, fontSize }) =>
      isActive ? <PeopleAltTwoToneIcon style={{ fontSize }} /> : <PeopleAltOutlinedIcon style={{ fontSize }} />
  },
  {
    value: 'collection',
    label: 'Collections',
    color: 'pink',
    renderLeftIcon: ({ isActive, fontSize }) =>
      isActive ? <LibraryBooksTwoToneIcon style={{ fontSize }} /> : <LibraryBooksOutlinedIcon style={{ fontSize }} />
  },
  {
    value: 'company',
    label: 'Companies',
    color: 'purple',
    renderLeftIcon: ({ isActive, fontSize }) =>
      isActive ? <BusinessTwoToneIcon style={{ fontSize }} /> : <BusinessOutlinedIcon style={{ fontSize }} />
  }
];

const SearchTypes = ({ searchTypes: activeSearchTypes, onSetSearchTypes }: SearchTypesProps): ReactElement => {
  const { colorMode } = useColorMode();

  const [ref, { height }] = useElementSize();

  const color = useSelector((state) => state.user.ui.theme.color);

  const handleAllClick = (): void => {
    if (activeSearchTypes.length === searchTypes.length) {
      onSetSearchTypes([]);
    } else {
      onSetSearchTypes(searchTypes.map((type) => type.value));
    }
  };

  const handleAllLabel = (): string => {
    return `${activeSearchTypes.length === searchTypes.length ? 'Remove' : 'Select'} All`;
  };

  const handleSearchTypeClick = (value: SearchTypeValue): void => {
    if (activeSearchTypes.some((activeType) => activeType === value)) {
      onSetSearchTypes(activeSearchTypes.filter((activeType) => activeType !== value));
    } else {
      onSetSearchTypes([...activeSearchTypes, value]);
    }
  };

  return (
    <Panel isFullWidth isDivisible={false} size='xs' variant='transparent'>
      {{
        header: {
          title: (
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='sm'
              fontWeight='bold'
              textTransform='uppercase'
            >
              {`I'm looking for...`}
            </Text>
          ),
          actions: (
            <HStack ref={ref} divider={<Divider orientation='vertical' height={`${height}px`} />}>
              <Button
                color={color}
                isDisabled={activeSearchTypes.length === 0 || activeSearchTypes.length === searchTypes.length}
                onClick={() => onSetSearchTypes([])}
                size='sm'
                variant='text'
              >
                Clear
              </Button>
              <Button color={color} onClick={() => handleAllClick()} size='sm' variant='text'>
                {handleAllLabel()}
              </Button>
            </HStack>
          )
        },
        body: (
          <HStack width='100%' spacing={2}>
            {searchTypes.map((type) => (
              <SearchType
                {...type}
                key={type.value}
                isActive={activeSearchTypes.some((activeType) => activeType === type.value)}
                onClick={handleSearchTypeClick}
              />
            ))}
          </HStack>
        )
      }}
    </Panel>
  );
};

export default SearchTypes;
