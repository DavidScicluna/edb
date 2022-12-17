import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../common/hooks';

import { DummyPosterQuickviewProps } from './types';

const DummyPosterQuickview: FC<DummyPosterQuickviewProps> = ({ size = 'md' }) => {
	const { colorMode } = useUserTheme();

	return (
		<DummyIconButton color='gray' colorMode={colorMode} size={size} variant='icon'>
			<IconButtonIcon icon='aspect_ratio' category='outlined' />
		</DummyIconButton>
	);
};

export default DummyPosterQuickview;
