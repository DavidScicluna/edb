import { useState, useEffect } from 'react';

import { Duration, useTheme, utils } from '@davidscicluna/component-library';

// https://usehooks-ts.com/react-hook/use-debounce

const { convertStringToNumber } = utils;

const useDebounce = <T>(value: T, delay: Duration = 'normal'): T => {
	const theme = useTheme();

	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, convertStringToNumber(theme.transition.duration[delay], 'ms'));

		return () => clearTimeout(timer);
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
