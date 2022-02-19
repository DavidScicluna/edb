import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Center, ScaleFade } from '@chakra-ui/react';

import {
	ChevronLeftOutlined as ChevronLeftOutlinedIcon,
	ChevronRightOutlined as ChevronRightOutlinedIcon
} from '@material-ui/icons';
import _ from 'lodash';
import { useElementSize } from 'usehooks-ts';

import useStyles from './styles';
import { ArrowProps } from './types';

import { Theme } from '../../../../theme/types';
import IconButton from '../../../Clickable/IconButton';

const Arrow = (props: ArrowProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { direction, isDisabled = false, onClick } = props;

	const style = useStyles(theme, { isDisabled });

	const [ref, { width, height }] = useElementSize<HTMLButtonElement>();

	return (
		<Center
			width={`${width * 2}px`}
			minHeight={`${height}px`}
			height='100%'
			position='absolute'
			left={direction === 'left' ? 0 : undefined}
			right={direction === 'right' ? 0 : undefined}
			zIndex={5}
			sx={{ ..._.merge({ top: '50%', transform: 'translateY(-50%)' }) }}
			_after={
				direction === 'left'
					? {
							..._.merge(
								{ ...style.arrow, width, minHeight: `${height}px`, height: '100%' },
								style[colorMode][direction]
							)
					  }
					: undefined
			}
			_before={
				direction === 'right'
					? {
							..._.merge(
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
						aria-label={`Scroll ${direction}`}
						onClick={() => onClick()}
						size={isSm ? 'sm' : 'md'}
						variant='icon'
						sx={{ back: { height: '100%' } }}
					>
						{direction === 'left' ? <ChevronLeftOutlinedIcon /> : <ChevronRightOutlinedIcon />}
					</IconButton>
				</Center>
			</ScaleFade>
		</Center>
	);
};

export default Arrow;
