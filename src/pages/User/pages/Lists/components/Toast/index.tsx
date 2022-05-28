import { ReactElement } from 'react';

import { Button, IconButton, Icon } from '@davidscicluna/component-library';

import { useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../common/hooks';

import { ToastProps } from './types';

const Toast = (props: ToastProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const user = useSelector((state) => state.app.data.user);

	const { list, onEdit, onDelete, onClose } = props;

	const isDisabled: boolean = isNil(user) || isEmpty(user);

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
						isDisabled={isDisabled}
						onClick={() => onEdit()}
						size='sm'
					>
						<Icon icon='edit' category='outlined' />
					</IconButton>
				) : (
					<Button
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						renderLeft={({ fontSize }) => <Icon icon='edit' category='outlined' fontSize={fontSize} />}
						isDisabled={isDisabled}
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
						isDisabled={isDisabled}
						onClick={() => onDelete()}
						size='sm'
					>
						<Icon icon='delete_outline' category='outlined' />
					</IconButton>
				) : (
					<Button
						color='red'
						colorMode={colorMode === 'light' ? 'dark' : 'light'}
						renderLeft={({ fontSize }) => (
							<Icon icon='delete_outline' category='outlined' fontSize={fontSize} />
						)}
						isDisabled={isDisabled}
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
				<Icon icon='close' category='outlined' />
			</IconButton>
		</HStack>
	);
};

export default Toast;
