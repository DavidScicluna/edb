import { FC } from 'react';

import { Tooltip, Icon } from '@davidscicluna/component-library';

import { useBoolean, Text } from '@chakra-ui/react';

import numbro from 'numbro';

import ViewInfoItem from '../../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { CollectionInfoTotalProps } from './types';

const CollectionInfoTotal: FC<CollectionInfoTotalProps> = ({ parts = [] }) => {
	const { colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Show full total (tooltip)`}
			colorMode={colorMode}
			isOpen={isHovering}
			placement='bottom-start'
			label={`Collection has a total of ${numbro(parts.length).format({ average: true })} ${formatMediaTypeLabel({
				type: parts.length === 1 ? 'single' : 'multiple',
				mediaType: 'movie'
			})}`}
			shouldWrapChildren
		>
			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='tag' category='outlined' />}
				renderLabel={(props) => (
					<Text {...props}>
						{`${numbro(parts.length).format({ average: true })} ${formatMediaTypeLabel({
							type: parts.length === 1 ? 'single' : 'multiple',
							mediaType: 'movie'
						})}`}
					</Text>
				)}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			/>
		</Tooltip>
	);
};

export default CollectionInfoTotal;
