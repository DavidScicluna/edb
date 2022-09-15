import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import DummyLike from '../../../Clickable/DummyLike';
import { useUserTheme } from '../../../../common/hooks';

import { DummyPosterLikeProps } from './types';

const DummyPosterLike: FC<DummyPosterLikeProps> = ({ size = 'md' }) => {
	const { colorMode } = useUserTheme();

	return (
		<DummyLike
			renderAction={({ iconType, iconCategory }) => (
				<DummyIconButton color='gray' colorMode={colorMode} size={size} variant='icon'>
					<IconButtonIcon icon={iconType} category={iconCategory} />
				</DummyIconButton>
			)}
		/>
	);
};

export default DummyPosterLike;
