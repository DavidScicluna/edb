import { FC } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import ViewInfoItem from '../ViewInfoItem';

const ViewInfoDummyCertificationItem: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>####</Text>
				</Skeleton>
			)}
		/>
	);
};

export default ViewInfoDummyCertificationItem;
