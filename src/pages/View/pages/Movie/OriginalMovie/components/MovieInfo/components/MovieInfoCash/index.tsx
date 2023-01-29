import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import numbro from 'numbro';
import { capitalize } from 'lodash';

import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../../common/hooks';

import { MovieInfoCashProps } from './types';

const MovieInfoCash: FC<MovieInfoCashProps> = ({ type, cash }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Show full ${type} (tooltip)`}
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={`${capitalize(type)}: ${numbro(cash).formatCurrency({ thousandSeparated: true })}`}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => (
					<Icon {...props} icon={type === 'budget' ? 'savings' : 'paid'} category='outlined' />
				)}
				renderLabel={(props) => (
					<Text {...props} textTransform='uppercase'>
						{numbro(cash).format({ totalLength: 3, average: true })}
					</Text>
				)}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default MovieInfoCash;
