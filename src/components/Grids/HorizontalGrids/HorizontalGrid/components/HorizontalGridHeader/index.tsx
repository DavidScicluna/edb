import { FC, useContext, useEffect } from 'react';

import { useDebounce, CardHeader } from '@davidscicluna/component-library';

import { useBoolean, HStack } from '@chakra-ui/react';

import Arrows from '../../../components/Arrows';
import { ScrollContext } from '../../../types';
import { HorizontalGridContext as HorizontalGridContextType } from '../../types';
import { HorizontalGridContext } from '../..';

import { HorizontalGridHeaderProps } from './types';

const HorizontalGridHeader: FC<HorizontalGridHeaderProps> = ({ actions, arrowProps, ...rest }) => {
	const { scroll } = useContext<HorizontalGridContextType>(HorizontalGridContext);
	const {
		isFirstItemVisible = false,
		isLastItemVisible = false,
		visibleItemsWithoutSeparators = [],
		initComplete = false,
		scrollPrev,
		scrollNext
	} = scroll as ScrollContext;

	const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useBoolean();
	const debouncedIsLeftArrowDisabled = useDebounce<boolean>(isLeftArrowDisabled, 'ultra-fast');

	const [isRightArrowDisabled, setIsRightArrowDisabled] = useBoolean();
	const debouncedIsRightArrowDisabled = useDebounce<boolean>(isRightArrowDisabled, 'ultra-fast');

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (!initComplete || (initComplete && isFirstItemVisible)) {
				setIsLeftArrowDisabled.on();
			} else {
				setIsLeftArrowDisabled.off();
			}
		}
	}, [initComplete, visibleItemsWithoutSeparators, isFirstItemVisible]);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (isLastItemVisible) {
				setIsRightArrowDisabled.on();
			} else {
				setIsRightArrowDisabled.off();
			}
		}
	}, [visibleItemsWithoutSeparators, isLastItemVisible]);

	return (
		<CardHeader
			{...rest}
			actions={
				<HStack spacing={2}>
					{actions}

					<Arrows
						isLeftDisabled={debouncedIsLeftArrowDisabled}
						isRightDisabled={debouncedIsRightArrowDisabled}
						onLeftClick={() => scrollPrev()}
						onRightClick={() => scrollNext()}
						arrowProps={arrowProps}
					/>
				</HStack>
			}
		/>
	);
};

export default HorizontalGridHeader;
