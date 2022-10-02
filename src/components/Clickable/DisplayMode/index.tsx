import { FC } from 'react';

import { useTheme, Tooltip, Button, Icon, utils } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { useDispatch } from 'react-redux';

import { useSelector, useUserTheme } from '../../../common/hooks';
import { toggleDisplayMode } from '../../../store/slices/App';

import { DisplayModeProps } from './types';

const { getColor } = utils;

const DisplayMode: FC<DisplayModeProps> = ({ isDisabled, ...rest }) => {
	const theme = useTheme();

	const { colorMode } = useUserTheme();

	const dispatch = useDispatch();
	const displayMode = useSelector((state) => state.app.ui.displayMode);

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Switch display-mode to ${displayMode === 'grid' ? 'List' : 'Grid'} mode (tooltip)`}
			colorMode={colorMode}
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
			placement='top'
			label={`Switch display-mode to ${displayMode === 'grid' ? 'List' : 'Grid'} mode`}
		>
			<Button
				{...rest}
				colorMode={colorMode}
				renderLeft={({ height }) => (
					<Icon
						width={`${height}px`}
						height={`${height}px`}
						fontSize={`${height}px`}
						icon='grid_on'
						category='outlined'
						color={getColor({
							theme,
							colorMode,
							type: `text.${displayMode === 'grid' ? 'primary' : 'secondary'}`
						})}
					/>
				)}
				renderRight={({ height }) => (
					<Icon
						width={`${height}px`}
						height={`${height}px`}
						fontSize={`${height}px`}
						icon='view_agenda'
						category='outlined'
						color={getColor({
							theme,
							colorMode,
							type: `text.${displayMode === 'list' ? 'primary' : 'secondary'}`
						})}
					/>
				)}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				onClick={() => dispatch(toggleDisplayMode(displayMode === 'grid' ? 'list' : 'grid'))}
				variant='outlined'
			>
				|
			</Button>
		</Tooltip>
	);
};

export default DisplayMode;
