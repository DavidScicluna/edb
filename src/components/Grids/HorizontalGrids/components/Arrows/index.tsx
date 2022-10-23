import { FC } from 'react';

import { ButtonGroup, ButtonGroupItem } from '@davidscicluna/component-library';

import Arrow from './components/Arrow';
import { ArrowsProps } from './types';

const Arrows: FC<ArrowsProps> = (props) => {
	const { isLeftDisabled, isRightDisabled, onLeftClick, onRightClick, arrowProps = {} } = props;

	return (
		<ButtonGroup isAttached spacing={1}>
			<ButtonGroupItem index={0} total={1}>
				<Arrow {...arrowProps} direction='left' isDisabled={isLeftDisabled} onClick={onLeftClick} />
			</ButtonGroupItem>
			<ButtonGroupItem index={1} total={1}>
				<Arrow {...arrowProps} direction='right' isDisabled={isRightDisabled} onClick={onRightClick} />
			</ButtonGroupItem>
		</ButtonGroup>
	);
};

export default Arrows;
