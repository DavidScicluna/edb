import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, VStack, HStack, Text, Fade } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';


import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import { Theme } from '../../../../../theme/types';
import Divider from '../../../../Divider';

import { HeaderProps, RenderMessageProps, RenderButtonProps } from './types';

const Header = ({ label, renderMessage, renderButton }: HeaderProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [ref, { height }] = useElementSize();

	const renderMessageProps: RenderMessageProps = {
		color: `gray.${colorMode === 'light' ? 900 : 50}`,
		fontSize: 'md',
		fontWeight: 'medium'
	};

	const renderButtonProps: RenderButtonProps = {
		color,
		size: 'sm',
		variant: 'text'
	};

	return isSm ? (
		<VStack width='100%' alignItems='flex-start' justifyContent='center' spacing={2}>
			<HStack width='100%' alignItems='center' justifyContent='space-between' spacing={2}>
				<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='md' fontWeight='bold'>
					{label}
				</Text>
				{renderButton({ ...renderButtonProps })}
			</HStack>
			{renderMessage({ ...renderMessageProps }) || null}
		</VStack>
	) : (
		<HStack width='100%' alignItems='center' justifyContent='space-between' spacing={2}>
			<Text align='left' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='md' fontWeight='bold'>
				{label}
			</Text>
			<HStack
				ref={ref}
				divider={
					<Fade
						in={renderMessage({ ...renderMessageProps })?.props.in}
						unmountOnExit
						style={{ marginLeft: theme.space[2], marginRight: theme.space[1] }}
					>
						<Divider orientation='vertical' height={`${height}px`} />
					</Fade>
				}
				spacing={0}
			>
				{renderMessage({ ...renderMessageProps }) || null}
				{renderButton({ ...renderButtonProps })}
			</HStack>
		</HStack>
	);
};

export default Header;
