import React, { ReactElement, ChangeEvent, useRef, useState } from 'react';

import { useMediaQuery, useDisclosure, Center, Image } from '@chakra-ui/react';

import Compressor from 'compressorjs';


import * as fallback from '../../../../../../../common/assets/fallback';
import { handleReturnRatio } from '../../../../../../../common/utils';
import ClickableImage from '../../../../../../../components/Clickable/Image';
import Icon from '../../../../../../../components/Icon';
import Cropper from '../Cropper';

import { AvatarProps } from './types';

const Avatar = ({ color, colorMode, alt, form, avatar }: AvatarProps): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');
	const [isMd] = useMediaQuery('(max-width: 860px)');
	const [isLg] = useMediaQuery('(min-width: 1280px)');

	const { isOpen: isCropperOpen, onOpen: onOpenCropper, onClose: onCloseCropper } = useDisclosure();

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const [image, setImage] = useState<string>('');

	const border = isSm ? 0 : isMd ? 4 : isLg ? 6 : 5;

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
			<Center
				width={isSm ? '100%' : isMd ? 150 : isLg ? 250 : 200}
				position={isSm ? 'relative' : 'absolute'}
				bottom={isSm ? 0 : `calc(5% - ${border}px)`}
				left={isSm ? 0 : `calc(2% - ${border}px)`}
				zIndex={1}
				borderWidth={`${border}px`}
				borderStyle='solid'
				borderColor={`gray.${colorMode === 'light' ? 50 : 900}`}
				borderRadius='lg'
				overflow='hidden'
			>
				<input
					ref={fileInputRef}
					type='file'
					onChange={(event) => handleChange(event)}
					style={{ display: 'none' }}
					value=''
				/>
				<ClickableImage
					ratio={handleReturnRatio(isSm ? 'square' : 'portrait')}
					renderIcon={({ color, fontSize }) => (
						<Icon icon='upload_file' type='outlined' color={color} fontSize={fontSize} />
					)}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();

						fileInputRef.current?.click();
					}}
				>
					<Image
						alt={`${alt} Avatar`}
						width='inherit'
						height='inherit'
						src={avatar || ''}
						fallbackSrc={colorMode === 'light' ? fallback.default.light : fallback.default.dark}
					/>
				</ClickableImage>
			</Center>

			<Cropper
				color={color}
				colorMode={colorMode}
				type='avatar'
				image={image}
				isOpen={isCropperOpen}
				onCrop={(image) => form.setValue('avatar_path', image, { shouldDirty: true })}
				onClose={onCloseCropper}
			/>
		</>
	);
};

export default Avatar;
