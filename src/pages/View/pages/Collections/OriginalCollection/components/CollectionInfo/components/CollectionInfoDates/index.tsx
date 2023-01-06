import { FC, useState, useEffect } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { compact } from 'lodash';
import dayjs from 'dayjs';

import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatDate, formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { CollectionInfoDatesProps, CollectionInfoDates as CollectionInfoDatesType } from './types';

const today = formatDate({ date: dayjs(new Date()).toISOString(), section: 'year' });

const CollectionInfoDates: FC<CollectionInfoDatesProps> = ({ first, last }) => {
	const { colorMode } = useUserTheme();

	const [fullDates, setFullDates] = useState<CollectionInfoDatesType>([]);
	const [partialDates, setPartialDates] = useState<CollectionInfoDatesType>([]);

	const [isHovering, setIsHovering] = useBoolean();

	const handleGetPartsDates = (): void => {
		setFullDates(
			compact([
				first && first.release_date
					? `First ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} ${
							today < formatDate({ date: first.release_date, section: 'year' }) ? 'will be' : 'was'
					  } released on ${formatDate({
							date: first.release_date
					  })}`
					: null,
				last && last.release_date
					? `Last ${formatMediaTypeLabel({ type: 'single', mediaType: 'movie' })} ${
							today < formatDate({ date: last.release_date, section: 'year' }) ? 'will be' : 'was'
					  } released on ${formatDate({
							date: last.release_date
					  })}`
					: first && first.release_date
					? 'Present'
					: null
			])
		);
		setPartialDates(
			compact([
				formatDate({ date: first.release_date || '', section: 'year' }),
				last && last.release_date ? formatDate({ date: last.release_date, section: 'year' }) : 'Present'
			])
		);
	};

	useEffect(() => handleGetPartsDates(), [first, last]);

	return (
		<Tooltip
			aria-label='Show full date (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={fullDates.join(' • ')}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='schedule' category='outlined' />}
				renderLabel={(props) => <Text {...props}>{partialDates.join(' -> ')}</Text>}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default CollectionInfoDates;
