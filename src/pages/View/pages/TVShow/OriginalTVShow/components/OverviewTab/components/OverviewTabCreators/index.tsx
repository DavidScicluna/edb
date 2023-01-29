import { FC } from 'react';

import { compact } from 'lodash';

import { useTVShowContext } from '../../../../common/hooks';

import OverviewTabCreator from './components/OverviewTabCreator';

const OverviewTabCreators: FC = () => {
	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};
	const { created_by: creators = [] } = show || {};

	return creators.length > 0 ? (
		<>
			{compact(
				creators.map((person) =>
					person && person.id ? <OverviewTabCreator key={person.id} id={person.id} /> : null
				)
			)}
		</>
	) : null;
};

export default OverviewTabCreators;
