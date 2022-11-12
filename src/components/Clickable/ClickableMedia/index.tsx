import { FC } from 'react';

import { useTheme, ScaleFade, utils } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, Center, AspectRatio } from '@chakra-ui/react';

import { transparentize } from 'color2k';

import { getRatio } from '../../../common/utils';

import { ClickableMediaProps } from './types';

const { getColor } = utils;

// TODO: Maybe move to component-lib

const ClickableMedia: FC<ClickableMediaProps> = (props) => {
	const theme = useTheme();
	const { colorMode: colorModeHook = 'light' } = useColorMode();

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

	const [isHovering, setIsHovering] = useBoolean();

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
						background={
							isHovering || isActive
								? transparentize(getColor({ theme, colorMode, type: 'background' }), 0.75)
								: theme.colors.transparent
						}
					>
						<ScaleFade in={isHovering || isActive} unmountOnExit={false}>
							<Center
								p={2}
								sx={{
									backdropFilter: `blur(${theme.space[2]})`,
									WebkitBackdropFilter: `blur(${theme.space[2]})`,
									backgroundColor: transparentize(getColor({ theme, colorMode, type: 'dark' }), 0.5),
									borderRadius: theme.radii.full,
									transitionProperty: 'all'
								}}
							>
								{renderIcon({ color: getColor({ theme, colorMode, color, type: 'light' }) })}
							</Center>
						</ScaleFade>
					</Center>
				)}

				{children}
			</Center>
		</AspectRatio>
	);
};

export default ClickableMedia;
