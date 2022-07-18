import { FC } from 'react';

import { useLocation } from 'react-router-dom';

import { useTheme, Divider, utils } from '@davidscicluna/component-library';

import { useDisclosure, Popover, PopoverTrigger, PopoverContent, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';

import SignOut from './components/SignOut';
import Header from './components/Header';
import Actions from './components/Actions';
import { UserPopperProps } from './types';

const { getColor } = utils;

const UserPopper: FC<UserPopperProps> = ({ renderAction, placement = 'bottom-end', gutter = 8, ...rest }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const location = useLocation();

	const { isOpen: isPopperOpen, onOpen: onPopperOpen, onClose: onPopperClose } = useDisclosure();

	useUpdateEffect(() => onPopperClose(), [location.pathname]);

	return (
		<Popover
			{...rest}
			isOpen={isPopperOpen}
			placement={placement}
			gutter={gutter}
			onOpen={() => onPopperOpen()}
			onClose={() => onPopperClose()}
		>
			<PopoverTrigger>
				{renderAction({
					isOpen: isPopperOpen,
					onOpen: onPopperOpen,
					onClose: onPopperClose
				})}
			</PopoverTrigger>
			<PopoverContent
				width='auto'
				minWidth='275px'
				backgroundColor={getColor({ theme, colorMode, type: 'background' })}
				borderRadius='lg'
				borderWidth='2px'
				borderStyle='solid'
				borderColor={getColor({ theme, colorMode, type: 'divider' })}
				boxShadow='2xl'
				p={2}
				_focus={{ boxShadow: '2xl' }}
			>
				<VStack width='100%' divider={<Divider />} spacing={2}>
					<Header />

					<Actions />

					<SignOut />
				</VStack>
			</PopoverContent>
		</Popover>
	);
};

export default UserPopper;
