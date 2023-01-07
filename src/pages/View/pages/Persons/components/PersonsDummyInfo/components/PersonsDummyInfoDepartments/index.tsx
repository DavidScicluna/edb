import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../../../common/hooks';

const PersonsDummyInfoDepartments: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => <Icon {...props} icon='work_outline' category='outlined' />}
			renderLabel={(props) => (
				<HStack width='100%' divider={<Text {...props}>•</Text>} spacing={0.75}>
					{range(3).map((_dummy, index) => (
						<Skeleton key={index} colorMode={colorMode} isLoaded={false} variant='text'>
							<Text {...props}>Department</Text>
						</Skeleton>
					))}
				</HStack>
			)}
		/>
	);
};

export default PersonsDummyInfoDepartments;
