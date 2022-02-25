import { ReactElement } from 'react';

import { useMediaQuery, useBoolean, ScaleFade } from '@chakra-ui/react';

import moment from 'moment';

import { SearchProps } from './types';

import Badge from '../../../../../../../../components/Badge';
import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Icon from '../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../components/Tooltip';
import ListItem from '../../../List/components/ListItem';
import { searchTypes as allSearchTypes } from '../../../SearchTypes';

const Search = (props: SearchProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [isHoveringList, setIsHoveringList] = useBoolean();
	const [isHoveringDelete, setIsHoveringDelete] = useBoolean();

	const { id, label, searchTypes = [], date, onDelete, onClick } = props;

	const filteredSearchTypes = allSearchTypes.filter((allSearchType) =>
		searchTypes.some((searchType) => allSearchType.value === searchType)
	);

	return (
		<ListItem
			title={label}
			subtitle={moment(date).fromNow()}
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
						{filteredSearchTypes
							.map((searchType) => searchType.label)
							.filter((searchType) => searchType)
							.join(' • ')}
					</Badge>
				) : undefined
			}
			actions={
				!isSm ? (
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
								<Icon icon='clear' type='outlined' />
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
