import { ReactElement } from 'react';

import { Badge, BadgeLabel, Skeleton } from '@davidscicluna/component-library';

import { CertificationProps } from './types';

const Certification = (props: CertificationProps): ReactElement => {
	const { certification, fontSize, isLoading = true } = props;

	return (
		<Badge size={fontSize} variant='outlined'>
			<BadgeLabel>
				{isLoading ? (
					// TODO: FIX Skeleton
					<Skeleton isLoaded={!isLoading} type='text' />
				) : (
					certification || 'Movie Certification'
				)}
			</BadgeLabel>
		</Badge>
	);
};

export default Certification;
