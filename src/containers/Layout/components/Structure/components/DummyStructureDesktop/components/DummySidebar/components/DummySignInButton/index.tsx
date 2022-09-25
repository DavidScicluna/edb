import { FC } from 'react';

import { DummyButton, Icon } from '@davidscicluna/component-library';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';

const DummySignInButton: FC = () => {
	const { color, colorMode } = useUserTheme();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	return (
		<DummyButton color={color} colorMode={colorMode} isFullWidth>
			{sidebarMode === 'expanded' ? 'Sign in' : <Icon icon='login' />}
		</DummyButton>
	);
};

export default DummySignInButton;
