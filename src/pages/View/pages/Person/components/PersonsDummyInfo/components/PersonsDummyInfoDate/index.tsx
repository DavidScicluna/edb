import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../common/hooks';

const PersonsDummyInfoDate: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='cake' category='outlined' />}
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props}>ddd, MMMM DD, YYYY</Text>
				</Skeleton>
			)}
		/>
	);
};

export default PersonsDummyInfoDate;
