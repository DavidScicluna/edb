import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../common/hooks';
import DummyBookmark from '../../../Clickable/DummyBookmark';

import { DummyPosterBookmarkProps } from './types';

const DummyPosterBookmark: FC<DummyPosterBookmarkProps> = ({ size = 'md' }) => {
	const { colorMode } = useUserTheme();

	return (
		<DummyBookmark
			renderAction={({ iconType, iconCategory }) => (
				<DummyIconButton color='gray' colorMode={colorMode} size={size} variant='icon'>
					<IconButtonIcon icon={iconType} category={iconCategory} />
				</DummyIconButton>
			)}
		/>
	);
};

export default DummyPosterBookmark;
