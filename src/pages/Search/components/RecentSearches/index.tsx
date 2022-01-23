import React, { ReactElement } from 'react';

import { ScaleFade } from '@chakra-ui/react';
import sort from 'array-sort';
import _ from 'lodash';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import Empty from '../../../../components/Empty';
import { setRecentSearches } from '../../../../store/slices/User';
import { Search as SearchType } from '../../../../store/slices/User/types';
import List from '../List';
import ListItem from '../List/components/ListItem';
import Search from './components/Search';
import { RecentSearchesProps } from './types';

const RecentSearches = (props: RecentSearchesProps): ReactElement => {
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);
  const color = useSelector((state) => state.user.ui.theme.color);

  const { onSearchClick } = props;

  const handleDelete = (id: SearchType['id']): void => {
    dispatch(setRecentSearches(recentSearches.filter((search) => search.id !== id)));
  };

  return (
    <List
      title='Recent Searches'
      actions={
        <ScaleFade in={recentSearches.length > 0} unmountOnExit>
          <Button color={color} onClick={() => dispatch(setRecentSearches([]))} size='sm' variant='text'>
            Clear
          </Button>
        </ScaleFade>
      }
    >
      {recentSearches.length === 0 ? (
        <Empty hasIllustration={false} label='No recent searches found!' size='sm' />
      ) : recentSearches.length > 0 ? (
        <>
          {sort([...recentSearches], 'date', { reverse: true }).map((search) => (
            <Search key={search.id} {...search} onDelete={handleDelete} onClick={onSearchClick} />
          ))}
        </>
      ) : (
        <>
          {_.range(0, 5).map((_dummy, index) => (
            <ListItem key={index} id={String(index)} title='Lorem Ipsum' isLoading variant='transparent' />
          ))}
        </>
      )}
    </List>
  );
};

export default RecentSearches;
