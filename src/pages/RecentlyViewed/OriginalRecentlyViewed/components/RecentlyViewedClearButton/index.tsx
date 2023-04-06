import { FC, useState } from 'react';

import { useNavigate } from 'react-router';

import {
	ButtonColor,
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Alert,
	Button,
	IconButton,
	IconButtonIcon,
	Icon,
	utils
} from '@davidscicluna/component-library';

import { useToast, useDisclosure, useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';
import { setUserRecentlyViewed } from '../../../../../store/slices/Users';

const { convertDurationToMS } = utils;

const toastID = 'ds-edb-recently-viewed-clear-button-toast';

const RecentlyViewedClearButton: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const toast = useToast();
	const {
		isOpen: isClearRecentlyViewedOpen,
		onOpen: onClearRecentlyViewedOpen,
		onClose: onClearRecentlyViewedClose
	} = useDisclosure();

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const id = useSelector((state) => state.users.data.activeUser.data.id);

	const [color, setColor] = useState<ButtonColor>('gray');
	const [isHovering, setIsHovering] = useBoolean();

	const handleClear = (): void => {
		onClearRecentlyViewedClose();

		navigate('/');

		if (!toast.isActive(toastID)) {
			toast({
				id: toastID,
				duration: convertDurationToMS(),
				position: 'bottom-left',
				render: () => (
					<Alert
						duration={12.5}
						description='Recently Viewed has been successfully cleared!'
						status='success'
						onClose={() => toast.close(toastID)}
					/>
				)
			});
		}

		setTimeout(() => {
			dispatch(setUserRecentlyViewed({ id, data: { movie: [], tv: [], person: [], collection: [] } }));
		}, 500);
	};

	useUpdateEffect(() => setColor(isHovering ? 'red' : 'gray'), [isHovering]);

	return (
		<>
			<Button
				color={color}
				colorMode={colorMode}
				isFullWidth
				onClick={onClearRecentlyViewedOpen}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				variant='outlined'
			>
				Clear Recently Viewed
			</Button>

			<ConfirmModal
				colorMode={colorMode}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<IconButtonIcon icon={icon} category={category} />
					</IconButton>
				)}
				isOpen={isClearRecentlyViewedOpen}
				onClose={onClearRecentlyViewedClose}
			>
				<ConfirmModalStack spacing={spacing} p={spacing}>
					<ConfirmModalIcon
						renderIcon={(props) => (
							<Icon
								{...props}
								width={theme.fontSizes['6xl']}
								height={theme.fontSizes['6xl']}
								fontSize={theme.fontSizes['6xl']}
								icon='delete_forever'
								category='outlined'
							/>
						)}
						color='red'
						p={2}
					/>

					<ConfirmModalBody>
						<ConfirmModalTitle>Clear Recently Viewed?</ConfirmModalTitle>
						<ConfirmModalSubtitle>
							Are you sure you want to clear the recently viewed list?
						</ConfirmModalSubtitle>
						<ConfirmModalSubtitle>This action is irreversible!</ConfirmModalSubtitle>
					</ConfirmModalBody>

					<ConfirmModalFooter
						renderCancel={(props) => <Button {...props}>Cancel</Button>}
						renderAction={(props) => (
							<Button {...props} color='red' isDisabled={!id} onClick={handleClear}>
								Clear
							</Button>
						)}
					/>
				</ConfirmModalStack>
			</ConfirmModal>
		</>
	);
};

export default RecentlyViewedClearButton;
