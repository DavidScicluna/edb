import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem } from '@davidscicluna/component-library';

import DummyArrow from './components/DummyArrow';
import { DummyArrowsProps } from './types';

const DummyArrows: FC<DummyArrowsProps> = ({ dummyArrowProps }) => {
	return (
		<ButtonGroup isAttached spacing={1}>
			<ButtonGroupItem index={0} total={1}>
				<DummyArrow {...dummyArrowProps} direction='left' />
			</ButtonGroupItem>
			<ButtonGroupItem index={1} total={1}>
				<DummyArrow {...dummyArrowProps} direction='right' />
			</ButtonGroupItem>
		</ButtonGroup>
	);
};

export default DummyArrows;
