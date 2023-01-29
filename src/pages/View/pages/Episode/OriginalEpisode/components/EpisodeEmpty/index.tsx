import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';
import {
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle
} from '../../../../../../../components';
import { getEmptySubtitle } from '../../../../../../../components/QueryEmpty/common/utils';

import { EpisodeEmptyProps } from './types';

const { getColor } = utils;

const EpisodeEmpty: FC<EpisodeEmptyProps> = ({ label }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	return (
		<QueryEmpty
			color={color}
			colorMode={colorMode}
			borderWidth='2px'
			borderStyle='dashed'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='lg'
		>
			<QueryEmptyStack>
				<QueryEmptyBody>
					<QueryEmptyTitle />
					<QueryEmptySubtitle>{getEmptySubtitle({ type: 'empty', label })}</QueryEmptySubtitle>
				</QueryEmptyBody>
			</QueryEmptyStack>
		</QueryEmpty>
	);
};

export default EpisodeEmpty;
