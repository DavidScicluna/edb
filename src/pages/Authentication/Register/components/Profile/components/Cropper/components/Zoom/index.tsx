import React, { ReactElement } from 'react';

import {  IconButton, } from '@davidscicluna/component-library';

import { useBoolean, Center } from '@chakra-ui/react';


import { minZoom, maxZoom } from '../..';
import Icon from '../../../../../../../../../components/Icon';
import Tooltip from '../../../../../../../../../components/Tooltip';

import { ZoomProps } from './types';

const Zoom = ({ colorMode, zoom, onSetZoom }: ZoomProps): ReactElement => {
	const [isHoveringIn, setIsHoveringIn] = useBoolean();
	const [isHoveringOut, setIsHoveringOut] = useBoolean();

	return (
		<Center>
			<Tooltip
				aria-label='Zoom Out (Tooltip)'
				colorMode={colorMode}
				isOpen={zoom !== minZoom && isHoveringOut}
				isDisabled={zoom === minZoom}
				placement='top'
				label='Zoom Out'
			>
				<IconButton
					aria-label='Zoom Out (Tooltip)'
					colorMode={colorMode}
					isDisabled={zoom === minZoom}
					onClick={() => onSetZoom(zoom - 0.25)}
					onMouseEnter={() => setIsHoveringOut.on()}
					onMouseLeave={() => setIsHoveringOut.off()}
					variant='icon'
				>
					<Icon icon='zoom_out' type='outlined' />
				</IconButton>
			</Tooltip>
			<Tooltip
				aria-label='Zoom In (Tooltip)'
				colorMode={colorMode}
				isOpen={zoom !== maxZoom && isHoveringIn}
				isDisabled={zoom === maxZoom}
				placement='top'
				label='Zoom In'
			>
				<IconButton
					aria-label='Zoom In (Tooltip)'
					colorMode={colorMode}
					isDisabled={zoom === maxZoom}
					onClick={() => onSetZoom(zoom + 0.25)}
					onMouseEnter={() => setIsHoveringIn.on()}
					onMouseLeave={() => setIsHoveringIn.off()}
					variant='icon'
				>
					<Icon icon='zoom_in' type='outlined' />
				</IconButton>
			</Tooltip>
		</Center>
	);
};

export default Zoom;
