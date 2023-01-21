import { FC, useState } from 'react';

import { useTheme, Tooltip, InternalLink, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, Center, Text } from '@chakra-ui/react';

import qs from 'query-string';
import dayjs from 'dayjs';
import { useUpdateEffect } from 'usehooks-ts';

import { formatDate, formatMediaType, formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { data as dataFormat } from '../../../../../../../../../components/Filters/common/data/formats';
import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';

import { EpisodeInfoDateProps } from './types';

const { getColor } = utils;

const EpisodeInfoDate: FC<EpisodeInfoDateProps> = ({ air_date }) => {
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
			label={`${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} Episode ${
				dayjs(air_date).isBefore(new Date()) ? 'was' : 'will be'
			} released on ${formatDate({ date: air_date })}`}
			shouldWrapChildren
		>
			<Center>
				<InternalLink
					colorMode={colorMode}
					to={{
						pathname: `/${formatMediaType({ mediaType: 'tv' })}`,
						search: qs.stringify({
							'first_air_date.gte': dayjs(air_date).format(dataFormat),
							'first_air_date.lte': dayjs(new Date()).format(dataFormat)
						})
					}}
				>
					<ViewInfoItem
						renderIcon={(props) => <Icon {...props} color={color} icon='schedule' category='outlined' />}
						renderLabel={(props) => (
							<Text {...props} color={color}>
								{formatDate({ date: air_date, section: 'year' })}
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

export default EpisodeInfoDate;
