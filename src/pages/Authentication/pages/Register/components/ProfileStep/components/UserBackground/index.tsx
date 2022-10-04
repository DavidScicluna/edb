import { FC, useRef, useState } from 'react';

import { useTheme, ImageEditor, Icon } from '@davidscicluna/component-library';

import { useDisclosure, Box } from '@chakra-ui/react';

import Compressor from 'compressorjs';
import { useWatch } from 'react-hook-form';

import Image from '../../../../../../../../components/Image';
import ClickableImage from '../../../../../../../../components/Clickable/ClickableMedia';
import { FileInputRef, ChangeEvent } from '../../types';

import { UserBackgroundProps } from './types';

const UserBackground: FC<UserBackgroundProps> = ({ color, colorMode, alt, form }) => {
	const theme = useTheme();

	const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();

	const fileInputRef = useRef<FileInputRef>(null);

	const { control } = form;

	const background_path = useWatch({ control, name: 'background_path' });

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
						alt={`${alt} Background`}
						width='inherit'
						height='inherit'
						borderRadius='none'
						src={{ full: background_path }}
					/>
				</ClickableImage>
			</Box>

			<ImageEditor
				color={color}
				colorMode={colorMode}
				title='Edit Background'
				image={image}
				isOpen={isCropperOpen}
				onCrop={(image) => form.setValue('background_path', image, { shouldDirty: true })}
				onClose={onCropperClose}
			/>
		</>
	);
};

export default UserBackground;
