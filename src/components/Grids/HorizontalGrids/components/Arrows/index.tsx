import { FC } from 'react';

import { ButtonGroup } from '@davidscicluna/component-library';

import Arrow from './components/Arrow';
import { ArrowsProps } from './types';

const Arrows: FC<ArrowsProps> = (props) => {
	const { isLeftDisabled, isRightDisabled, onLeftClick, onRightClick, arrowProps = {} } = props;

	return (
		<ButtonGroup isAttached spacing={1}>
			<Arrow {...arrowProps} direction='left' isDisabled={isLeftDisabled} onClick={onLeftClick} />
			<Arrow {...arrowProps} direction='right' isDisabled={isRightDisabled} onClick={onRightClick} />
		</ButtonGroup>
	);
};

export default Arrows;
