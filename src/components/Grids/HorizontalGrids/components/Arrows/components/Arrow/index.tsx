import { FC } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { ArrowProps } from './types';

const Arrow: FC<ArrowProps> = (props) => {
	const { direction, isDisabled = false, ...rest } = props;

	// const [isMouseDown, setIsMouseDown] = useBoolean();
	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Scroll ${direction.toLowerCase()} (tooltip)`}
			label={`Scroll ${direction.toLowerCase()}`}
			placement='top'
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
			// gutter={!isDisabled && isHovering && isMouseDown ? 7 : 10}
		>
			<IconButton
				{...rest}
				aria-label={`Scroll ${direction}`}
				isDisabled={isDisabled}
				// onMouseDown={() => setIsMouseDown.on()}
				// onMouseUp={() => setIsMouseDown.off()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			>
				<IconButtonIcon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} category='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default Arrow;
