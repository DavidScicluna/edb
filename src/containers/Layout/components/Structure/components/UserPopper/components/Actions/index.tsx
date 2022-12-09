import { FC } from 'react';

import { useLocation } from 'react-router';

import { useTheme, InternalLink, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../../../../common/hooks';
import { toggleInternationalizationModal, toggleUserThemeModal } from '../../../../../../../../store/slices/Modals';
import { sx } from '../../common/styles';

const Actions: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isXl] = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

	const location = useLocation();

	const dispatch = useDispatch();

	const isInternationalizationModalOpen = useSelector((state) => state.modals.ui.isInternationalizationModalOpen);
	const isUserThemeModalOpen = useSelector((state) => state.modals.ui.isUserThemeModalOpen);

	return (
		<VStack width='100%' spacing={0}>
			<InternalLink
				to='/profile'
				isDisabled={location.pathname === '/profile' && location.hash.length === 0}
				isFullWidth
			>
				<Button
					color={location.pathname === '/profile' && location.hash.length === 0 ? color : 'gray'}
					colorMode={colorMode}
					renderLeft={({ color, colorMode, height }) => (
						<Icon
							colorMode={colorMode}
							width={`${height}px`}
							height={`${height}px`}
							fontSize={`${height}px`}
							icon='person'
							category={
								location.pathname === '/profile' && location.hash.length === 0 ? 'filled' : 'outlined'
							}
							skeletonColor={color}
						/>
					)}
					isFullWidth
					size='lg'
					variant='text'
					sx={{ ...sx }}
				>
					Profile
				</Button>
			</InternalLink>

			<InternalLink
				to={{ pathname: '/profile', hash: 'mylikes' }}
				isDisabled={location.pathname === '/profile' && location.hash === '#mylikes'}
				isFullWidth
			>
				<Button
					color={location.pathname === '/profile' && location.hash === '#mylikes' ? color : 'gray'}
					colorMode={colorMode}
					renderLeft={({ color, colorMode, height }) => (
						<Icon
							colorMode={colorMode}
							width={`${height}px`}
							height={`${height}px`}
							fontSize={`${height}px`}
							icon={
								location.pathname === '/profile' && location.hash === '#mylikes'
									? 'favorite'
									: 'favorite_border'
							}
							category='outlined'
							skeletonColor={color}
						/>
					)}
					isFullWidth
					size='lg'
					variant='text'
					sx={{ ...sx }}
				>
					Liked
				</Button>
			</InternalLink>

			<InternalLink
				to={{ pathname: '/profile', hash: 'mylists' }}
				isDisabled={location.pathname === '/profile' && location.hash === '#mylists'}
				isFullWidth
			>
				<Button
					color={location.pathname === '/profile' && location.hash === '#mylists' ? color : 'gray'}
					colorMode={colorMode}
					renderLeft={({ color, colorMode, height }) => (
						<Icon
							colorMode={colorMode}
							width={`${height}px`}
							height={`${height}px`}
							fontSize={`${height}px`}
							icon={
								location.pathname === '/profile' && location.hash === '#mylists'
									? 'bookmark'
									: 'bookmark_border'
							}
							category='outlined'
							skeletonColor={color}
						/>
					)}
					isFullWidth
					size='lg'
					variant='text'
					sx={{ ...sx }}
				>
					Lists
				</Button>
			</InternalLink>

			{isXl && (
				<Button
					color={isInternationalizationModalOpen ? color : 'gray'}
					colorMode={colorMode}
					renderLeft={({ color, colorMode, height }) => (
						<Icon
							colorMode={colorMode}
							width={`${height}px`}
							height={`${height}px`}
							fontSize={`${height}px`}
							icon='language'
							category={isInternationalizationModalOpen ? 'filled' : 'outlined'}
							skeletonColor={color}
						/>
					)}
					isFullWidth
					onClick={() => dispatch(toggleInternationalizationModal(true))}
					size='lg'
					variant='text'
					sx={{ ...sx }}
				>
					Language
				</Button>
			)}

			<Button
				color={isUserThemeModalOpen ? color : 'gray'}
				colorMode={colorMode}
				renderLeft={({ color, colorMode, height }) => (
					<Icon
						colorMode={colorMode}
						width={`${height}px`}
						height={`${height}px`}
						fontSize={`${height}px`}
						icon='palette'
						category={isUserThemeModalOpen ? 'filled' : 'outlined'}
						skeletonColor={color}
					/>
				)}
				isFullWidth
				onClick={() => dispatch(toggleUserThemeModal(true))}
				size='lg'
				variant='text'
				sx={{ ...sx }}
			>
				Display
			</Button>
		</VStack>
	);
};

export default Actions;
