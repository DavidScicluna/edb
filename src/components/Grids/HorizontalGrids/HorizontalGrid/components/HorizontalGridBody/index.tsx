import { FC, useContext } from 'react';

import { CardBody, HorizontalScroll } from '@davidscicluna/component-library';

import { Center } from '@chakra-ui/react';

import { HorizontalGridContext as HorizontalGridContextType } from '../../types';
import { HorizontalGridContext } from '../..';

import { HorizontalGridBodyProps } from './types';

const HorizontalGridBody: FC<HorizontalGridBodyProps> = ({ children, ...rest }) => {
	const { onSetScroll } = useContext<HorizontalGridContextType>(HorizontalGridContext);

	return (
		<CardBody {...rest}>
			<HorizontalScroll
				renderDivider={() => <Center mr={2} />}
				LeftArrow={<Center />}
				RightArrow={<Center />}
				onInit={onSetScroll}
				onUpdate={onSetScroll}
			>
				{children}
			</HorizontalScroll>
		</CardBody>
	);
};

export default HorizontalGridBody;
