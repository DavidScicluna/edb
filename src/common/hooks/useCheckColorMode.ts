import { useState, useCallback, useEffect } from 'react';

import _ from 'lodash';

import { handleCheckSystemColorMode } from '../utils';

type Mode = 'light' | 'dark';

const useCheckColorMode = (): Mode => {
	const [mode, setMode] = useState<Mode>('light');

	const handleUpdateColorMode = useCallback(
		_.debounce(() => {
			setMode(handleCheckSystemColorMode());
		}, 500),
		[setMode, handleCheckSystemColorMode]
	);

	useEffect(() => {
		handleUpdateColorMode();

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => handleUpdateColorMode());

		return () =>
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', () => handleUpdateColorMode());
	}, []);

	return mode;
};

export default useCheckColorMode;
