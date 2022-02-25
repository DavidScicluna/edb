import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';

import { ToastProps } from './types';

import Button from '../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../components/Clickable/IconButton';
import Icon from '../../../../../../components/Icon';

const Toast = (props: ToastProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { list, onEdit, onDelete, onClose } = props;

	return (
		<HStack
			backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
			borderRadius='full'
			boxShadow='lg'
			spacing={2}
			px={2}
			py={1.5}
			mb={1.5}
		>
			<HStack spacing={0.25}>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 50 : 900}`}
					fontSize={isSm ? 'sm' : 'md'}
					fontWeight='normal'
					whiteSpace='nowrap'
				>
					{`${list ? `"${list.label}"` : ''} list`}
				</Text>
			</HStack>

			<HStack spacing={1}>
				{isSm ? (
					<IconButton
						aria-label='Edit selected list'
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						onClick={() => onEdit()}
						size='sm'
					>
						<Icon icon='edit' type='outlined' />
					</IconButton>
				) : (
					<Button
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						renderLeftIcon={({ fontSize }) => <Icon icon='edit' type='outlined' fontSize={fontSize} />}
						onClick={() => onEdit()}
					>
						Edit
					</Button>
				)}

				{isSm ? (
					<IconButton
						aria-label='Delete selected list'
						color='red'
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						onClick={() => onDelete()}
						size='sm'
					>
						<Icon icon='delete_outline' type='outlined' />
					</IconButton>
				) : (
					<Button
						color='red'
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						renderLeftIcon={({ fontSize }) => (
							<Icon icon='delete_outline' type='outlined' fontSize={fontSize} />
						)}
						onClick={() => onDelete()}
					>
						Delete
					</Button>
				)}
			</HStack>

			<IconButton
				aria-label='Close'
				colorMode={colorMode === 'light' ? 'dark' : 'light'}
				onClick={() => onClose()}
				size={isSm ? 'sm' : 'md'}
				variant='icon'
			>
				<Icon icon='close' type='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Toast;
