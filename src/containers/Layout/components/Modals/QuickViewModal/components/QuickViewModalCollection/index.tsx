import { FC } from 'react';

import { useMediaTypeQuery } from '../../../../../../../common/queries';
import QuickViewModalDummyPoster from '../QuickViewModalDummyPoster';
import QuickViewModalStructure from '../QuickViewModalStructure';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import QuickViewModalError from '../QuickViewModalError';
import QuickViewModalEmpty from '../QuickViewModalEmpty';

import QuickViewModalCollectionContent from './components/QuickViewModalCollectionContent';
import QuickViewModalCollectionPoster from './components/QuickViewModalCollectionPoster';
import { QuickViewModalCollectionProps } from './types';
import QuickViewModalCollectionDummyContent from './components/QuickViewModalCollectionDummyContent';

const QuickViewModalCollection: FC<QuickViewModalCollectionProps> = ({ id }) => {
	const {
		data: collection,
		isFetching: isCollectionFetching,
		isLoading: isCollectionLoading,
		isError: isCollectionError,
		isSuccess: isCollectionSuccess,
		error: collectionError,
		refetch: refetchCollection
	} = useMediaTypeQuery<'collection'>({ props: { mediaType: 'collection', id: Number(id) } });

	const { name } = collection || {};

	// const imagesQuery = useMediaTypeImagesQuery({
	// 	props: { mediaType: 'collection', id: Number(id) },
	// 	options: { enabled: !!collection?.id }
	// });

	// const { posters = [], backdrops = [] } = imagesQuery.data || {};

	return !(isCollectionFetching || isCollectionLoading) && isCollectionError ? (
		<QuickViewModalError
			{...(collectionError.response?.data || {})}
			label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })}
			refetch={refetchCollection}
		/>
	) : !(isCollectionFetching || isCollectionLoading) && isCollectionSuccess && !collection ? (
		<QuickViewModalEmpty label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'collection' })} />
	) : !(isCollectionFetching || isCollectionLoading) && isCollectionSuccess && !!collection ? (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalCollectionPoster collection={collection} />}
			renderContent={() => <QuickViewModalCollectionContent collection={collection} />}
		/>
	) : (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalDummyPoster />}
			renderContent={() => <QuickViewModalCollectionDummyContent />}
		/>
	);
};

export default QuickViewModalCollection;
