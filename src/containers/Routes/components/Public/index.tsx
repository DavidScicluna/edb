import React, { ReactElement, memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { isEmpty, isNil } from 'lodash';

import { useSelector } from '../../../../common/hooks';

const Public = (): ReactElement => {
	const user = useSelector((state) => state.app.data.user);

	return isNil(user) || isEmpty(user) ? <Outlet /> : <Navigate to='/' replace />;
};

export default memo(Public);
