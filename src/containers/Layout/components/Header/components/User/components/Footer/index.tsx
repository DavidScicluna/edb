import { ReactElement } from 'react';

import { Style, Button, Icon } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setUser } from '../../../../../../../../store/slices/App';
import { toggleSplashscreen } from '../../../../../../../../store/slices/Modals';

const sx: Style = { px: 0, justifyContent: 'flex-start' };

const Footer = (): ReactElement => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSignOut = (): void => {
		dispatch(toggleSplashscreen(true));

		navigate('/signin', { replace: true });

		dispatch(setUser(undefined));
	};

	return (
		<Button
			renderLeft={(props) => <Icon {...props} icon='logout' category='outlined' />}
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
