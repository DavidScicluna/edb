import { ReactElement } from 'react';

import { HorizontalScroll } from '@davidscicluna/component-library';

import { useColorMode, Text } from '@chakra-ui/react';

import range from 'lodash/range';

import Person from './components/Person';
import { PeopleProps } from './types';

const Credit = ({ people = [], isLoading = true }: PeopleProps): ReactElement => {
	const { colorMode } = useColorMode();

	return (
		<HorizontalScroll
			renderDivider={({ padding }) => (
				<Text align='left' color={`gray.${colorMode === 'light' ? 900 : 50}`} fontSize='md' pr={padding}>
					,
				</Text>
			)}
			isDisabled={isLoading}
		>
			{!isLoading
				? people.map((person) => <Person key={person.id} person={person} isLoading={false} />)
				: range(0, 2).map((_dummy, index: number) => <Person key={index} isLoading />)}
		</HorizontalScroll>
	);
};

export default Credit;
