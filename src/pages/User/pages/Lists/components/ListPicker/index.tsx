
import { ReactElement } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import _ from 'lodash';
import moment from 'moment';

import ListItem from './components/ListItem';
import { ListPickerProps } from './types';

const ListPicker = ({ lists, selectedListID, onSelected, onOpenList }: ListPickerProps): ReactElement => {
  return (
    <SimpleGrid width='100%' columns={[1, 2, 4, 4, 5, 6]} spacing={2}>
      {_.orderBy(lists, (list) => moment(list.date), ['desc']).map((list, index) => (
        <ListItem
          key={list.id}
          {...list}
          isSelected={selectedListID === list.id}
          onSelected={() => onSelected(list.id)}
          onClick={() => onOpenList(index)}
        />
      ))}
    </SimpleGrid>
  );
};

export default ListPicker;
