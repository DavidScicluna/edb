import { ReactElement } from 'react';

import { IconButton, Badge, BadgeLabel, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, ScaleFade } from '@chakra-ui/react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Tooltip from '../../../../../../../../components/Tooltip';
import ListItem from '../../../List/components/ListItem';
import { searchTypes as allSearchTypes } from '../../../SearchTypes';

import { SearchProps } from './types';

dayjs.extend(relativeTime);

const Search = (props: SearchProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [isHoveringList, setIsHoveringList] = useBoolean();
	const [isHoveringDelete, setIsHoveringDelete] = useBoolean();

	const { id, label, searchTypes = [], date, isDisabled = false, onDelete, onClick } = props;

	const filteredSearchTypes = allSearchTypes.filter((allSearchType) =>
		searchTypes.some((searchType) => allSearchType.value === searchType)
	);

	return (
		<ListItem
			title={label}
			subtitle={dayjs(date).fromNow()}
			badge={
				filteredSearchTypes && filteredSearchTypes.length > 0 ? (
					<Badge
						color={
							filteredSearchTypes.length === 1 && filteredSearchTypes[0]
								? filteredSearchTypes[0].color
								: 'gray'
						}
						size='xs'
					>
						<BadgeLabel>
							{filteredSearchTypes
								.map((searchType) => searchType.label)
								.filter((searchType) => searchType)
								.join(' • ')}
						</BadgeLabel>
					</Badge>
				) : undefined
			}
			actions={
				!isSm && !isDisabled ? (
					<ScaleFade in={isHoveringList} unmountOnExit>
						<Tooltip
							aria-label={`Remove "${label}"`}
							label={`Remove "${label}"`}
							isOpen={isHoveringDelete}
							placement='top'
						>
							<IconButton
								aria-label={`Remove "${label}"`}
								onClick={() => onDelete(id)}
								onMouseEnter={() => setIsHoveringDelete.on()}
								onMouseLeave={() => setIsHoveringDelete.off()}
								variant='icon'
							>
								<Icon icon='clear' category='outlined' />
							</IconButton>
						</Tooltip>
					</ScaleFade>
				) : undefined
			}
			isLoading={false}
			onClick={() => onClick(label, searchTypes)}
			onMouseEnter={() => setIsHoveringList.on()}
			onMouseLeave={() => setIsHoveringList.off()}
		/>
	);
};

export default Search;
