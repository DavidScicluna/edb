import { FC, createContext, useState, useCallback } from 'react';

import {
	TabsOnChangeProps,
	Tabs,
	TabsProps as HorizontalGridTabbedProps,
	Card
} from '@davidscicluna/component-library';

import { useDebounce } from 'usehooks-ts';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { ScrollContext } from '../types';

import { HorizontalGridTabbedContext as HorizontalGridTabbedContextType } from './types';

export const HorizontalGridTabbedContext = createContext<HorizontalGridTabbedContextType>({
	scroll: {} as ScrollContext,
	onSetScroll: () => undefined
});

const HorizontalGridTabbed: FC<HorizontalGridTabbedProps> = (props) => {
	const { children, color = defaultColor, colorMode = defaultColorMode, onChange, ...rest } = props;

	const [scroll, setScroll] = useState<ScrollContext>({} as ScrollContext);
	const scrollDebounced = useDebounce(scroll, 250);

	const handleOnChange = useCallback(
		({ index }: TabsOnChangeProps): void => {
			scrollDebounced.scrollToItem(
				scrollDebounced.getItemById(scrollDebounced.items.toItems()[0]),
				'auto',
				'start'
			);

			if (onChange) {
				onChange({ index });
			}
		},
		[scrollDebounced]
	);

	return (
		<HorizontalGridTabbedContext.Provider
			value={{ scroll: scrollDebounced, onSetScroll: (scroll) => setScroll(scroll) }}
		>
			<Tabs color={color} colorMode={colorMode} onChange={handleOnChange}>
				<Card {...rest} colorMode={colorMode} spacing={0}>
					{children}
				</Card>
			</Tabs>
		</HorizontalGridTabbedContext.Provider>
	);
};

export default HorizontalGridTabbed;
