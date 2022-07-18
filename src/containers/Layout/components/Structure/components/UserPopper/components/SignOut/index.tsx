import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTheme, Button, Icon, utils } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';
import { merge } from 'lodash';

import { useUserTheme } from '../../../../../../../../common/hooks';
import { sx } from '../../common/styles';
import { guest, setUser } from '../../../../../../../../store/slices/Users';
import { getBoringAvatarSrc } from '../../../../../../../../common/utils';
import { toggleSpinnerModal } from '../../../../../../../../store/slices/Modals';

const { getHue } = utils;

const SignOut: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSignOut = (): void => {
		dispatch(toggleSpinnerModal(true));

		navigate('/signin');

		setTimeout(() => {
			dispatch(toggleSpinnerModal(false));
			dispatch(
				setUser(
					merge(
						{ ...guest },
						{
							...guest,
							data: {
								...guest.data,
								info: {
									...guest.data.info,
									avatar_path: getBoringAvatarSrc({
										id: guest.data.id,
										colors: theme.colors,
										hue: getHue({ colorMode, type: 'color' }),
										size: 500,
										variant: 'beam'
									})
								}
							}
						}
					)
				)
			);
		}, 250);
	};

	return (
		<Button
			color='red'
			colorMode={colorMode}
			renderLeft={(props) => <Icon {...props} icon='logout' category='outlined' />}
			isFullWidth
			onClick={() => handleSignOut()}
			size='lg'
			variant='text'
			sx={{ ...sx }}
		>
			Sign out
		</Button>
	);
};

export default SignOut;
