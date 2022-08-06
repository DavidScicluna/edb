import { memoize } from 'lodash';

import logo from './logo';
import { SplashscreenLogoStyleProps, SplashscreenLogoStyleReturn } from './types';

export default memoize((props: SplashscreenLogoStyleProps): SplashscreenLogoStyleReturn => {
	return { logo: logo({ ...props }) };
});
