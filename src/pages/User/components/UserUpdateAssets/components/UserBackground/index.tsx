import { FC, useRef, useState } from 'react';

import { useTheme, ImageEditor, Icon } from '@davidscicluna/component-library';

import { useDisclosure, useToast, Box } from '@chakra-ui/react';

import Compressor from 'compressorjs';
import { useWatch } from 'react-hook-form';

import { Alert, ClickableMedia, Image } from '../../../../../../components';
import { FileInputRef, ChangeEvent } from '../../types';
import { convertDurationToMS } from '../../../../../../components/Alert/common/utils';

import { UserBackgroundProps } from './types';

const toastID = 'ds-edb-user-background-toast';

const UserBackground: FC<UserBackgroundProps> = ({ color, colorMode, alt, form }) => {
	const theme = useTheme();

	const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();

	const fileInputRef = useRef<FileInputRef>(null);

	const toast = useToast();

	const { control } = form;

	const watchBackgroundPath = useWatch({ control, name: 'background_path' });

	const [image, setImage] = useState<string>('');

	const handleChange = (event: ChangeEvent) => {
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
				},
				error: (error) => {
					console.error(error);

					if (!toast.isActive(toastID)) {
						toast({
							id: toastID,
							duration: convertDurationToMS(),
							position: 'bottom-left',
							render: () => (
								<Alert
									duration={12.5}
									description={`Unfortunately, wasn't able to upload the image! Please try again.`}
									status='error'
									onClose={() => toast.close(toastID)}
								/>
							)
						});
					}
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
				<ClickableMedia
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
						src={{ full: watchBackgroundPath }}
					/>
				</ClickableMedia>
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
