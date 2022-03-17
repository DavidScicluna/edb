import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { Style } from '../../../../../../../../common/types';
import Button from '../../../../../../../../components/Clickable/Button';
import Icon from '../../../../../../../../components/Icon';
import { setUser } from '../../../../../../../../store/slices/App';

const sx: Style = { px: 0, justifyContent: 'flex-start' };

const Footer = (): ReactElement => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSignOut = (): void => {
		navigate('/signin');

		setTimeout(() => dispatch(setUser(undefined)), 500);
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
