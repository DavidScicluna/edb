import { FC } from 'react';

import { UserGenres } from '../../../../../../../../components';

import { GenresStepProps } from './types';

const GenresStep: FC<GenresStepProps> = (props) => {
	return <UserGenres {...props} />;
};

export default GenresStep;
