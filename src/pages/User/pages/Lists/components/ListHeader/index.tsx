import { ReactElement } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import TabList from '../../../../../../components/Tabs/components/TabList';
import Divider from '../../../../components/Divider';
import ListsTabButton from './components/ListsTabButton';
import { ListHeaderProps } from './types';

const ListHeader = ({ activeTab, lists, onListsClick }: ListHeaderProps): ReactElement => {
  const [ref, { height }] = useElementSize();

  return (
    <HStack ref={ref} width='100%' spacing={2} divider={<Divider orientation='vertical' height={height} mx={2} />}>
      <ListsTabButton isSelected={_.isNil(activeTab)} onClick={onListsClick} />
      <TabList
        renderTabs={lists.map((list) => {
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
