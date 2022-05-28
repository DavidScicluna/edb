import { ReactElement } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import { Fade } from '@chakra-ui/react';
import CountUp from 'react-countup';
import dayjs from 'dayjs';
import isNil from 'lodash/isNil';
import orderBy from 'lodash/orderBy';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../common/hooks';
import Divider from '../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import TabList from '../../../../../../components/Tabs/components/TabList';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';

import { ListHeaderProps } from './types';
import ListsTabButton from './components/ListsTabButton';

const ListHeader = ({ activeTab, lists, onListsClick }: ListHeaderProps): ReactElement => {
	const [ref, { height }] = useElementSize();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<HorizontalScroll ref={ref}>
			<ListsTabButton isSelected={isNil(activeTab)} onClick={onListsClick} />
			<Divider orientation='vertical' height={`${height}px`} mx={2} />
			<TabList color={color} isActiveForced>
				{orderBy(lists, (list) => dayjs(list.date), ['desc']).map((list) => {
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
												<BadgeLabel>
													<CountUp
														duration={1}
														end={
															list.results.movies.length ||
															0 + list.results.tv.length ||
															0
														}
													/>
												</BadgeLabel>
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
