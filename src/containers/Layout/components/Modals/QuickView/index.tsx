import { ReactElement } from 'react';

import { Button } from '@davidscicluna/component-library';

import { useMediaQuery, Center } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import { handleReturnMediaTypeLabel } from '../../../../../common/utils';
import Link from '../../../../../components/Clickable/Link';
import Empty from '../../../../../components/Empty';
import Modal from '../../../../../components/Modal';
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
		<Modal
			title={
				!isSm
					? `Quick View ${quickViewModal.mediaItem ? `"${quickViewModal.mediaItem.title}"` : ''}`
					: 'Quick View'
			}
			renderActions={({ color, colorMode, size }) => (
				<Link
					to={{
						pathname: `/${handleReturnMediaTypeLabel(quickViewModal.mediaType)}/${
							quickViewModal.mediaItem?.id
						}`
					}}
				>
					<Button color={color} colorMode={colorMode} onClick={() => handleClose()} size={size}>
						View full details
					</Button>
				</Link>
			)}
			isOpen={quickViewModal.open}
			onClose={() => handleClose()}
			isCentered
			size='3xl'
		>
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
		</Modal>
	);
};

export default QuickView;
