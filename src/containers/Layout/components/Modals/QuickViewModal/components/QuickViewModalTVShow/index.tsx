import { FC } from 'react';

import {
	useMediaTypeImagesQuery,
	useMediaTypeQuery,
	useMediaTypeVideosQuery
} from '../../../../../../../common/queries';
import QuickViewModalDummyPoster from '../QuickViewModalDummyPoster';
import QuickViewModalStructure from '../QuickViewModalStructure';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import QuickViewModalError from '../QuickViewModalError';
import QuickViewModalEmpty from '../QuickViewModalEmpty';

import QuickViewModalTVShowContent from './components/QuickViewModalTVShowContent';
import QuickViewModalTVShowPoster from './components/QuickViewModalTVShowPoster';
import { QuickViewModalTVShowProps } from './types';
import QuickViewModalTVShowDummyContent from './components/QuickViewModalTVShowDummyContent';

const QuickViewModalTVShow: FC<QuickViewModalTVShowProps> = ({ id }) => {
	const {
		data: show,
		isFetching: isTVShowFetching,
		isLoading: isTVShowLoading,
		isError: isTVShowError,
		isSuccess: isTVShowSuccess,
		error: showError,
		refetch: refetchTVShow
	} = useMediaTypeQuery<'tv'>({ props: { mediaType: 'tv', id: Number(id) } });

	const { name } = show || {};

	const imagesQuery = useMediaTypeImagesQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const { posters = [], backdrops = [] } = imagesQuery.data || {};

	const videosQuery = useMediaTypeVideosQuery({
		props: { mediaType: 'tv', id: Number(id) },
		options: { enabled: !!show?.id }
	});

	const { results: videos = [] } = videosQuery.data || {};

	return !(isTVShowFetching || isTVShowLoading) && isTVShowError ? (
		<QuickViewModalError
			{...(showError.response?.data || {})}
			label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}
			refetch={refetchTVShow}
		/>
	) : !(isTVShowFetching || isTVShowLoading) && isTVShowSuccess && !show ? (
		<QuickViewModalEmpty label={name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })} />
	) : !(isTVShowFetching || isTVShowLoading) && isTVShowSuccess && !!show ? (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalTVShowPoster show={show} />}
			renderContent={() => <QuickViewModalTVShowContent show={show} />}
		/>
	) : (
		<QuickViewModalStructure
			renderPoster={() => <QuickViewModalDummyPoster />}
			renderContent={() => <QuickViewModalTVShowDummyContent />}
		/>
	);
};

export default QuickViewModalTVShow;
