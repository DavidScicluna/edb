import { ReactElement } from 'react';

import { useTheme, IconButton, Icon } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, useMediaQuery, Center, ScaleFade } from '@chakra-ui/react';

import merge from 'lodash/merge';
import { useElementSize } from 'usehooks-ts';

import { ArrowProps } from './types';
import useStyles from './styles';

const Arrow = (props: ArrowProps): ReactElement => {
	const theme = useTheme();
	const { colorMode: colorModeHook } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { colorMode: colorModeProp, direction, isDisabled = false, onClick } = props;

	const colorMode: ColorMode = colorModeProp || colorModeHook;

	const style = useStyles(theme, { isDisabled });

	const [ref, { width, height }] = useElementSize<HTMLButtonElement>();

	return (
		<Center
			width={`${width * 2}px`}
			minHeight={`${height}px`}
			height={'calc(100% + 2px)'}
			position='absolute'
			left={direction === 'left' ? 0 : undefined}
			right={direction === 'right' ? 0 : undefined}
			zIndex={5}
			sx={{
				top: '50%',
				transform: 'translateY(-50%)',
				transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
			}}
			_after={
				direction === 'left'
					? {
							...merge(
								{ ...style.arrow, width, minHeight: `${height}px`, height: '100%' },
								style[colorMode][direction]
							)
					  }
					: undefined
			}
			_before={
				direction === 'right'
					? {
							...merge(
								{ ...style.arrow, width, minHeight: `${height}px`, height: '100%' },
								style[colorMode][direction]
							)
					  }
					: undefined
			}
		>
			<ScaleFade in={!isDisabled} unmountOnExit style={{ height: '100%' }}>
				<Center height='100%' backgroundColor={`gray.${colorMode === 'light' ? 50 : 900}`}>
					<IconButton
						ref={ref}
						colorMode={colorMode}
						aria-label={`Scroll ${direction}`}
						onClick={() => onClick()}
						size={isSm ? 'sm' : 'md'}
						variant='icon'
						sx={{ back: { height: '100%' } }}
					>
						<Icon icon={direction === 'left' ? 'chevron_left' : 'chevron_right'} category='outlined' />
					</IconButton>
				</Center>
			</ScaleFade>
		</Center>
	);
};

export default Arrow;
