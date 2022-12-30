import { FC } from 'react';

import { range, sample } from 'lodash';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroHStack from '../ViewHeroHStack';

import ViewHeroDummyCrewPerson from './components/ViewHeroDummyCrewPerson';
import { ViewHeroDummyCrewProps } from './types';

const ViewHeroDummyCrew: FC<ViewHeroDummyCrewProps> = ({ label, ...rest }) => {
	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label={label}>
			<ViewHeroHStack hasDivider={false}>
				{range(sample(range(2, 6)) || 4).map((_dummy, index) => (
					<ViewHeroDummyCrewPerson key={index} />
				))}
			</ViewHeroHStack>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyCrew;
