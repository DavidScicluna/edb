import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { Fade } from '@chakra-ui/react';

import { isNil, orderBy } from 'lodash';
import moment from 'moment';
import { useElementSize } from 'usehooks-ts';

import ListsTabButton from './components/ListsTabButton';
import { ListHeaderProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Badge from '../../../../../../components/Badge';
import Divider from '../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import TabList from '../../../../../../components/Tabs/components/TabList';

const ListHeader = ({ activeTab, lists, onListsClick }: ListHeaderProps): ReactElement => {
	const [ref, { height }] = useElementSize();

	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<HorizontalScroll ref={ref}>
			<ListsTabButton isSelected={isNil(activeTab)} onClick={onListsClick} />
			<Divider orientation='vertical' height={`${height}px`} mx={2} />
			<TabList color={color} isActiveForced size='lg'>
				{orderBy(lists, (list) => moment(list.date), ['desc']).map((list) => {
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
		</HorizontalScroll>
	);
};

export default ListHeader;
