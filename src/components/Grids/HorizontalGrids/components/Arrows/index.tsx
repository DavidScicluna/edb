import { FC } from 'react';

import { ButtonGroup } from '@davidscicluna/component-library';

import Arrow from './components/Arrow';
import { ArrowsProps } from './types';

const Arrows: FC<ArrowsProps> = (props) => {
	const { isLeftDisabled, isRightDisabled, onLeftClick, onRightClick, iconButtonProps } = props;

	return (
		<ButtonGroup isAttached spacing={1}>
			<Arrow {...iconButtonProps} direction='left' isDisabled={isLeftDisabled} onClick={onLeftClick} />
			<Arrow {...iconButtonProps} direction='right' isDisabled={isRightDisabled} onClick={onRightClick} />
		</ButtonGroup>
	);
};

export default Arrows;
