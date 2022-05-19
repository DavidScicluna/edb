import React, { ReactElement, useState, useCallback } from 'react';


// eslint-disable-next-line import/no-unresolved

import { Button } from '@davidscicluna/component-library';

import { useTheme, useMediaQuery, useBoolean, VStack, Center } from '@chakra-ui/react';

import { Area } from 'react-easy-crop/types';

import RECCropper from 'react-easy-crop';
import { debounce } from 'lodash';


import { handleReturnRatio } from '../../../../../../../common/utils';
import Modal from '../../../../../../../components/Modal';
import { Theme } from '../../../../../../../theme/types';

import { CropperProps } from './types';
import Actions from './components/Actions';
import { handleGetImage } from './common/utils';

export const minZoom = 1;
export const maxZoom = 5;

const Cropper = ({ color, colorMode, type, image, isOpen = false, onCrop, onClose }: CropperProps): ReactElement => {
	const theme = useTheme<Theme>();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [rotation, setRotation] = useState<number>(0);
	const [zoom, setZoom] = useState<number>(minZoom);
	const [area, setArea] = useState<Area | null>(null);

	const [isGridActive, setIsGridActive] = useBoolean();

	const handleCropComplete = useCallback(
		debounce((_croppedArea, croppedAreaPixels) => {
			setArea(croppedAreaPixels);
		}, 500),
		[]
	);

	const handleCropImage = useCallback(async () => {
		if (image && area) {
			const croppedImage = await handleGetImage(image, area, rotation);

			if (croppedImage) {
				onCrop(croppedImage);
				onClose();
			}
		}
	}, [image, area, rotation]);

	return (
		<Modal
			title={`Edit ${type}`}
			renderActions={({ size }) => (
				<Actions
					renderActions={() => (
						<Button color={color} colorMode={colorMode} onClick={() => handleCropImage()} size={size}>
							Save Image
						</Button>
					)}
					colorMode={colorMode}
					isActive={isGridActive}
					zoom={zoom}
					rotation={rotation}
					onToggle={() => setIsGridActive.toggle()}
					onSetZoom={setZoom}
					onRotation={setRotation}
					onClose={onClose}
				/>
			)}
			colorMode={colorMode}
			isOpen={isOpen}
			onClose={onClose}
			hasCancel={false}
			isCentered
			size='3xl'
		>
			<VStack width='100%' spacing={2} p={2}>
				<Center width='100%' height='50vh' position='relative' borderRadius='lg' overflow='hidden'>
					<RECCropper
						image={image}
						crop={crop}
						rotation={rotation}
						zoom={zoom}
						aspect={type === 'avatar' ? handleReturnRatio(isSm ? 'square' : 'portrait') : 18 / 5} // TODO: Update when background is updated
						cropShape={type === 'avatar' ? 'round' : 'rect'}
						showGrid={isGridActive}
						onRotationChange={setRotation}
						onCropChange={setCrop}
						onCropComplete={handleCropComplete}
						onZoomChange={setZoom}
						style={{
							cropAreaStyle: {
								borderWidth: '2px',
								borderStyle: 'solid',
								borderColor: theme.colors.gray[colorMode === 'light' ? 200 : 700],
								color: 'rgba(0, 0, 0, 0.75)'
							}
						}}
					/>
				</Center>
			</VStack>
		</Modal>
	);
};

export default Cropper;
