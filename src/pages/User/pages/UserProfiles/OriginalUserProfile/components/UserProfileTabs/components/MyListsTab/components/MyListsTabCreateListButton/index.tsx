import { FC } from 'react';

import { Tooltip, IconButton, IconButtonIcon, Divider } from '@davidscicluna/component-library';

import { useBoolean, HStack, Center } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../../../../../common/hooks';

import { MyListsTabCreateListButtonProps } from './types';

const MyListsTabCreateListButton: FC<MyListsTabCreateListButtonProps> = ({ onCreateListOpen }) => {
	const { colorMode } = useUserTheme();

	const [buttonRef, { height: buttonHeight }] = useElementSize();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<HStack spacing={0}>
			<Divider height={`${buttonHeight / 2}px`} colorMode={colorMode} orientation='vertical' mx={1} />

			<Center ref={buttonRef}>
				<Tooltip
					aria-label='Open Create List Modal (tooltip)'
					colorMode={colorMode}
					isOpen={isHovering}
					placement='top-end'
					label='Create List'
				>
					<IconButton
						aria-label='Open Create List Modal'
						colorMode={colorMode}
						onClick={() => onCreateListOpen()}
						onMouseEnter={() => setIsHovering.on()}
						onMouseLeave={() => setIsHovering.off()}
						variant='icon'
					>
						<IconButtonIcon icon='add' category='outlined' />
					</IconButton>
				</Tooltip>
			</Center>
		</HStack>
	);
};

export default MyListsTabCreateListButton;
