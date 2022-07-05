import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { VStack, Text, useColorMode } from '@chakra-ui/react';

import range from 'lodash/range';

import Label from '../../../../components/Label';

import { OverviewProps } from './types';

const Overview = ({ overview, isLoading = true }: OverviewProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Label width='100%' label='Overview'>
			{!isLoading ? (
				<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' noOfLines={3}>
					{overview || 'TV Show Overview'}
				</Text>
			) : (
				<VStack width='100%'>
					{range(0, 2).map((_dummy, index) => (
						<Skeleton key={index} width='100%' isLoaded={false} variant='text'>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='md'
								whiteSpace='nowrap'
							>
								{`TV Show Overview ${index + 1}`}
							</Text>
						</Skeleton>
					))}
				</VStack>
			)}
		</Label>
	);
};

export default Overview;
