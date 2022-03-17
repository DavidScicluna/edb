import { ReactElement } from 'react';

import { Text } from '@chakra-ui/react';

import { ConfirmModalProps } from './types';

import Modal from '../Modal';

const ConfirmModal = (props: ConfirmModalProps): ReactElement => {
	const { colorMode, description, ...rest } = props;

	return (
		<Modal {...rest} colorMode={colorMode} isConfirm isCentered size='md'>
			<Text
				align='left'
				color={`gray.${colorMode === 'light' ? 900 : 50}`}
				fontSize='md'
				fontWeight='normal'
				p={2}
			>
				{description}
			</Text>
		</Modal>
	);
};

export default ConfirmModal;
