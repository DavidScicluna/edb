import { ReactElement } from 'react';

import { Skeleton } from '@davidscicluna/component-library';

import { VStack, Text, useColorMode } from '@chakra-ui/react';
import compact from 'lodash/compact';
import range from 'lodash/range';

import { handleReturnDates } from '../../../../../../../../../pages/View/pages/Person/components/OverviewTab/components/Bio';
import Label from '../../../../components/Label';

import { BioProps } from './types';

const Bio = ({ birthday, place_of_birth, deathday, bio, isLoading = true }: BioProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<Label width='100%' label='Bio'>
			{!isLoading ? (
				<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' noOfLines={3}>
					{bio
						? compact([
								birthday ? handleReturnDates(birthday, deathday, place_of_birth) : undefined,
								bio
						  ]).join('')
						: ''}
				</Text>
			) : (
				<VStack width='100%'>
					{range(0, 2).map((_dummy, index) => (
						<Skeleton key={index} width='100%' isLoaded={false} type='text'>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='md'
								whiteSpace='nowrap'
							>
								{`Person Bio ${index + 1}`}
							</Text>
						</Skeleton>
					))}
				</VStack>
			)}
		</Label>
	);
};

export default Bio;
