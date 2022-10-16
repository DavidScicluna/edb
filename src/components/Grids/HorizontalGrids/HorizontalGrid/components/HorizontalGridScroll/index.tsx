import { FC, useContext } from 'react';

import { HorizontalScroll } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { HorizontalGridContext as HorizontalGridContextType } from '../../types';
import { HorizontalGridContext } from '../..';

import { HorizontalGridScrollProps } from './types';

const HorizontalGridScroll: FC<HorizontalGridScrollProps> = ({ children, spacing = 2 }) => {
	const { onSetScroll } = useContext<HorizontalGridContextType>(HorizontalGridContext);

	return (
		<HorizontalScroll
			renderDivider={() => <Center mr={spacing} />}
			LeftArrow={<Center />}
			RightArrow={<Center />}
			onInit={onSetScroll}
			onUpdate={onSetScroll}
		>
			{children}
		</HorizontalScroll>
	);
};

export default HorizontalGridScroll;
