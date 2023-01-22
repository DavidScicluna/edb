import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewActions from '../../../../components/ViewActions';

import { EpisodesDummyActionsProps } from './types';

const EpisodesDummyActions: FC<EpisodesDummyActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewActions {...props}>
			<DummyButton colorMode={colorMode} hasLeft size='lg' variant='outlined'>
				S# • E#
			</DummyButton>
			<DummyButton colorMode={colorMode} isFullWidth size='lg' variant='outlined'>
				Go back to TV Show seasons
			</DummyButton>
			<DummyButton colorMode={colorMode} hasRight size='lg' variant='outlined'>
				S# • E#
			</DummyButton>
		</ViewActions>
	);
};

export default EpisodesDummyActions;
