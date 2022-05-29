import { ReactElement } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, IconButton, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Center, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import Empty from '../../../../../components/Empty';
import { defaultQuickViewModal, setQuickView } from '../../../../../store/slices/Modals';

import Show from './View/Show';
import Person from './View/Person';
import Movie from './View/Movie';
import Collection from './View/Collection';

const QuickView = (): ReactElement => {
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const dispatch = useDispatch();
	const quickViewModal = useSelector((state) => state.modals.ui.quickViewModal);

	const handleClose = (): void => {
		dispatch(setQuickView({ ...defaultQuickViewModal }));
	};

	return (
		<Modal isOpen={quickViewModal.open} onClose={() => handleClose()} size='3xl'>
			<ModalHeader
				renderTitle={(props) => (
					<Text {...props}>
						{!isSm
							? `Quick View ${quickViewModal.mediaItem ? `"${quickViewModal.mediaItem.title}"` : ''}`
							: 'Quick View'}
					</Text>
				)}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			/>
			<ModalBody>
				{quickViewModal.mediaType === 'movie' ? (
					<Movie id={quickViewModal.mediaItem?.id} />
				) : quickViewModal.mediaType === 'tv' ? (
					<Show id={quickViewModal.mediaItem?.id} />
				) : quickViewModal.mediaType === 'person' ? (
					<Person id={quickViewModal.mediaItem?.id} />
				) : quickViewModal.mediaType === 'collection' ? (
					<Collection id={quickViewModal.mediaItem?.id} />
				) : (
					<Center width='100%' p={2}>
						<Empty
							label='Oh no! Media-Item not found!'
							description='Sorry, unfortunatly couldnt find the media-item to quick view'
						/>
					</Center>
				)}
			</ModalBody>
			<ModalFooter
				renderCancel={(props) => (
					<Button {...props} onClick={handleClose}>
						Cancel
					</Button>
				)}
				renderAction={(props) => (
					// TODO: Add Link
					// <Link
					// 	to={{
					// 		pathname: `/${handleReturnMediaTypeLabel(quickViewModal.mediaType)}/${
					// 			quickViewModal.mediaItem?.id
					// 		}`
					// 	}}
					// >
					// 	</Link>
					<Button
						{...props}
						// color={color}
						color='blue'
						onClick={handleClose}
					>
						View full details
					</Button>
				)}
			/>
		</Modal>
	);
};

export default QuickView;
