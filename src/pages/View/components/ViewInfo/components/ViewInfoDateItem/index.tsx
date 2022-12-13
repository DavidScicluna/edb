import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';
import { formatDate } from '../../../../../../common/utils';

import { ViewInfoDateItemProps } from './types';

const ViewInfoDateItem: FC<ViewInfoDateItemProps> = ({ date }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label='Show full date (tooltip)'
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={formatDate({ date })}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='schedule' category='outlined' />}
				renderLabel={(props) => <Text {...props}>{formatDate({ date, section: 'year' })}</Text>}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default ViewInfoDateItem;
