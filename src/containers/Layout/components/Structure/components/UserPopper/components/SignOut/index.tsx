import { FC } from 'react';

import { useNavigate } from 'react-router';

import { Button, Icon } from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { sx } from '../../common/styles';
import { guest, setUser } from '../../../../../../../../store/slices/Users';
import { toggleSpinnerModal } from '../../../../../../../../store/slices/Modals';
import { updateFavicon } from '../../../../../../../../common/utils';

const SignOut: FC = () => {
	const { colorMode } = useUserTheme();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const activeUser = useSelector((state) => state.users.data.activeUser);

	const handleSignOut = (): void => {
		dispatch(toggleSpinnerModal(true));

		updateFavicon({ color: activeUser.ui.theme.color, colorMode });

		setTimeout(
			() =>
				dispatch(
					setUser({
						...guest,
						ui: {
							...guest.ui,
							theme: {
								...guest.ui.theme,
								color: activeUser.ui.theme.color
							}
						}
					})
				),
			250
		);

		setTimeout(() => navigate('/authentication/signin'), 500);

		setTimeout(() => dispatch(toggleSpinnerModal(false)), 2500);
	};

	return (
		<Button
			color='red'
			colorMode={colorMode}
			renderLeft={({ colorMode, height }) => (
				<Icon
					colorMode={colorMode}
					width={`${height}px`}
					height={`${height}px`}
					fontSize={`${height}px`}
					icon='logout'
					category='outlined'
				/>
			)}
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
