import { FC } from 'react';

import { Skeleton, Icon } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';
import ViewInfoItem from '../../../../../../components/ViewInfo/components/ViewInfoItem';

import { DummyMovieInfoCashProps } from './types';

const DummyMovieInfoCash: FC<DummyMovieInfoCashProps> = ({ type }) => {
	const { colorMode } = useUserTheme();

	return (
		<ViewInfoItem
			renderIcon={(props) => (
				<Icon {...props} icon={type === 'budget' ? 'savings' : 'paid'} category='outlined' />
			)}
			renderLabel={(props) => (
				<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
					<Text {...props} textTransform='uppercase'>
						##
					</Text>
				</Skeleton>
			)}
		/>
	);
};

export default DummyMovieInfoCash;
