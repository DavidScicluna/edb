import { ReactElement } from 'react';

import _ from 'lodash';

import { CertificationsProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import Tag from '../../../../Clickable/Tag';

const Certifications = ({ certifications, onClick, onDelete }: CertificationsProps): ReactElement => {
	const color = useSelector((state) => state.user.ui.theme.color);

	return (
		<Tag
			color={color}
			isClickable={!_.isNil(onClick) && !_.isEmpty(onClick)}
			onClick={onClick ? () => onClick() : undefined}
			onDelete={onDelete ? () => onDelete() : undefined}
			variant='outlined'
			sx={{ maxWidth: '400px' }}
		>
			{`Certification${certifications.length > 1 ? 's' : ''}: ${certifications.join(', ')}`}
		</Tag>
	);
};

export default Certifications;
