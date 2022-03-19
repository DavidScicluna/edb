import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Style } from '../../../../../../../../common/types';
import Button from '../../../../../../../../components/Clickable/Button';
import Icon from '../../../../../../../../components/Icon';
import { setUser } from '../../../../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../../../../store/slices/Modals';

const sx: Style = { px: 0, justifyContent: 'flex-start' };

const Footer = (): ReactElement => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSignOut = (): void => {
		dispatch(toggleSplashscreen(true));

		navigate('/signin', { replace: false });

		dispatch(setUser(undefined));
	};

	return (
		<Button
			renderLeft={({ fontSize }) => <Icon icon='logout' type='outlined' fontSize={fontSize} />}
			color='red'
			isFullWidth
			onClick={() => handleSignOut()}
			size='lg'
			variant='text'
			sx={{ front: { ...sx } }}
		>
			Sign out
		</Button>
	);
};

export default Footer;
