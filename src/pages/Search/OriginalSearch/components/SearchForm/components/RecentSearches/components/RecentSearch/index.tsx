import { FC } from 'react';

import {
	IconButtonMouseEvent,
	useTheme,
	IconButton,
	IconButtonIcon,
	Badge,
	BadgeLabel,
	ScaleFade
} from '@davidscicluna/component-library';

import { useMediaQuery, useConst, useBoolean, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useDispatch } from 'react-redux';

import ListItem from '../../../SearchList/components/SearchListItem';
import allSearchTypes, { SearchType } from '../../../../common/data/searchTypes';
import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { setUserRecentSearches } from '../../../../../../../../../store/slices/Users';

import { RecentSearchProps } from './types';

dayjs.extend(relativeTime);

const RecentSearch: FC<RecentSearchProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const dispatch = useDispatch();
	// TODO: Go over all useSelector and see if we are not getting data from user double
	// example: one for ID an one for recentSearches instead of consolidated in one
	const {
		data: { id: activeUserID, recentSearches: allRecentSearches = [] }
	} = useSelector((state) => state.users.data.activeUser);

	const { id, label, searchedAt, searchTypes = [], onSearchClick } = props;

	const types = useConst<SearchType[]>(
		allSearchTypes.filter(({ value }) => searchTypes.some((search) => search === value))
	);

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<ListItem
			renderTitle={(props) => <Text {...props}>{label}</Text>}
			renderSubtitle={(props) => <Text {...props}>{dayjs(searchedAt).fromNow()}</Text>}
			renderBadge={
				types && types.length > 0
					? ({ size }) => (
							<Badge
								color={types.length === 1 ? types[0].color : 'gray'}
								colorMode={colorMode}
								size={size}
							>
								<BadgeLabel>
									{types
										.map(({ label }) => label)
										.filter((search) => search)
										.join(' • ')}
								</BadgeLabel>
							</Badge>
					  )
					: undefined
			}
			actions={
				!isSm && (
					<ScaleFade in={isHovering}>
						<IconButton
							aria-label={`Remove "${label}" search from recent searches list`}
							colorMode={colorMode}
							onClick={(event: IconButtonMouseEvent) => {
								event.preventDefault();
								event.stopPropagation();

								dispatch(
									setUserRecentSearches({
										id: activeUserID,
										data: allRecentSearches.filter((search) => search.id !== id)
									})
								);
							}}
							variant='icon'
						>
							<IconButtonIcon icon='clear' />
						</IconButton>
					</ScaleFade>
				)
			}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
			onClick={() => onSearchClick({ label, searchTypes })}
		/>
	);
};

export default RecentSearch;
