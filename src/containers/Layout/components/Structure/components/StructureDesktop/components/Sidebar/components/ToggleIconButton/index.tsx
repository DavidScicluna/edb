import { FC } from 'react';

import { useTheme, IconButton, IconButtonIcon, utils } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { useElementSize } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';
import { toggleSidebarMode } from '../../../../../../../../../../store/slices/App';
import useStyles from '../../../../../../../../common/styles';

const { getColor } = utils;

const logoXlSize = 90;
const logoMdSize = 50;

const ToggleIconButton: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const [ref, { width, height }] = useElementSize();

	const style = useStyles({ theme });

	return (
		<Center
			ref={ref}
			position='absolute'
			top={`${sidebarMode === 'expanded' ? logoXlSize / 2 + height / 2 + 12 : logoMdSize / 2 + height / 2 - 8}px`}
			right={`-${width / 2}px`}
			zIndex='banner'
			background={getColor({ theme, colorMode, type: 'background' })}
			borderWidth='2px'
			borderStyle='solid'
			borderColor={getColor({ theme, colorMode, type: 'divider' })}
			borderRadius='full'
			sx={{ ...style }}
		>
			<IconButton
				aria-label={sidebarMode === 'expanded' ? 'Collapse navigation-bar' : 'Expand navigation-bar'}
				colorMode={colorMode}
				onClick={() => dispatch(toggleSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded'))}
				size='xs'
				variant='icon'
			>
				<IconButtonIcon icon={sidebarMode === 'expanded' ? 'remove' : 'add'} />
			</IconButton>
		</Center>
	);
};

export default ToggleIconButton;
