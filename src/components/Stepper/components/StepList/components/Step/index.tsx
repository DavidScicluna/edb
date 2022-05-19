import React, { ReactElement } from 'react';

import { useTheme, HStack, VStack, Fade } from '@chakra-ui/react';

import { merge } from 'lodash';
import { useElementSize } from 'usehooks-ts';

import { Theme } from '../../../../../../theme/types';
import useStyles from '../../common/styles';

import Description from './components/Description';
import Icon from './components/Icon';
import Status from './components/Status';
import { StepProps } from './types';


const Step = (props: StepProps): ReactElement => {
	const theme = useTheme<Theme>();

	const [ref, { width }] = useElementSize();

	const { color, colorMode, index, title, subtitle, status = 'idle', isDisabled = false, onClick } = props;

	const style = useStyles(theme, { color });

	return (
		<HStack
			aria-disabled={isDisabled}
			width='100%'
			minWidth='350px'
			maxWidth='350px'
			alignItems='flex-start'
			justifyContent='center'
			onClick={() => onClick()}
			spacing={4}
			sx={{ ...merge(style.step, style[colorMode][status], { px: 3 }) }}
			_disabled={{ ...merge(style.disabled) }}
		>
			<VStack
				width={`calc(100% - ${status !== 'idle' && status !== 'active' ? width + 32 : 0}px)`}
				height='100%'
				alignItems='inherit'
				justifyContent='inherit'
				spacing={0.5}
			>
				<Status color={color} colorMode={colorMode} status={status} />
				<Description colorMode={colorMode} index={index} title={title} subtitle={subtitle} />
			</VStack>

			{status !== 'idle' && status !== 'active' ? (
				<Fade in unmountOnExit style={{ height: '100%' }}>
					<Icon ref={ref} color={color} colorMode={colorMode} status={status} />
				</Fade>
			) : null}
		</HStack>
	);
};

export default Step;
