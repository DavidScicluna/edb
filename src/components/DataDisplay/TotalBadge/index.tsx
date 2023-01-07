import { FC, useRef } from 'react';

import { useTheme, Badge, BadgeLabel, Nullable, utils } from '@davidscicluna/component-library';

import numbro from 'numbro';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useCountUp } from 'react-countup';
import { compact, memoize } from 'lodash';

import { TotalBadgeProps } from './types';

const { convertStringToNumber } = utils;

const TotalBadge: FC<TotalBadgeProps> = (props) => {
	const theme = useTheme();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const { color, colorMode, prefix, suffix, total = 0, size = 'xs', variant = 'contained' } = props;

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: total,
		delay: convertStringToNumber(theme.transition.duration['ultra-slow'], 'ms') / 1000,
		duration: convertStringToNumber(theme.transition.duration['ultra-slow'], 'ms') / 1000,
		formattingFn: memoize((end): string =>
			compact([prefix, numbro(end).format({ average: true }), suffix]).join(' ')
		),
		startOnMount: false
	});

	useEffectOnce(() => start());

	useUpdateEffect(() => update(total), [total]);

	return (
		<Badge color={color} colorMode={colorMode} size={size} variant={variant}>
			<BadgeLabel>
				<p ref={countUpRef} />
			</BadgeLabel>
		</Badge>
	);
};

export default TotalBadge;
