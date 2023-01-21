import { FC } from 'react';

import { Icon, Skeleton } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';

const EpisodeInfoNumbers: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='tag' category='outlined' />}
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>S# • E#</Text>
				</Skeleton>
			)}
		/>
	);
};

export default EpisodeInfoNumbers;
