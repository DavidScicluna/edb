import { ReactElement } from 'react';
import { Badge, BadgeLabel } from '@davidscicluna/component-library';

import { CertificationProps } from './types';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';

const Certification = (props: CertificationProps): ReactElement => {
	const { certification, fontSize, isLoading = true } = props;

	return (
		<Badge size={fontSize} variant='outlined'>
			<BadgeLabel>
				{isLoading ? (
					// TODO: FIX SkeletonText
					<SkeletonText isLoaded={!isLoading} />
				) : (
					certification || 'Movie Certification'
				)}
			</BadgeLabel>
		</Badge>
	);
};

export default Certification;
