import { FC, useCallback } from 'react';

import { BrowserRouter as RRRouter, BrowserRouterProps as RouterProps } from 'react-router-dom';

import { useEffectOnce } from 'usehooks-ts';

const basename = process.env.PUBLIC_URL;

const Router: FC<RouterProps> = ({ children }) => {
	const handleRedirectToBasename = useCallback(() => {
		if (!window.location.pathname.includes(basename)) {
			window.history.replaceState('', '', `${basename}${window.location.pathname}`);
			window.location.reload();
		}
	}, [window, basename]);

	useEffectOnce(() => handleRedirectToBasename());

	return <RRRouter basename={basename}>{children}</RRRouter>;
};

export default Router;
