import { ReactElement } from 'react';

import { BrowserRouter as RRDRouter, BrowserRouterProps as RouterProps } from 'react-router-dom';

const Router = ({ children }: RouterProps): ReactElement => {
	return <RRDRouter basename={process.env.PUBLIC_URL}>{children}</RRDRouter>;
};

export default Router;
