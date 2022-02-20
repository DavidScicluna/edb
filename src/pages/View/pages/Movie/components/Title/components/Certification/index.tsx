import { ReactElement } from 'react';

import { CertificationProps } from './types';

import Badge from '../../../../../../../../components/Badge';

const Certification = (props: CertificationProps): ReactElement => {
	const { certification, fontSize, isLoading = true } = props;

	return (
		<Badge size={fontSize} isLoading={isLoading} variant='outlined'>
			{certification || 'Movie Certification'}
		</Badge>
	);
};

export default Certification;
