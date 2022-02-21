import { ReactElement } from 'react';

import { VStack, Text, useColorMode } from '@chakra-ui/react';

import _ from 'lodash';

import { OverviewProps } from './types';

import SkeletonText from '../../../../../../../../../components/Skeleton/Text';
import Label from '../../../../components/Label';

const Overview = ({ overview, isLoading = true }: OverviewProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Label width='100%' label='Overview'>
			{!isLoading ? (
				<Text
					align='left'
					color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
					fontSize='md'
					isTruncated
					overflow='hidden'
					whiteSpace='normal'
					sx={{
						'display': '-webkit-box !important',
						'-webkit-line-clamp': '3',
						'-webkit-box-orient': 'vertical'
					}}
				>
					{overview || 'TV Show Overview'}
				</Text>
			) : (
				<VStack width='100%'>
					{_.range(0, 2).map((_dummy, index) => (
						<SkeletonText key={index} width='100%' fontSize='md' isLoaded={false}>
							<Text
								align='left'
								color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
								fontSize='md'
								whiteSpace='nowrap'
							>
								{`TV Show Overview ${index + 1}`}
							</Text>
						</SkeletonText>
					))}
				</VStack>
			)}
		</Label>
	);
};

export default Overview;