import { FC, useState } from 'react';

import { useTheme, Fade, utils } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, Center, AspectRatio } from '@chakra-ui/react';

import { transparentize } from 'color2k';
import { useUpdateEffect } from 'usehooks-ts';

import { colorMode as defaultColorMode } from '../../../common/data/defaultPropValues';
import { getRatio } from '../../../common/utils';

import { ClickableMediaProps } from './types';

const { getColor } = utils;

const ClickableMedia: FC<ClickableMediaProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook = defaultColorMode } = useColorMode();

	const {
		children,
		color = 'gray',
		colorMode = colorModeHook,
		ratio = getRatio({ orientation: 'portrait' }),
		isActive = false,
		isDisabled = false,
		onClick,
		renderIcon,
		...rest
	} = props;

	const [background, setBackground] = useState<string>(
		transparentize(getColor({ theme, colorMode, type: 'background' }), 0.8)
	);

	const [isHovering, setIsHovering] = useBoolean();

	useUpdateEffect(
		() => setBackground(transparentize(getColor({ theme, colorMode, type: 'background' }), 0.8)),
		[colorMode]
	);

	return (
		<AspectRatio {...rest} ratio={ratio}>
			<Center
				width='100%'
				height='100%'
				aria-disabled={isDisabled}
				onClick={children && !isDisabled && onClick ? (event) => onClick(event) : undefined}
				onMouseEnter={children && !isDisabled ? () => setIsHovering.on() : undefined}
				onMouseLeave={children && !isDisabled ? () => setIsHovering.off() : undefined}
				sx={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative' }}
				_disabled={{ cursor: 'default', pointerEvents: 'none' }}
			>
				{!isDisabled && (
					<Center
						width='100%'
						height='100%'
						position='absolute'
						zIndex={1}
						sx={{
							background: isHovering || isActive ? background : theme.colors.transparent,
							backgroundColor: isHovering || isActive ? background : theme.colors.transparent
						}}
					>
						<Fade in={isHovering || isActive}>
							{renderIcon({ color: getColor({ theme, colorMode, color, type: 'background' }) })}
						</Fade>
					</Center>
				)}

				{children}
			</Center>
		</AspectRatio>
	);
};

export default ClickableMedia;
