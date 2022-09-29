import { FC } from 'react';

import { ButtonGroup } from '@davidscicluna/component-library';

import DummyArrow from './components/DummyArrow';
import { DummyArrowsProps } from './types';

const DummyArrows: FC<DummyArrowsProps> = (props = {}) => {
	return (
		<ButtonGroup isAttached spacing={1}>
			<DummyArrow {...props} direction='left' />
			<DummyArrow {...props} direction='right' />
		</ButtonGroup>
	);
};

export default DummyArrows;
