import { FC } from 'react';

import { compact } from 'lodash';

import ViewInfo from '../../../../../components/ViewInfo';
import ViewInfoPopularityItem from '../../../../../components/ViewInfo/components/ViewInfoPopularityItem';

import { PersonInfoProps } from './types';
import PersonInfoDate from './components/PersonInfoDate';
import PersonInfoDepartments from './components/PersonInfoDepartments';

const PersonInfo: FC<PersonInfoProps> = ({ person, movieDepartments = [], tvShowDepartments = [] }) => {
	const { popularity, birthday, deathday, place_of_birth } = person;

	return (
		<ViewInfo>
			{compact([
				popularity ? (
					<ViewInfoPopularityItem key='ds-edb-person-info-popularity' popularity={popularity} />
				) : null,

				birthday ? (
					<PersonInfoDate
						key='ds-edb-person-info-date'
						birthday={birthday}
						deathday={deathday}
						place_of_birth={place_of_birth}
					/>
				) : null,

				movieDepartments.length + tvShowDepartments.length > 0 ? (
					<PersonInfoDepartments
						key='ds-edb-person-info-departments'
						movieDepartments={movieDepartments}
						tvShowDepartments={tvShowDepartments}
					/>
				) : null
			])}
		</ViewInfo>
	);
};

export default PersonInfo;
