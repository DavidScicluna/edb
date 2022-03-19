import React, { ReactElement } from 'react';

import { useMediaQuery, VStack, HStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { ActionsProps } from './types';

import Button from '../../../../../../../../../components/Clickable/Button';
import Divider from '../../../../../../../../../components/Divider';
import Grid from '../Grid';
import Rotate from '../Rotate';
import Zoom from '../Zoom';

const Actions = (props: ActionsProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [ref, { height }] = useElementSize();

	const { renderActions, colorMode, isActive, zoom, rotation, onToggle, onSetZoom, onRotation, onClose } = props;

	return isSm ? (
		<VStack
			ref={ref}
			width='100%'
			justifyContent='space-between'
			divider={<Divider colorMode={colorMode} orientation='vertical' height={`${height}px`} />}
			spacing={2}
		>
			<HStack alignItems='center' justifyContent='center'>
				<Grid colorMode={colorMode} isActive={isActive} onToggle={onToggle} />
				<Zoom colorMode={colorMode} zoom={zoom} onSetZoom={onSetZoom} />
				<Rotate colorMode={colorMode} rotation={rotation} onRotation={onRotation} />
			</HStack>

			<HStack alignItems='center' justifyContent='space-between'>
				<Button colorMode={colorMode} onClick={() => onClose()} variant='outlined'>
					Cancel
				</Button>

				{renderActions ? renderActions({}) : null}
			</HStack>
		</VStack>
	) : (
		<HStack
			ref={ref}
			width='100%'
			justifyContent='space-between'
			divider={<Divider colorMode={colorMode} orientation='vertical' height={`${height}px`} />}
			spacing={2}
		>
			<Button colorMode={colorMode} onClick={() => onClose()} variant='outlined'>
				Cancel
			</Button>

			<HStack alignItems='center' justifyContent='center' flex={1}>
				<Grid colorMode={colorMode} isActive={isActive} onToggle={onToggle} />
				<Zoom colorMode={colorMode} zoom={zoom} onSetZoom={onSetZoom} />
				<Rotate colorMode={colorMode} rotation={rotation} onRotation={onRotation} />
			</HStack>

			{renderActions ? renderActions({}) : null}
		</HStack>
	);
};

export default Actions;
