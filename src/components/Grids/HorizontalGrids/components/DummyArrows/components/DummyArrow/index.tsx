import { FC } from 'react';

import { DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { DummyArrowProps } from './types';

const DummyArrow: FC<DummyArrowProps> = (props) => {
	const { direction, ...rest } = props;

	return (
		<DummyIconButton {...rest} aria-label={`Scroll ${direction}`}>
			<IconButtonIcon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} category='outlined' />
		</DummyIconButton>
	);
};

export default DummyArrow;
