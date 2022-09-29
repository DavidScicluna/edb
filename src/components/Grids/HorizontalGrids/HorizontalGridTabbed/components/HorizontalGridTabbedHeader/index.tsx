import { FC, useContext, useEffect } from 'react';

import { useTheme, CardHeader, TabList, utils } from '@davidscicluna/component-library';

import { useBoolean, useConst, VStack, HStack } from '@chakra-ui/react';

import { useDebounce } from 'usehooks-ts';

import Arrows from '../../../components/Arrows';
import { ScrollContext } from '../../../types';
import { HorizontalGridTabbedContext as HorizontalGridTabbedContextType } from '../../types';
import { HorizontalGridTabbedContext } from '../..';

import { HorizontalGridTabbedHeaderProps } from './types';

const { convertStringToNumber } = utils;

const HorizontalGridTabbedHeader: FC<HorizontalGridTabbedHeaderProps> = (props) => {
	const theme = useTheme();

	const { scroll } = useContext<HorizontalGridTabbedContextType>(HorizontalGridTabbedContext);
	const {
		isFirstItemVisible = false,
		isLastItemVisible = false,
		visibleItemsWithoutSeparators = [],
		initComplete = false,
		scrollPrev,
		scrollNext
	} = scroll as ScrollContext;

	const { cardHeaderProps, tabListProps, arrowProps, spacing = 2, ...rest } = props;

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
		<VStack {...rest} width='100%' spacing={spacing}>
			<CardHeader
				{...cardHeaderProps}
				actions={
					<HStack spacing={2}>
						{cardHeaderProps.actions}

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

			<TabList {...tabListProps} />
		</VStack>
	);
};

export default HorizontalGridTabbedHeader;
