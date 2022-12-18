import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import ViewInfoItem from '../ViewInfoItem';
import { useUserTheme } from '../../../../../../common/hooks';

const ViewInfoDummyLanguagesItem: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='language' category='outlined' />}
			renderLabel={(props) => (
				<HStack
					divider={
						<Text {...props} mr={0.75}>
							,
						</Text>
					}
					spacing={0}
				>
					{range(2).map((_dummy, index) => (
						<Skeleton key={index} colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>Language Name</Text>
						</Skeleton>
					))}
				</HStack>
			)}
		/>
	);
};

export default ViewInfoDummyLanguagesItem;
