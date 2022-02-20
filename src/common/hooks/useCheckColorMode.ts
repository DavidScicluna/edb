import { useState, useCallback, useEffect } from 'react';

import _ from 'lodash';

import { handleCheckSystemColorMode } from '../utils';

type Mode = 'light' | 'dark';

const useCheckColorMode = (isSystemMode = false): Mode => {
	const [mode, setMode] = useState<Mode>('light');

	const handleUpdateColorMode = useCallback(
		_.debounce(() => {
			setMode(handleCheckSystemColorMode());
		}, 500),
		[setMode, handleCheckSystemColorMode]
	);

	useEffect(() => {
		if (isSystemMode) {
			handleUpdateColorMode();
		}

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', () => (isSystemMode ? handleUpdateColorMode() : undefined));

		return () =>
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', () => (isSystemMode ? handleUpdateColorMode() : undefined));
	}, []);

	return mode;
};

export default useCheckColorMode;
