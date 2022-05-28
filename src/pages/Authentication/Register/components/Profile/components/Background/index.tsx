import React, { ReactElement, ChangeEvent, useRef, useState } from 'react';

import { Icon } from '@davidscicluna/component-library';

import { useDisclosure, Box, Image } from '@chakra-ui/react';

import Compressor from 'compressorjs';

import * as fallback from '../../../../../../../common/assets/fallback';
import ClickableImage from '../../../../../../../components/Clickable/Image';
import Cropper from '../Cropper';

import { BackgroundProps } from './types';

const Background = ({ color, colorMode, alt, form, background }: BackgroundProps): ReactElement => {
	const { isOpen: isCropperOpen, onOpen: onOpenCropper, onClose: onCloseCropper } = useDisclosure();

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [image, setImage] = useState<string>('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			new Compressor(event.target.files[0], {
				strict: true,
				checkOrientation: true,
				quality: 0.6,
				resize: 'cover',
				success: (file) => {
					const blob = new Blob([file], { type: file.type });

					setImage(URL.createObjectURL(blob));
					onOpenCropper();
				}
			});
		}
	};

	return (
		<>
			<Box width='inherit' height='inherit'>
				<input
					ref={fileInputRef}
					type='file'
					onChange={(event) => handleChange(event)}
					style={{ display: 'none' }}
					value=''
				/>
				<ClickableImage
					borderRadius='none'
					ratio={20 / 5}
					renderIcon={({ color, fontSize }) => (
						<Icon icon='upload_file' category='outlined' color={color} fontSize={fontSize} />
					)}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();

						fileInputRef.current?.click();
					}}
				>
					<Image
						alt={`${alt} Background`}
						width='inherit'
						height='inherit'
						objectFit='cover'
						borderRadius='none'
						src={background || ''}
						fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
					/>
				</ClickableImage>
			</Box>

			<Cropper
				color={color}
				colorMode={colorMode}
				type='background'
				image={image}
				isOpen={isCropperOpen}
				onCrop={(image) => form.setValue('background_path', image, { shouldDirty: true })}
				onClose={onCloseCropper}
			/>
		</>
	);
};

export default Background;
