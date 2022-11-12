import { FC, useContext, useEffect } from 'react';

import { useDebounce, CardHeader, TabList } from '@davidscicluna/component-library';

import { useBoolean, VStack, HStack } from '@chakra-ui/react';

import Arrows from '../../../components/Arrows';
import { ScrollContext } from '../../../types';
import { HorizontalGridTabbedContext as HorizontalGridTabbedContextType } from '../../types';
import { HorizontalGridTabbedContext } from '../..';

import { HorizontalGridTabbedHeaderProps } from './types';

const HorizontalGridTabbedHeader: FC<HorizontalGridTabbedHeaderProps> = (props) => {
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
