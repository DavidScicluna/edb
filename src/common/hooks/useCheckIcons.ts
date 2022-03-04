import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import _ from 'lodash';

import { toggleHasLoadedIcons } from '../../store/slices/App';

const useCheckIcons = (): boolean => {
	const dispatch = useDispatch();

	const [hasLoaded, setHasLoaded] = useState<boolean>(false);

	const handleCheckFonts = useCallback(
		_.debounce(() => {
			document.fonts.ready
				.then(() => dispatch(toggleHasLoadedIcons(true)))
				.catch(() => dispatch(toggleHasLoadedIcons(false)));
		}, 1000),
		[setHasLoaded]
	);

	useEffect(() => {
		if (!hasLoaded) {
			handleCheckFonts();
		}

		return () => setHasLoaded(false);
	}, []);

	return hasLoaded;
};

export default useCheckIcons;