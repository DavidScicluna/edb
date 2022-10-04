import { useContext } from 'react';

import { NoUndefinedField } from '@davidscicluna/component-library';

import { LayoutContext } from '../..';
import { LayoutContext as LayoutContextType } from '../../types';
import {
	isGuest as defaultIsGuest,
	isAuthenticationRoute as defaultIsAuthenticationRoute,
	spacing as defaultSpacing
} from '../data/defaultPropValues';

const useLayoutContext = (): NoUndefinedField<LayoutContextType> => {
	const {
		isGuest = defaultIsGuest,
		isAuthenticationRoute = defaultIsAuthenticationRoute,
		spacing = defaultSpacing
	} = useContext<LayoutContextType>(LayoutContext);

	return { isGuest, isAuthenticationRoute, spacing };
};

export default useLayoutContext;
