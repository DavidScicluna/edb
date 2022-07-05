import { ReactElement } from 'react';

import {
	Modal,
	ModalHeader,
	ModalBody,
	Accordions,
	AccordionsQuickToggles,
	AccordionsPanel,
	Accordion,
	AccordionHeader,
	AccordionBody,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { ColorMode, useColorMode, Text } from '@chakra-ui/react';

import { useSelector } from '../../../../common/hooks';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { MediaItem } from '../../types';

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
				<Accordions<MediaItem[]>
					colorMode={colorMode}
					accordions={assets.map((asset) => {
						return {
							id: asset.label.toLowerCase(),
							title: asset.label,
							data: asset.mediaItems
						};
					})}
					p={2}
				>
					<AccordionsQuickToggles<MediaItem[]> color={color} />

					<AccordionsPanel<MediaItem[]>>
						{({ accordions }) =>
							accordions.map(({ id, title, data }) => (
								<Accordion
									key={id}
									id={id}
									header={
										<AccordionHeader
											renderTitle={(props) => <Text {...props}>{title}</Text>}
											// TODO: Add CountUp Actions
											// total: {
											// 	number: season.episode_count || undefined,
											// 	suffix: season.episode_count ? ' episodes' : 'Confirmed'
											// },
										/>
									}
									body={
										<AccordionBody>
											<Asset
												key={id}
												alt={alt}
												colorMode={colorMode}
												activeMediaItem={activeMediaItem}
												title={title}
												data={data}
												onClick={onClick}
											/>
										</AccordionBody>
									}
									spacing={2}
									p={2}
								/>
							))
						}
					</AccordionsPanel>
				</Accordions>
			</ModalBody>
		</Modal>
	);
};

export default Gallery;
