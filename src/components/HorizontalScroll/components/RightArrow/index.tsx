import { ReactElement, useContext, useEffect } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import { useBoolean } from '@chakra-ui/react';

import { RightArrowProps } from './types';

import Arrow from '../Arrow';

const RightArrow = ({ isDisabled: isDisabledProp = false }: RightArrowProps): ReactElement => {
	const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } = useContext(VisibilityContext);

	const [isDisabled, setIsDisabled] = useBoolean(!visibleItemsWithoutSeparators.length && isLastItemVisible);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (isLastItemVisible) {
				setIsDisabled.on();
			} else {
				setIsDisabled.off();
			}
		}
	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

	return <Arrow direction='right' isDisabled={isDisabledProp || isDisabled} onClick={() => scrollNext()} />;
};

export default RightArrow;
