import { FC, createContext, useState } from 'react';

import { useDebounce, Card, CardProps as HorizontalGridProps } from '@davidscicluna/component-library';

import { ScrollContext } from '../types';

import { isDisabled as defaultIsDisabled } from './common/data/defaultPropValues';
import { HorizontalGridContext as HorizontalGridContextType } from './types';

export const HorizontalGridContext = createContext<HorizontalGridContextType>({
	isDisabled: defaultIsDisabled,
	scroll: {} as ScrollContext,
	onSetScroll: () => undefined
});

const HorizontalGrid: FC<HorizontalGridProps> = ({ children, isDisabled = defaultIsDisabled, ...rest }) => {
	const [scroll, setScroll] = useState<ScrollContext>({} as ScrollContext);
	const scrollDebounced = useDebounce(scroll, 'ultra-fast');

	return (
		<HorizontalGridContext.Provider
			value={{ isDisabled, scroll: scrollDebounced, onSetScroll: (scroll) => setScroll(scroll) }}
		>
			<Card {...rest} isDisabled={isDisabled}>
				{children}
			</Card>
		</HorizontalGridContext.Provider>
	);
};

export default HorizontalGrid;
