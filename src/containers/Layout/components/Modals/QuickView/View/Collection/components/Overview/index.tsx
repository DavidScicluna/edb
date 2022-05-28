import { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';
import range from 'lodash/range';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Label from '../../../../components/Label';

import { OverviewProps } from './types';

const Overview = ({ overview, isLoading = true }: OverviewProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Label width='100%' label='Overview'>
			{!isLoading ? (
				<SkeletonText width='100%' fontSize='md' isLoaded>
					<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' noOfLines={10}>
						{overview || 'Collection Overview'}
					</Text>
				</SkeletonText>
			) : (
				<VStack width='100%'>
					{range(0, 2).map((_dummy, index) => (
						<SkeletonText key={index} width='100%' fontSize='md' isLoaded={false}>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='md'
								whiteSpace='nowrap'
							>
								{`Collection Overview ${index + 1}`}
							</Text>
						</SkeletonText>
					))}
				</VStack>
			)}
		</Label>
	);
};

export default Overview;
