import { ReactElement } from 'react';

import Badge from '../../../../../../../../components/Badge';

import { CertificationProps } from './types';


const Certification = (props: CertificationProps): ReactElement => {
	const { certification, fontSize, isLoading = true } = props;

	return (
		<Badge size={fontSize} isLoading={isLoading} variant='outlined'>
			{certification || 'Movie Certification'}
		</Badge>
	);
};

export default Certification;
