import { FC, useState, useEffect } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatDate } from '../../../../../../../../../common/utils';

import { CollectionInfoDatesProps, CollectionInfoDates as CollectionInfoDatesType } from './types';

const CollectionInfoDates: FC<CollectionInfoDatesProps> = ({ first, last }) => {
	const { colorMode } = useUserTheme();

	const [fullDates, setFullDates] = useState<CollectionInfoDatesType>([]);
	const [partialDates, setPartialDates] = useState<CollectionInfoDatesType>([]);

	const [isHovering, setIsHovering] = useBoolean();

	const handleGetPartsDates = (): void => {
		setFullDates(
			compact([
				formatDate({ date: first.release_date || '' }),
				last && last.release_date ? formatDate({ date: last.release_date }) : 'Present'
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
			label={fullDates.join(' -> ')}
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
