import React, { ReactElement } from 'react';

import { IconButton, Icon } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';

import Tooltip from '../../../../../../../../../components/Tooltip';

import { RotateProps } from './types';

const Rotate = ({ colorMode, rotation, onRotation }: RotateProps): ReactElement => {
	const [isHoveringLeft, setIsHoveringLeft] = useBoolean();
	const [isHoveringRight, setIsHoveringRight] = useBoolean();

	const handleRotate = (direction: 'left' | 'right'): void => {
		switch (rotation) {
			case 0:
			case 360:
				onRotation(direction === 'left' ? 270 : 90);
				break;
			case 90:
				onRotation(direction === 'left' ? 0 : 180);
				break;
			case 180:
				onRotation(direction === 'left' ? 90 : 270);
				break;
			case 270:
				onRotation(direction === 'left' ? 180 : 360);
				break;
		}
	};

	return (
		<Center>
			<Tooltip
				aria-label='Rotate Left (Tooltip)'
				colorMode={colorMode}
				isOpen={isHoveringLeft}
				placement='top'
				label='Rotate Left'
			>
				<IconButton
					aria-label='Rotate Left (Tooltip)'
					colorMode={colorMode}
					onClick={() => handleRotate('left')}
					onMouseEnter={() => setIsHoveringLeft.on()}
					onMouseLeave={() => setIsHoveringLeft.off()}
					variant='icon'
				>
					<Icon icon='rotate_left' category='outlined' />
				</IconButton>
			</Tooltip>
			<Tooltip
				aria-label='Rotate Right (Tooltip)'
				colorMode={colorMode}
				isOpen={isHoveringRight}
				placement='top'
				label='Rotate Right'
			>
				<IconButton
					aria-label='Rotate Right (Tooltip)'
					colorMode={colorMode}
					onClick={() => handleRotate('right')}
					onMouseEnter={() => setIsHoveringRight.on()}
					onMouseLeave={() => setIsHoveringRight.off()}
					variant='icon'
				>
					<Icon icon='rotate_right' category='outlined' />
				</IconButton>
			</Tooltip>
		</Center>
	);
};

export default Rotate;
