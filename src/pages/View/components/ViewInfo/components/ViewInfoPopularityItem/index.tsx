import { FC } from 'react';

import { useTheme, Tooltip, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import numbro from 'numbro';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';

import { ViewInfoPopularityItemProps } from './types';

const { getColor } = utils;

const ViewInfoPopularityItem: FC<ViewInfoPopularityItemProps> = ({ popularity }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full popularity (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={
				popularity > 1000
					? 'Popularity: Trending up'
					: popularity > 500
					? 'Popularity: Neutral'
					: 'Popularity: Trending down'
			}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => (
					<Icon
						{...props}
						color={getColor({
							theme,
							colorMode,
							color: popularity > 1000 ? 'green' : popularity > 500 ? 'gray' : 'red',
							type: popularity > 1000 || popularity < 500 ? 'color' : 'text.secondary'
						})}
						icon={popularity > 1000 ? 'trending_up' : popularity > 500 ? 'trending_flat' : 'trending_down'}
						category='outlined'
					/>
				)}
				renderLabel={(props) => <Text {...props}>{numbro(popularity).format({ average: true })}</Text>}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default ViewInfoPopularityItem;
