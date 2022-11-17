import { FC } from 'react';

import {
	useTheme,
	ConfirmModal,
	ConfirmModalStack,
	ConfirmModalIcon,
	ConfirmModalBody,
	ConfirmModalTitle,
	ConfirmModalSubtitle,
	ConfirmModalFooter,
	Button,
	IconButton,
	IconButtonIcon,
	Icon
} from '@davidscicluna/component-library';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../common/hooks';
import { defaultPromptConfirmModal, setPromptConfirmModal } from '../../../../../store/slices/Modals';

const PromptConfirmModal: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const dispatch = useDispatch();
	const { isOpen = false, title, subtitle, onConfirm } = useSelector((state) => state.modals.ui.promptConfirmModal);

	return (
		<ConfirmModal
			colorMode={colorMode}
			renderCancel={({ icon, category, ...rest }) => (
				<IconButton {...rest}>
					<IconButtonIcon icon={icon} category={category} />
				</IconButton>
			)}
			isOpen={isOpen}
			onClose={() => dispatch(setPromptConfirmModal({ ...defaultPromptConfirmModal }))}
		>
			<ConfirmModalStack spacing={spacing} p={spacing}>
				<ConfirmModalIcon
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['6xl']}
							height={theme.fontSizes['6xl']}
							fontSize={theme.fontSizes['6xl']}
							icon='question_mark'
						/>
					)}
					color={color}
					p={2}
				/>

				<ConfirmModalBody>
					<ConfirmModalTitle>{title}</ConfirmModalTitle>
					<ConfirmModalSubtitle>{subtitle}</ConfirmModalSubtitle>
				</ConfirmModalBody>
				<ConfirmModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<Button {...props} color={color} onClick={onConfirm}>
							Yes
						</Button>
					)}
				/>
			</ConfirmModalStack>
		</ConfirmModal>
	);
};

export default PromptConfirmModal;
