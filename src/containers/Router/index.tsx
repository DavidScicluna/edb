import { FC } from 'react';

import { BrowserRouter, BrowserRouterProps as RouterProps } from 'react-router-dom';

const Router: FC<RouterProps> = ({ children }) => {
	return <BrowserRouter basename={process.env.PUBLIC_URL}>{children}</BrowserRouter>;
};

export default Router;
