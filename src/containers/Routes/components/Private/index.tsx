import React, { ReactElement, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isEmpty, isNil } from 'lodash';

import { useSelector } from '../../../../common/hooks';

const Private = (): ReactElement => {
	const user = useSelector((state) => state.app.data.user);

	return isNil(user) || isEmpty(user) ? <Navigate to='/signin' replace /> : <Outlet />;
};

export default memo(Private);
