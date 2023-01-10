import { FC, useState } from 'react';

import { useTheme, Tooltip, InternalLink, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, Center, Text } from '@chakra-ui/react';

import qs from 'query-string';
import dayjs from 'dayjs';
import { useUpdateEffect } from 'usehooks-ts';
import { compact } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';
import { formatDate, formatMediaType, formatMediaTypeLabel } from '../../../../../../common/utils';
import { data as dataFormat } from '../../../../../../components/Filters/common/data/formats';

import { ViewInfoDateItemProps } from './types';

const { getColor } = utils;

const today = formatDate({ date: dayjs(new Date()).toISOString(), section: 'year' });

const ViewInfoDateItem: FC<ViewInfoDateItemProps> = ({ mediaType, startDate, endDate }) => {
	const theme = useTheme();
	const { color: themeColor, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	const [color, setColor] = useState<string>(
		getColor({
			theme,
			colorMode,
			color: isHovering ? themeColor : 'gray',
			type: isHovering ? 'color' : 'text.secondary'
		})
	);

	const isOngoing = endDate ? formatDate({ date: endDate, section: 'year' }) === today : false;

	useUpdateEffect(() => {
		setColor(
			getColor({
				theme,
				colorMode,
				color: isHovering ? themeColor : 'gray',
				type: isHovering ? 'color' : 'text.secondary'
			})
		);
	}, [isHovering]);

	return (
		<Tooltip
			aria-label='Show full date (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={compact([
				`${formatMediaTypeLabel({ type: 'single', mediaType })} ${
					mediaType === 'movie' ? 'released' : 'first air-date was'
				} on ${formatDate({ date: startDate })}`,
				endDate
					? isOngoing
						? 'is currently still ongoing'
						: `ended on ${formatDate({ date: endDate })}`
					: null
			]).join(' and ')}
			shouldWrapChildren
		>
			<Center>
				<InternalLink
					colorMode={colorMode}
					to={{
						pathname: `/${formatMediaType({ mediaType })}`,
						search: qs.stringify(
							mediaType === 'movie'
								? {
										'primary_release_date.gte': dayjs(startDate).format(dataFormat),
										'primary_release_date.lte': dayjs(new Date()).format(dataFormat)
								  }
								: {
										'first_air_date.gte': dayjs(startDate).format(dataFormat),
										'first_air_date.lte': dayjs(new Date()).format(dataFormat)
								  }
						)
					}}
				>
					<ViewInfoItem
						renderIcon={(props) => <Icon {...props} color={color} icon='schedule' category='outlined' />}
						renderLabel={(props) => (
							<Text {...props} color={color}>
								{endDate
									? formatDate({ date: startDate, section: 'year' }) ===
									  formatDate({ date: endDate, section: 'year' })
										? formatDate({ date: startDate, section: 'year' })
										: compact([
												formatDate({ date: startDate, section: 'year' }),
												formatDate({ date: endDate, section: 'year' }) === today
													? 'present'
													: formatDate({ date: endDate, section: 'year' })
										  ]).join(' - ')
									: formatDate({ date: startDate })}
							</Text>
						)}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
					/>
				</InternalLink>
			</Center>
		</Tooltip>
	);
};

export default ViewInfoDateItem;
