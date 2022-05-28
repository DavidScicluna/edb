import { ReactElement } from 'react';

import { IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import Tooltip from '../../../../../../Tooltip';

import { ArrowProps } from './types';

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
				<Icon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} category='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default Arrow;
