import { FC, useState } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Divider, utils } from '@davidscicluna/component-library';

import { useDisclosure, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, VStack } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';

import SignOut from './components/SignOut';
import Header from './components/Header';
import Actions from './components/Actions';
import { UserPopperProps } from './types';

const { convertREMToPixels, convertStringToNumber, getColor } = utils;

// TODO: Extract Popover into a component called Popper in component-library

const UserPopper: FC<UserPopperProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const location = useLocation();

	const { isOpen = false, onOpen, onClose, renderAction, placement = 'bottom-end', gutter = 8, ...rest } = props;

	const { isOpen: isPopperOpen, onOpen: onPopperOpen, onClose: onPopperClose } = useDisclosure();

	const [background, setBackground] = useState<string>(getColor({ theme, colorMode, type: 'background' }));
	const [border, setBorder] = useState<string>(getColor({ theme, colorMode, type: 'divider' }));

	useUpdateEffect(() => setBackground(getColor({ theme, colorMode, type: 'background' })), [colorMode]);
	useUpdateEffect(() => setBorder(getColor({ theme, colorMode, type: 'divider' })), [colorMode]);

	useUpdateEffect(() => (onClose ? onClose() : onPopperClose()), [location.pathname]);

	return (
		<Popover
			{...rest}
			arrowSize={convertREMToPixels(convertStringToNumber(theme.space[1.5], 'rem'))}
			arrowShadowColor={border}
			isOpen={isOpen || isPopperOpen}
			placement={placement}
			gutter={gutter}
			onOpen={() => (onOpen ? onOpen() : onPopperOpen())}
			onClose={() => (onClose ? onClose() : onPopperClose())}
		>
			<PopoverTrigger>
				{renderAction({
					isOpen: isOpen || isPopperOpen,
					onOpen: onPopperOpen,
					onClose: onClose ? onClose : onPopperClose
				})}
			</PopoverTrigger>
			<Portal>
				<PopoverContent
					width='auto'
					minWidth='275px'
					maxWidth='350px'
					borderRadius='lg'
					borderWidth='2px'
					borderStyle='solid'
					borderColor={border}
					boxShadow='none'
					_focus={{ boxShadow: 'none' }}
				>
					<PopoverArrow
						background={`${background} !important`}
						borderWidth='2px'
						borderStyle='solid'
						borderColor={border}
						boxShadow='none !important'
					/>

					<VStack
						width='100%'
						background={background}
						borderRadius='inherit'
						divider={<Divider colorMode={colorMode} />}
						spacing={2}
						p={2}
					>
						<Header />

						<Actions />

						<SignOut />
					</VStack>
				</PopoverContent>
			</Portal>
		</Popover>
	);
};

export default UserPopper;
