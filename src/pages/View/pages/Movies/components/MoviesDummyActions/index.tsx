import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../common/hooks';
import { DummyBookmark, DummyLike } from '../../../../../../components';
import ViewActions from '../../../../components/ViewActions';

import { MoviesDummyActionsProps } from './types';

const MoviesDummyActions: FC<MoviesDummyActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewActions {...props}>
			<DummyLike
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth size='lg' variant='outlined'>
						Like movie
					</DummyButton>
				)}
			/>
			<DummyBookmark
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth size='lg' variant='outlined'>
						Add movie to a list
					</DummyButton>
				)}
			/>
		</ViewActions>
	);
};

export default MoviesDummyActions;
