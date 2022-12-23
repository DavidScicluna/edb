import { FC } from 'react';

import { range, sample } from 'lodash';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroStack from '../ViewHeroHStack';

import ViewHeroDummyCrewPerson from './components/ViewHeroDummyCrewPerson';
import { ViewHeroDummyCrewProps } from './types';

const ViewHeroDummyCrew: FC<ViewHeroDummyCrewProps> = ({ label, ...rest }) => {
	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label={label}>
			<ViewHeroStack>
				{range(sample(range(2, 6)) || 4).map((_dummy, index) => (
					<ViewHeroDummyCrewPerson key={index} />
				))}
			</ViewHeroStack>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyCrew;
