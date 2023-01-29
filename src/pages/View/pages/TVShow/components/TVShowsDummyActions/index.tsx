import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../common/hooks';
import { DummyBookmark, DummyLike } from '../../../../../../components';
import ViewActions from '../../../../components/ViewActions';

import { TVShowsDummyActionsProps } from './types';

const TVShowsDummyActions: FC<TVShowsDummyActionsProps> = (props) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewActions {...props}>
			<DummyLike
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth size='lg' variant='outlined'>
						Like tv show
					</DummyButton>
				)}
			/>
			<DummyBookmark
				renderAction={() => (
					<DummyButton colorMode={colorMode} hasLeft isFullWidth size='lg' variant='outlined'>
						Add tv show to a list
					</DummyButton>
				)}
			/>
		</ViewActions>
	);
};

export default TVShowsDummyActions;
