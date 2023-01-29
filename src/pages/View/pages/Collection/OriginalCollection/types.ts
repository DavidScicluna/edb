import { TabsOnChangeProps } from '@davidscicluna/component-library';

import { UseMediaTypeQueryResult } from '../../../../../common/queries/useMediaTypeQuery';
import { UseMediaTypeImagesQueryResult } from '../../../../../common/queries/useMediaTypeImagesQuery';

export type CollectionContext = {
	collectionQuery?: UseMediaTypeQueryResult<'collection'>;
	imagesQuery?: UseMediaTypeImagesQueryResult;
	onSetActiveTab: (props: TabsOnChangeProps) => void;
};
