import { ReactElement } from 'react';

import { useBreakpointValue } from '@chakra-ui/react';

import { sort } from 'fast-sort';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroStack from '../ViewHeroHStack';
import ViewHeroText from '../ViewHeroText';

import ViewHeroCrewPerson from './components/ViewHeroCrewPerson';
import { ViewHeroCrewMediaType, ViewHeroCrewProps } from './types';

const ViewHeroCrew = <MT extends ViewHeroCrewMediaType>(props: ViewHeroCrewProps<MT>): ReactElement => {
	const limit =
		useBreakpointValue<number>({
			'base': 4,
			'sm': 6,
			'md': 8,
			'lg': 10,
			'xl': 12,
			'2xl': 12
		}) || 8;

	const { label, crew = [], ...rest } = props;

	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label={label}>
			<ViewHeroStack>
				{sort([...crew])
					.desc(({ popularity }) => popularity)
					.filter((_person, index) => index < limit)
					.map((person) => (
						<ViewHeroCrewPerson {...person} key={person.id} />
					))}

				{crew.length > limit && (
					<ViewHeroText textTransform='capitalize'>{`+${crew.length - limit}`}</ViewHeroText>
				)}
			</ViewHeroStack>
		</ViewHeroLabel>
	);
};

export default ViewHeroCrew;
