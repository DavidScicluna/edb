import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import { useLayoutContext } from '../../../../../../../containers/Layout/common/hooks';
import { useCollectionContext } from '../../common/hooks';
import { DummyParagraph, Paragraph } from '../../../../../../../components';
import DummyPhotos from '../../../components/DummyOverviewTab/components/DummyOverviewTabPhotos';

import Photos from './components/OverviewTabPhotos';

const OverviewTab: FC = () => {
	const { spacing } = useLayoutContext();

	const { collectionQuery, imagesQuery } = useCollectionContext();

	const {
		data: collection,
		isFetching: isCollectionFetching,
		isLoading: isCollectionLoading
	} = collectionQuery || {};
	const { overview } = collection || {};

	const { isFetching: isImagesFetching, isLoading: isImagesLoading } = imagesQuery || {};

	return (
		<VStack width='100%' spacing={spacing}>
			{isCollectionFetching || isCollectionLoading ? (
				<DummyParagraph />
			) : overview ? (
				<Paragraph title='Summary' keepFooter>
					{overview}
				</Paragraph>
			) : null}

			{isImagesFetching || isImagesLoading ? <DummyPhotos /> : <Photos />}
		</VStack>
	);
};

export default OverviewTab;
