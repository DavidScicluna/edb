import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';
import moment from 'moment';
import { useElementSize } from 'usehooks-ts';

import Divider from '../../../../../../components/Divider';
import TabList from '../../../../../../components/Tabs/components/TabList';
import ListsTabButton from './components/ListsTabButton';
import { ListHeaderProps } from './types';

const ListHeader = ({ activeTab, lists, onListsClick }: ListHeaderProps): ReactElement => {
  const [ref, { height }] = useElementSize();

  return (
    <HStack ref={ref} width='100%' spacing={2} divider={<Divider orientation='vertical' height={height} mx={2} />}>
      <ListsTabButton isSelected={_.isNil(activeTab)} onClick={onListsClick} />
      <TabList
        renderTabs={_.orderBy(lists, (list) => moment(list.date), ['desc']).map((list) => {
          return {
            // renderRightIcon: ({}) => , // TODO: Add Badge to Tabs
            label: list.label
          };
        })}
        size='lg'
      />
    </HStack>
  );
};

export default ListHeader;
