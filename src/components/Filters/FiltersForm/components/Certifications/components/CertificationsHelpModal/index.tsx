import { FC } from 'react';

import {
	Modal,
	ModalHeader,
	ModalStack,
	ModalBody,
	ModalFooter,
	Tooltip,
	IconButton,
	IconButtonIcon,
	Button,
	Icon
} from '@davidscicluna/component-library';

import { useDisclosure, useBoolean, VStack, Text } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import { useSelector, useUserTheme } from '../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';

import { CertificationsHelpModalProps } from './types';
import CertificationMeaning from './components/CertificationMeaning';

const CertificationsHelpModal: FC<CertificationsHelpModalProps> = ({ mediaType }) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const {
		isOpen: isCertificationsHelpModalOpen,
		onOpen: onCertificationsHelpModalOpen,
		onClose: onCertificationsHelpModalClose
	} = useDisclosure();

	const certifications = useSelector(
		(state) => state.options.data.certifications[mediaType]?.certifications?.US || []
	);

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<>
			<Tooltip
				aria-label='Open Certifications Help Modal (tooltip)'
				colorMode={colorMode}
				isOpen={isHovering}
				placement='top'
				label='Open Certifications Help Modal'
			>
				<IconButton
					aria-label='Open Certifications Help Modal'
					color={isCertificationsHelpModalOpen ? color : 'gray'}
					colorMode={colorMode}
					isActive={isCertificationsHelpModalOpen}
					onMouseEnter={() => setIsHovering.on()}
					onMouseLeave={() => setIsHovering.off()}
					onClick={onCertificationsHelpModalOpen}
					size='xs'
					variant='icon'
				>
					<IconButtonIcon
						icon={isCertificationsHelpModalOpen ? 'help' : 'help_outline'}
						category='outlined'
					/>
				</IconButton>
			</Tooltip>

			<Modal
				colorMode={colorMode}
				isOpen={isCertificationsHelpModalOpen}
				onClose={onCertificationsHelpModalClose}
				size='xl'
			>
				<ModalStack>
					<ModalHeader
						renderTitle={(props) => <Text {...props}>Certifications Meaning</Text>}
						renderCancel={({ icon, category, ...rest }) => (
							<IconButton {...rest}>
								<Icon icon={icon} category={category} />
							</IconButton>
						)}
					/>
					<ModalBody>
						<VStack width='100%' spacing={spacing}>
							{sort(certifications)
								.desc(({ order }) => order)
								.map((certification) => (
									<CertificationMeaning key={certification.certification} {...certification} />
								))}
						</VStack>
					</ModalBody>
					<ModalFooter
						renderAction={(props) => (
							<Button {...props} isFullWidth onClick={onCertificationsHelpModalClose} variant='outlined'>
								Cancel
							</Button>
						)}
					/>
				</ModalStack>
			</Modal>
		</>
	);
};

export default CertificationsHelpModal;
