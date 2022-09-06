import { FC, useRef, useState } from 'react';

import { useTheme, ImageEditor, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, Center } from '@chakra-ui/react';

import Compressor from 'compressorjs';
import { useWatch } from 'react-hook-form';

import { getRatio } from '../../../../../../../../common/utils';
import Image from '../../../../../../../../components/Image';
import ClickableMedia from '../../../../../../../../components/Clickable/ClickableMedia';
import { FileInputRef, ChangeEvent } from '../../types';

import { AvatarProps } from './types';

const { getColor } = utils;

const Avatar: FC<AvatarProps> = ({ color, colorMode, alt, form }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();

	const fileInputRef = useRef<FileInputRef>(null);

	const { control } = form;

	const avatar_path = useWatch({ control, name: 'avatar_path' });

	const [image, setImage] = useState<string>('');

	const handleChange = (event: ChangeEvent) => {
		// TODO: Add error toast if not successful to convert to blob
		if (event.target.files) {
			new Compressor(event.target.files[0], {
				strict: true,
				checkOrientation: true,
				quality: 0.6,
				resize: 'cover',
				success: (file) => {
					const blob = new Blob([file], { type: file.type });

					setImage(URL.createObjectURL(blob));
					onCropperOpen();
				}
			});
		}
	};

	return (
		<>
			<Center
				width={['100%', '100%', 'auto']}
				borderWidth={['0px', '0px', '4px', '6px']}
				borderStyle='solid'
				borderColor={getColor({ theme, colorMode, type: 'background' })}
				borderRadius='lg'
				overflowX='hidden'
				overflowY='hidden'
			>
				<input
					ref={fileInputRef}
					type='file'
					onChange={(event) => handleChange(event)}
					style={{ display: 'none' }}
					value=''
				/>
				<ClickableMedia
					width={['100%', '100%', '200px', '250px']}
					ratio={getRatio({ orientation: isMd ? 'portrait' : 'square' })}
					renderIcon={(props) => (
						<Icon
							{...props}
							width={theme.fontSizes['5xl']}
							height={theme.fontSizes['5xl']}
							fontSize={theme.fontSizes['5xl']}
							icon='upload_file'
							category='outlined'
						/>
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
						borderRadius='none'
						src={{ full: avatar_path }}
					/>
				</ClickableMedia>
			</Center>

			<ImageEditor
				color={color}
				colorMode={colorMode}
				title='Edit Avatar'
				image={image}
				isOpen={isCropperOpen}
				onCrop={(image) => form.setValue('avatar_path', image, { shouldDirty: true })}
				onClose={onCropperClose}
			/>
		</>
	);
};

export default Avatar;
