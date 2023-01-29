import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';

import { EpisodeInfoNumbersProps } from './types';

const EpisodeInfoNumbers: FC<EpisodeInfoNumbersProps> = ({ name, season_number: season, episode_number: episode }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full season & episode numbers (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={compact([name, `Season ${season}`, `Episode ${episode}`]).join(' • ')}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='tag' category='outlined' />}
				renderLabel={(props) => (
					<Text {...props}>{compact([name, `S${season}`, `E${episode}`]).join(' • ')}</Text>
				)}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default EpisodeInfoNumbers;
