import { ReactElement, forwardRef } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, Center, AspectRatio } from '@chakra-ui/react';

import { transparentize } from 'color2k';
import { useElementSize } from 'usehooks-ts';

import Glass from '../../Glass';
import { Orientation, getOrientationByRatio } from '../../../common/utils/ratio';

import { ClickableMediaRef, ClickableMediaProps } from './types';

const { getColor } = utils;

// TODO: Maybe move to component-lib
const ClickableMedia = forwardRef<ClickableMediaRef, ClickableMediaProps>(function ClickableMedia(
	props,
	ref
): ReactElement {
	const theme = useTheme();
	const { colorMode: colorModeHook = 'light' } = useColorMode();

	const [iconRef, { width: iconWidth, height: iconHeight }] = useElementSize();

	const {
		children,
		color = 'gray',
		colorMode = colorModeHook,
		ratio,
		isActive = false,
		isDisabled = false,
		onClick,
		renderIcon,
		...rest
	} = props;

	const [isHovering, setIsHovering] = useBoolean();

	const orientation: Orientation = getOrientationByRatio({ width: iconWidth, height: iconHeight });

	return (
		<AspectRatio {...rest} ref={ref} ratio={ratio}>
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
						ref={iconRef}
						width='100%'
						height='100%'
						position='absolute'
						zIndex={1}
						sx={{
							opacity: isHovering || isActive ? 1 : 0,
							background: transparentize(getColor({ theme, colorMode, type: 'background' }), 0.75),

							transition: `${theme.transition.duration.normal} ${theme.transition.easing['ease-in-out']}`
						}}
					>
						<Glass
							width='auto !important'
							height='auto !important'
							backgroundColor={transparentize(getColor({ theme, colorMode, type: 'dark' }), 0.5)}
							borderRadius='full'
							size={1}
							p={2}
						>
							{renderIcon({
								width: `${orientation === 'landscape' ? iconWidth / 8 : iconWidth / 4}px`,
								height: `${orientation === 'landscape' ? iconWidth / 8 : iconWidth / 4}px`,
								fontSize: `${orientation === 'landscape' ? iconWidth / 8 : iconWidth / 4}px`,
								color: getColor({ theme, colorMode, color, type: 'light' }),
								colorMode
							})}
						</Glass>
					</Center>
				)}

				{children}
			</Center>
		</AspectRatio>
	);
});

export default ClickableMedia;
