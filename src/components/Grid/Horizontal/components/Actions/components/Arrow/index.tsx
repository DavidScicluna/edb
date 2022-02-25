import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import { ArrowProps } from './types';

import IconButton from '../../../../../../Clickable/IconButton';
import Icon from '../../../../../../Icon';
import Tooltip from '../../../../../../Tooltip';

const Arrow = (props: ArrowProps): ReactElement => {
	const { direction, isDisabled = false, onClick } = props;

	const [isMouseDown, setIsMouseDown] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Scroll ${direction.toLowerCase()}`}
			label={`Scroll ${direction.toLowerCase()}`}
			placement='top'
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
			gutter={!isDisabled && isHovering && isMouseDown ? 7 : 10}
		>
			<IconButton
				aria-label={`Scroll ${direction}`}
				isDisabled={isDisabled}
				onClick={() => onClick()}
				onMouseDown={() => setIsMouseDown.on()}
				onMouseUp={() => setIsMouseDown.off()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				size='sm'
				variant='outlined'
			>
				<Icon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} type='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default Arrow;
