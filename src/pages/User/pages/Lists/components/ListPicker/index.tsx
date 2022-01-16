import { ReactElement } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import ListItem from './components/ListItem';
import { ListPickerProps } from './types';

const ListPicker = ({ lists, selected, onSelected, onOpenList }: ListPickerProps): ReactElement => {
  return (
    <SimpleGrid width='100%' columns={[1, 2, 4, 4, 5, 6]} spacing={2}>
      {lists.map((list) => (
        <ListItem
          key={list.id}
          {...list}
          isSelected={selected?.id === list.id}
          onSelected={onSelected}
          onClick={onOpenList}
        />
      ))}
    </SimpleGrid>
  );
};

export default ListPicker;
