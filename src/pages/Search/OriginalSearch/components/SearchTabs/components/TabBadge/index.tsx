import { FC } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import numbro from 'numbro';

import { TabBadgeProps } from './types';

const TabBadge: FC<TabBadgeProps> = ({ color, colorMode, total = 0, variant }) => {
	return (
		<Badge color={color} colorMode={colorMode} size='xs' variant={variant}>
			<BadgeLabel>{numbro(total).format({ average: true })}</BadgeLabel>
		</Badge>
	);
};

export default TabBadge;
