import { ReactElement, useContext, useEffect } from 'react';

import { useBoolean } from '@chakra-ui/react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';


import Arrow from '../Arrow';

import { LeftArrowProps } from './types';


const LeftArrow = ({ colorMode, isDisabled: isDisabledProp = false }: LeftArrowProps): ReactElement => {
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

	return (
		<Arrow
			colorMode={colorMode}
			direction='left'
			isDisabled={isDisabledProp || isDisabled}
			onClick={() => scrollPrev()}
		/>
	);
};

export default LeftArrow;
