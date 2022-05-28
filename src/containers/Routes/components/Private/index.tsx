import { ReactElement } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import { isEmpty, isNil } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';

const Private = (): ReactElement => {
	const user = useSelector((state) => state.app.data.user);

	const navigate = useNavigate();

	useEffectOnce(() => {
		if (isNil(user) || isEmpty(user)) {
			navigate('/signin', { replace: true });
		}
	});

	return <Outlet />;
};

export default Private;
