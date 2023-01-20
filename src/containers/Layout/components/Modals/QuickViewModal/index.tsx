import { FC } from 'react';

import { useLocation } from 'react-router';

import {
	Modal,
	ModalStack,
	ModalHeader,
	ModalBody,
	ModalFooter,
	InternalLink,
	IconButton,
	IconButtonIcon,
	Button
} from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../common/hooks';
import { defaultQuickViewModal, setQuickViewModal } from '../../../../../store/slices/Modals';
import { formatMediaType, formatMediaTypeLabel } from '../../../../../common/utils';

import QuickViewModalBody from './components/QuickViewModalBody';

const QuickViewModal: FC = () => {
	const { color, colorMode } = useUserTheme();

	const location = useLocation();

	const dispatch = useDispatch();
	const { isOpen, mediaType, mediaItem, title } = useSelector((state) => state.modals.ui.quickViewModal);

	const handleClose = (): void => {
		dispatch(setQuickViewModal({ ...defaultQuickViewModal }));
	};

	useUpdateEffect(() => handleClose(), [location.pathname]);

	return (
		<Modal colorMode={colorMode} isOpen={isOpen} onClose={handleClose} size='4xl'>
			<ModalStack>
				<ModalHeader
					renderTitle={(props) => <Text {...props}>Quick View</Text>}
					renderSubtitle={(props) => (
						<Text {...props}>
							{`Take a quick look at ${
								title ? title : `the ${formatMediaTypeLabel({ type: 'single', mediaType })}`
							}`}
						</Text>
					)}
					renderCancel={({ icon, category, ...rest }) => (
						<IconButton {...rest}>
							<IconButtonIcon icon={icon} category={category} />
						</IconButton>
					)}
				/>
				<ModalBody>
					<QuickViewModalBody mediaType={mediaType} mediaItem={mediaItem} />
				</ModalBody>
				<ModalFooter
					renderCancel={(props) => <Button {...props}>Cancel</Button>}
					renderAction={(props) => (
						<InternalLink
							to={{ pathname: `/${formatMediaType({ mediaType })}/${mediaItem?.id}` }}
							isDisabled={!mediaItem?.id}
						>
							<Button {...props} color={color}>
								View Full Details
							</Button>
						</InternalLink>
					)}
				/>
			</ModalStack>
		</Modal>
	);
};

export default QuickViewModal;
