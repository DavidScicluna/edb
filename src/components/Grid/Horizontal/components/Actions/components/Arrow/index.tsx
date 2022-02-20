import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';

import {
	ArrowBackOutlined as ArrowBackOutlinedIcon,
	ArrowForwardOutlined as ArrowForwardOutlinedIcon
} from '@material-ui/icons';

import { ArrowProps } from './types';

import IconButton from '../../../../../../Clickable/IconButton';
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
				{direction === 'left' ? <ArrowBackOutlinedIcon /> : <ArrowForwardOutlinedIcon />}
			</IconButton>
		</Tooltip>
	);
};

export default Arrow;
