import { FC, useContext, useEffect } from 'react';

import { useTheme, CardHeader, TabList, Divider, utils } from '@davidscicluna/component-library';

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

	const { actions, tabListProps, iconButtonProps, ...rest } = props;

	const duration = useConst<number>(convertStringToNumber(theme.transition.duration.normal, 'ms'));

	const [isLeftArrowDisabled, setIsLeftArrowDisabled] = useBoolean();
	const debouncedIsLeftArrowDisabled = useDebounce<boolean>(isLeftArrowDisabled, duration);

	const [isRightArrowDisabled, setIsRightArrowDisabled] = useBoolean();
	const debouncedIsRightArrowDisabled = useDebounce<boolean>(isRightArrowDisabled, duration);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (!initComplete || (initComplete && isFirstItemVisible)) {
				setIsLeftArrowDisabled.off();
			} else {
				setIsLeftArrowDisabled.on();
			}
		}
	}, [initComplete, visibleItemsWithoutSeparators, isFirstItemVisible]);

	useEffect(() => {
		if (visibleItemsWithoutSeparators.length) {
			if (isLastItemVisible) {
				setIsRightArrowDisabled.off();
			} else {
				setIsRightArrowDisabled.on();
			}
		}
	}, [visibleItemsWithoutSeparators, isLastItemVisible]);

	return (
		<VStack width='100%' divider={<Divider />} spacing={2}>
			<CardHeader
				{...rest}
				actions={
					<HStack spacing={2}>
						{actions}

						<Arrows
							{...iconButtonProps}
							isLeftDisabled={debouncedIsLeftArrowDisabled}
							isRightDisabled={debouncedIsRightArrowDisabled}
							onLeftClick={scrollPrev}
							onRightClick={scrollNext}
						/>
					</HStack>
				}
			/>

			<TabList {...tabListProps} />
		</VStack>
	);
};

export default HorizontalGridTabbedHeader;
