import { ReactElement } from 'react';

import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import SkeletonText from '../../../../../../../../components/Skeleton/Text';

import { CertificationProps } from './types';

const Certification = (props: CertificationProps): ReactElement => {
	const { certification, fontSize, isLoading = true } = props;

	return (
		<Badge size={fontSize} variant='outlined'>
			<BadgeLabel>
				{/* TODO: FIX SkeletonText */}
				{isLoading ? <SkeletonText isLoaded={!isLoading} /> : certification || 'TV Show Certification'}
			</BadgeLabel>
		</Badge>
	);
};

export default Certification;
