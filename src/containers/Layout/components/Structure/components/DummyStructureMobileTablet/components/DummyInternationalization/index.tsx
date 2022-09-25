import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../../common/hooks';

import { DummyInternationalizationProps } from './types';

const DummyInternationalization: FC<DummyInternationalizationProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { variant = 'icon', ...rest } = props;

	return (
		<DummyIconButton
			{...rest}
			aria-label='Internationalization Dummy Button'
			colorMode={colorMode}
			variant={variant}
		>
			<IconButtonIcon icon='language' />
		</DummyIconButton>
	);
};

export default DummyInternationalization;
