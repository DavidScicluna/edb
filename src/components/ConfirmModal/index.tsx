import { ReactElement } from 'react';

import { ColorMode, useColorMode, Text } from '@chakra-ui/react';

import Modal from '../Modal';

import { ConfirmModalProps } from './types';


const ConfirmModal = (props: ConfirmModalProps): ReactElement => {
	const { colorMode: colorModeHook } = useColorMode();

	const { colorMode: colorModeProp, description, ...rest } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

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
