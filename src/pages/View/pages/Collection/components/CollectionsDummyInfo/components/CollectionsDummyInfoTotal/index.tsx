import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';
import { getMediaTypeIcon } from '../../../../../../../../common/utils';

const CollectionsDummyInfoTotal: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => (
				<Icon {...props} icon={getMediaTypeIcon({ mediaType: 'movie' })} category='outlined' />
			)}
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>##</Text>
				</Skeleton>
			)}
		/>
	);
};

export default CollectionsDummyInfoTotal;
