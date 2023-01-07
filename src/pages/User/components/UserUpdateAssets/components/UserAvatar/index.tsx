import { FC, useRef, useState } from 'react';

import { useTheme, ImageEditor, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useDisclosure, useToast, Center } from '@chakra-ui/react';

import Compressor from 'compressorjs';
import { useWatch } from 'react-hook-form';

import { getRatio } from '../../../../../../common/utils/ratio';
import { Alert, ClickableMedia, Image } from '../../../../../../components';
import { FileInputRef, ChangeEvent } from '../../types';
import { convertDurationToMS } from '../../../../../../components/Alert/common/utils';

import { UserAvatarProps } from './types';

const { getColor } = utils;

const toastID = 'ds-edb-user-avatar-toast';

const UserAvatar: FC<UserAvatarProps> = ({ color, colorMode, alt, form }) => {
	const theme = useTheme();
	const [isMd] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

	const { isOpen: isCropperOpen, onOpen: onCropperOpen, onClose: onCropperClose } = useDisclosure();

	const fileInputRef = useRef<FileInputRef>(null);

	const toast = useToast();

	const { control } = form;

	const watchAvatarPath = useWatch({ control, name: 'avatar_path' });

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
					colorMode={colorMode}
					width={['100%', '100%', '200px', '250px']}
					ratio={getRatio({ orientation: isMd ? 'portrait' : 'square' })}
					renderIcon={(props) => <Icon {...props} icon='upload_file' category='outlined' />}
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
						src={{ full: watchAvatarPath }}
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

export default UserAvatar;
