import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';

import { EpisodeInfoNumbersProps } from './types';

const EpisodeInfoNumbers: FC<EpisodeInfoNumbersProps> = ({ season_number: season, episode_number: episode }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full season & episode numbers (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={`Season ${season} • episode ${episode}`}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='tag' category='outlined' />}
				renderLabel={(props) => <Text {...props}>{[`S${season}`, `E${episode}`].join(' • ')}</Text>}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default EpisodeInfoNumbers;
