import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { HStack, Fade } from '@chakra-ui/react';

import _ from 'lodash';
import moment from 'moment';
import { useElementSize } from 'usehooks-ts';

import ListsTabButton from './components/ListsTabButton';
import { ListHeaderProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Badge from '../../../../../../components/Badge';
import Divider from '../../../../../../components/Divider';
import TabList from '../../../../../../components/Tabs/components/TabList';

const ListHeader = ({ activeTab, lists, onListsClick }: ListHeaderProps): ReactElement => {
	const [ref, { height }] = useElementSize();

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<HStack
			ref={ref}
			width='100%'
			spacing={2}
			divider={<Divider orientation='vertical' height={`${height}px`} mx={2} />}
		>
			<ListsTabButton isSelected={_.isNil(activeTab)} onClick={onListsClick} />
			<TabList color={color} size='lg'>
				{_.orderBy(lists, (list) => moment(list.date), ['desc']).map((list) => {
					return {
						label: list.label,
						renderRight:
							list.results.movies.length + list.results.tv.length > 0
								? ({ isSelected, size }) => (
										<Fade in unmountOnExit>
											<Badge
												color={isSelected ? color : 'gray'}
												isLight={!isSelected}
												size={size}
											>
												<CountUp
													duration={1}
													end={list.results.movies.length || 0 + list.results.tv.length || 0}
												/>
											</Badge>
										</Fade>
								  )
								: undefined
					};
				})}
			</TabList>
		</HStack>
	);
};

export default ListHeader;
