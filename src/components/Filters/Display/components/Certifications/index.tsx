import { ReactElement } from 'react';

import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';


import { useSelector } from '../../../../../common/hooks';
import { defaultUser, getUser } from '../../../../../store/slices/Users';
import Tag from '../../../../Clickable/Tag';

import { CertificationsProps } from './types';

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
