import { ReactElement } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { useLayoutContext } from '../../../../../containers/Layout/common/hooks';

import MyReviews from './components/ViewReviewsMyReviews';
import OtherReviews from './components/ViewReviewsOtherReviews';
import { ViewReviewsMediaType, ViewReviewsProps } from './types';

const ViewReviews = <MT extends ViewReviewsMediaType>(props: ViewReviewsProps<MT>): ReactElement => {
	const { colorMode } = useUserTheme();

	const { isGuest, spacing } = useLayoutContext();

	const { mediaType, mediaItem, query, name } = props;

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			{!isGuest && <MyReviews<MT> mediaItem={mediaItem} mediaType={mediaType} name={name} />}

			<OtherReviews<MT> mediaType={mediaType} query={query} name={name} />
		</VStack>
	);
};

export default ViewReviews;
