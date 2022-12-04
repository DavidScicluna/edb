import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { DummyParagraph, Paragraph } from '../../../../../../../components';
import { usePersonContext } from '../../common/hooks';
import DummyKnownFor from '../../../components/DummyOverviewTab/components/DummyKnownFor';
import DummyPhotos from '../../../components/DummyOverviewTab/components/DummyPhotos';

import Photos from './components/OverviewTabPhotos';
import KnownFor from './components/OverviewTabKnownFor';

const OverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	const { personQuery, movieCreditsQuery, tvShowCreditsQuery, imagesQuery } = usePersonContext();

	const { data: person, isFetching: isPersonFetching, isLoading: isPersonLoading } = personQuery || {};
	const { biography } = person || {};

	const { isFetching: isMovieCreditsFetching, isLoading: isMovieCreditsLoading } = movieCreditsQuery || {};
	const { isFetching: isTVShowCreditsFetching, isLoading: isTVShowCreditsLoading } = tvShowCreditsQuery || {};

	const { isFetching: isImagesFetching, isLoading: isImagesLoading } = imagesQuery || {};

	return (
		<VStack width='100%' spacing={spacing}>
			{isPersonFetching || isPersonLoading ? (
				<DummyParagraph />
			) : biography ? (
				<Paragraph title='Biography' keepFooter>
					{biography}
				</Paragraph>
			) : null}

			{isMovieCreditsFetching || isMovieCreditsLoading || isTVShowCreditsFetching || isTVShowCreditsLoading ? (
				<DummyKnownFor />
			) : (
				<KnownFor />
			)}

			{isImagesFetching || isImagesLoading ? <DummyPhotos /> : <Photos />}
		</VStack>
	);
};

export default OverviewTab;
