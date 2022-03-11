import { ReactElement } from 'react';

import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

import { CertificationsProps } from './types';

import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

const Certifications = ({ certifications, onClick, onDelete }: CertificationsProps): ReactElement => {
	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	return (
		<Tag
			color={color}
			isClickable={!(isNil(onClick) || isEmpty(onClick))}
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
