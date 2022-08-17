import { FC } from 'react';

import { useTheme, utils } from '@davidscicluna/component-library';

import {
	useBreakpointValue,
	AspectRatio,
	CircularProgress as Progress,
	CircularProgressLabel as ProgressLabel
} from '@chakra-ui/react';

import { merge, round } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../common/hooks';

import useStyles from './common/styles';

const { getColor } = utils;

const SpinnerLogo: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const logoMaxWidth = useBreakpointValue({
		'base': '50vw',
		'sm': '40vw',
		'md': '30vw',
		'lg': '25vw',
		'xl': '25vw',
		'2xl': '20vw'
	});

	const [ref, { width: logoWidth }] = useElementSize();

	const style = useStyles({ theme });

	return (
		<AspectRatio ref={ref} width={logoMaxWidth} ratio={1 / 1}>
			<Progress
				capIsRound
				color={getColor({ theme, colorMode, color, type: 'color' })}
				trackColor={getColor({ theme, colorMode, type: 'divider' })}
				size='100%'
				thickness='4px'
				isIndeterminate
			>
				<ProgressLabel
					sx={{
						...merge(style.logo, {
							color: getColor({ theme, colorMode, color, type: 'color' }),

							fontSize: `${round(logoWidth / 2.5)}px`
						})
					}}
				>
					edb
				</ProgressLabel>
			</Progress>
		</AspectRatio>
	);
};

export default SpinnerLogo;
