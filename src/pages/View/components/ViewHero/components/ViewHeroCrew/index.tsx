import { ReactElement } from 'react';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroStack from '../ViewHeroHStack';

import ViewHeroCrewPerson from './components/ViewHeroCrewPerson';
import { ViewHeroCrewMediaType, ViewHeroCrewProps } from './types';

const ViewHeroCrew = <MT extends ViewHeroCrewMediaType>(props: ViewHeroCrewProps<MT>): ReactElement => {
	const { label, crew = [], ...rest } = props;

	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label={label}>
			<ViewHeroStack>
				{crew.map((person) => (
					<ViewHeroCrewPerson {...person} key={person.id} />
				))}
			</ViewHeroStack>
		</ViewHeroLabel>
	);
};

export default ViewHeroCrew;
