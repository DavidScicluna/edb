import { ReactElement } from 'react';

import { Modal, ModalHeader, ModalBody, IconButton, Icon } from '@davidscicluna/component-library';

import { ColorMode, useColorMode, Center, Text } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import Accordions from '../../../Accordions';

import { GalleryProps } from './types';
import Asset from './components/Asset';

const Gallery = (props: GalleryProps): ReactElement => {
	const { colorMode: colorModeHook } = useColorMode();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { alt, assets, activeMediaItem, isOpen = false, onClick, onClose } = props;

	const colorMode: ColorMode = colorModeHook === 'light' ? 'dark' : 'light';

	return (
		<Modal colorMode={colorMode} isOpen={isOpen} onClose={onClose} size='full'>
			<ModalHeader
				renderTitle={(props) => <Text {...props}>Gallery</Text>}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			/>
			<ModalBody>
				<Center p={2}>
					<Accordions
						accordions={assets.map((asset) => {
							return {
								id: asset.label.toLowerCase(),
								title: asset.label,
								total: {
									number: asset.mediaItems.length
								},
								data: asset.mediaItems
							};
						})}
						renderAccordion={({ id, title, data }) => (
							<Asset
								key={id}
								alt={alt}
								colorMode={colorMode}
								activeMediaItem={activeMediaItem}
								title={title}
								data={data}
								onClick={onClick}
							/>
						)}
						color={color}
						colorMode={colorMode}
						isLoading={false}
						isError={false}
					/>
				</Center>
			</ModalBody>
		</Modal>
	);
};

export default Gallery;
