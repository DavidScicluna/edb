import { FC, useRef } from 'react';

import { Nullable, useTheme, utils } from '@davidscicluna/component-library';

import { Center, Stat as CUIStat, StatNumber, StatLabel } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { memoize } from 'lodash';
import numbro from 'numbro';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../common/hooks';

import { StatProps } from './types';

const { convertStringToNumber, getColor } = utils;

const Stat: FC<StatProps> = ({ total, label }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration['ultra-slow'], 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration['ultra-slow'], 'ms') / 1000,
		formattingFn: memoize((end): string => numbro(end).format({ average: true })),
		startOnMount: false
	});

	useEffectOnce(() => start());

	useUpdateEffect(() => update(total), [total]);

	return (
		<CUIStat width='100%'>
			<Center width='100%' flexDirection='column'>
				<StatNumber
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='3xl'
					fontWeight='medium'
					lineHeight='shorter'
					textTransform='uppercase'
					noOfLines={1}
				>
					<p ref={countUpRef} />
				</StatNumber>
				<StatLabel
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='xs'
					lineHeight='shorter'
					textTransform='uppercase'
					noOfLines={1}
				>
					{label}
				</StatLabel>
			</Center>
		</CUIStat>
	);
};

export default Stat;
