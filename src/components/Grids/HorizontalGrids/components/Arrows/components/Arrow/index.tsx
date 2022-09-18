import { FC } from 'react';

import { Tooltip, IconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { ArrowProps } from './types';

const Arrow: FC<ArrowProps> = (props) => {
	const { direction, isDisabled = false, ...rest } = props;

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<Tooltip
			aria-label={`Scroll ${direction.toLowerCase()} (tooltip)`}
			label={`Scroll ${direction.toLowerCase()}`}
			placement='top'
			isOpen={!isDisabled && isHovering}
			isDisabled={isDisabled}
		>
			<IconButton
				{...rest}
				aria-label={`Scroll ${direction}`}
				isDisabled={isDisabled}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
			>
				<IconButtonIcon icon={direction === 'left' ? 'arrow_back' : 'arrow_forward'} category='outlined' />
			</IconButton>
		</Tooltip>
	);
};

export default Arrow;
