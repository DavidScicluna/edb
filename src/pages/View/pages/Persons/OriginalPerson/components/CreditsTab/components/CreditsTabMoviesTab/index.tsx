import { FC } from 'react';

import { usePersonContext } from '../../../../common/hooks';
import CreditsTabMediaTypeTab from '../CreditsTabMediaTypeTab';

import { CreditsTabMoviesTabProps } from './types';

const CreditsTabMoviesTab: FC<CreditsTabMoviesTabProps> = ({ movieDepartments = [] }) => {
	const { movieCreditsQuery } = usePersonContext();

	return <CreditsTabMediaTypeTab mediaType='movie' departments={movieDepartments} query={movieCreditsQuery} />;
};

export default CreditsTabMoviesTab;
