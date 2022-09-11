import { FC, createContext, useState } from 'react';

import { Card, CardProps as HorizontalGridProps } from '@davidscicluna/component-library';

import { useDebounce } from 'usehooks-ts';

import { ScrollContext } from '../types';

import { HorizontalGridContext as HorizontalGridContextType } from './types';

export const HorizontalGridContext = createContext<HorizontalGridContextType>({
	scroll: {} as ScrollContext,
	onSetScroll: () => undefined
});

const HorizontalGrid: FC<HorizontalGridProps> = ({ children, ...rest }) => {
	const [scroll, setScroll] = useState<ScrollContext>({} as ScrollContext);
	const scrollDebounced = useDebounce(scroll, 250);

	return (
		<HorizontalGridContext.Provider value={{ scroll: scrollDebounced, onSetScroll: (scroll) => setScroll(scroll) }}>
			<Card {...rest}>{children}</Card>
		</HorizontalGridContext.Provider>
	);
};

export default HorizontalGrid;
