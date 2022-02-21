import { ReactElement, useContext, useEffect } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { useBoolean } from '@chakra-ui/react';

import { LeftArrowProps } from './types';

import Arrow from '../Arrow';

const LeftArrow = ({ isDisabled: isDisabledProp = false }: LeftArrowProps): ReactElement => {
	const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
		useContext(VisibilityContext);

	const [isDisabled, setIsDisabled] = useBoolean(!initComplete || (initComplete && isFirstItemVisible));

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (isFirstItemVisible) {
				setIsDisabled.on();
			} else {
				setIsDisabled.off();
			}
		}
	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

	return <Arrow direction='left' isDisabled={isDisabledProp || isDisabled} onClick={() => scrollPrev()} />;
};

export default LeftArrow;