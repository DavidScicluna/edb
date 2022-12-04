import { FC } from 'react';

import { usePersonContext } from '../../../../common/hooks';
import CreditsTabMediaTypeTab from '../CreditsTabMediaTypeTab';

import { CreditsTabTVShowsTabProps } from './types';

const CreditsTabTVShowsTab: FC<CreditsTabTVShowsTabProps> = ({ tvShowDepartments = [] }) => {
	const { tvShowCreditsQuery } = usePersonContext();

	return <CreditsTabMediaTypeTab mediaType='tv' departments={tvShowDepartments} query={tvShowCreditsQuery} />;
};

export default CreditsTabTVShowsTab;
