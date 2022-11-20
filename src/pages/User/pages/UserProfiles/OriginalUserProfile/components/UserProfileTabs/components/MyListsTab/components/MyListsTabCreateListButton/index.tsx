import { FC } from 'react';

import { Tooltip, IconButton, IconButtonIcon, Divider } from '@davidscicluna/component-library';

import { useBoolean, HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../common/hooks';

import { MyListsTabCreateListButtonProps } from './types';

const MyListsTabCreateListButton: FC<MyListsTabCreateListButtonProps> = ({ onCreateListOpen }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<HStack alignItems='stretch' justifyContent='stretch' spacing={1} ml={1}>
			<Divider colorMode={colorMode} orientation='vertical' my={0.5} />

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
		</HStack>
	);
};

export default MyListsTabCreateListButton;
