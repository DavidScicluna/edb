import { ReactElement } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { isEmpty, isNil } from 'lodash';
import { useEffectOnce } from 'usehooks-ts';

import { useSelector } from '../../../../common/hooks';

const Public = (): ReactElement => {
	const user = useSelector((state) => state.app.data.user);

	const navigate = useNavigate();

	useEffectOnce(() => {
		if (!(isNil(user) || isEmpty(user))) {
			navigate('/', { replace: true });
		}
	});

	return <Outlet />;
};

export default Public;
