import { ReactElement } from 'react';
import { BrowserRouter as RRDRouter } from 'react-router-dom';

import { RouterProps } from './types';

const Router = ({ children }: RouterProps): ReactElement => {
	return <RRDRouter basename={process.env.PUBLIC_URL}>{children}</RRDRouter>;
};

export default Router;
