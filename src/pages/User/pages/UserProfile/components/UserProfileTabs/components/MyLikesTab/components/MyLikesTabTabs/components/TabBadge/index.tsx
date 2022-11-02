import { FC, useRef } from 'react';

import { useTheme, Badge, BadgeLabel, Nullable, utils } from '@davidscicluna/component-library';

import numbro from 'numbro';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useCountUp } from 'react-countup';
import { memoize } from 'lodash';

import { TabBadgeProps } from './types';

const { convertStringToNumber } = utils;

const TabBadge: FC<TabBadgeProps> = ({ color, colorMode, total = 0, variant }) => {
	const theme = useTheme();

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
		<Badge color={color} colorMode={colorMode} size='xs' variant={variant}>
			<BadgeLabel>
				<p ref={countUpRef} />
			</BadgeLabel>
		</Badge>
	);
};

export default TabBadge;
