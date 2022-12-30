import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../common/hooks';

const DummyMovieInfoRuntime: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='hourglass_empty' category='outlined' />}
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>##</Text>
				</Skeleton>
			)}
		/>
	);
};

export default DummyMovieInfoRuntime;
