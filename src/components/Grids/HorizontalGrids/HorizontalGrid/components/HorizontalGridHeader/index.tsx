import { FC, useContext, useEffect } from 'react';

import { useTheme, CardHeader, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, HStack } from '@chakra-ui/react';

import { useDebounce } from 'usehooks-ts';

import Arrows from '../../../components/Arrows';
import { ScrollContext } from '../../../types';
import { HorizontalGridContext as HorizontalGridContextType } from '../../types';
import { HorizontalGridContext } from '../..';

import { HorizontalGridHeaderProps } from './types';

const { convertStringToNumber } = utils;

const HorizontalGridHeader: FC<HorizontalGridHeaderProps> = ({ actions, arrowProps, ...rest }) => {
	const theme = useTheme();

	const { scroll } = useContext<HorizontalGridContextType>(HorizontalGridContext);
	const {
		isFirstItemVisible = false,
		isLastItemVisible = false,
		visibleItemsWithoutSeparators = [],
		initComplete = false,
		scrollPrev,
		scrollNext
	} = scroll as ScrollContext;

	const duration = useConst<number>(convertStringToNumber(theme.transition.duration.normal, 'ms'));

	const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useBoolean();
	const debouncedIsLeftArrowDisabled = useDebounce<boolean>(isLeftArrowDisabled, duration);

	const [isRightArrowDisabled, setIsRightArrowDisabled] = useBoolean();
	const debouncedIsRightArrowDisabled = useDebounce<boolean>(isRightArrowDisabled, duration);

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
