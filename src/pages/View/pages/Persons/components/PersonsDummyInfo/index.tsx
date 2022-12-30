import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Text, HStack } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { range } from 'lodash';

import ViewInfo from '../../../../components/ViewInfo';
import ViewInfoItem from '../../../../components/ViewInfo/components/ViewInfoItem';
import { useUserTheme } from '../../../../../../common/hooks';
import { formatDate } from '../../../../../../common/utils';
import ViewInfoDummyPopularityItem from '../../../../components/ViewInfo/components/ViewInfoDummyPopularityItem';

const PersonsDummyInfo: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfo>
			<ViewInfoDummyPopularityItem />

			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='cake' category='outlined' />}
				renderLabel={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>{formatDate({ date: dayjs(new Date()).toISOString() })}</Text>
					</Skeleton>
				)}
			/>

			<ViewInfoItem
				renderIcon={(props) => <Icon {...props} icon='work_outline' category='outlined' />}
				renderLabel={(props) => (
					<HStack width='100%' divider={<Text {...props}>•</Text>} spacing={0.75}>
						{range(4).map((_dummy, index) => (
							<Skeleton key={index} colorMode={colorMode} isLoaded={false} variant='text'>
								<Text {...props}>Department</Text>
							</Skeleton>
						))}
					</HStack>
				)}
			/>
		</ViewInfo>
	);
};

export default PersonsDummyInfo;
