import { FC, createContext, useState, useCallback } from 'react';

import { TabsOnChangeProps, Tabs, Card } from '@davidscicluna/component-library';

import { useDebounce } from 'usehooks-ts';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../common/data/defaultPropValues';
import { ScrollContext } from '../types';

import { HorizontalGridTabbedContext as HorizontalGridTabbedContextType, HorizontalGridTabbedProps } from './types';

export const HorizontalGridTabbedContext = createContext<HorizontalGridTabbedContextType>({
	scroll: {} as ScrollContext,
	onSetScroll: () => undefined
});

const HorizontalGridTabbed: FC<HorizontalGridTabbedProps> = (props) => {
	const { children, color = defaultColor, colorMode = defaultColorMode, onChange, cardProps, ...rest } = props;

	const [scroll, setScroll] = useState<ScrollContext>({} as ScrollContext);
	const scrollDebounced = useDebounce(scroll, 250);

	const handleOnChange = useCallback(
		({ index }: TabsOnChangeProps): void => {
			setTimeout(
				() => scrollDebounced.scrollToItem(scrollDebounced.getItemById(scrollDebounced.items.toItems()[0])),
				500
			);

			if (onChange) {
				onChange({ index });
			}
		},
		[scrollDebounced, onChange]
	);

	return (
		<HorizontalGridTabbedContext.Provider
			value={{ scroll: scrollDebounced, onSetScroll: (scroll) => setScroll(scroll) }}
		>
			<Tabs {...rest} color={color} colorMode={colorMode} onChange={handleOnChange}>
				<Card {...cardProps} colorMode={colorMode} spacing={cardProps?.spacing || 0}>
					{children}
				</Card>
			</Tabs>
		</HorizontalGridTabbedContext.Provider>
	);
};

export default HorizontalGridTabbed;
