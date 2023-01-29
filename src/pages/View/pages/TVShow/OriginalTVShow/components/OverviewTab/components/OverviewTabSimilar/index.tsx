import { FC } from 'react';

import { useTVShowContext } from '../../../../common/hooks';
import ViewSimilar from '../../../../../../../components/ViewSimilar/OriginalViewSimilar';

const OverviewTabSimilar: FC = () => {
	const { showQuery } = useTVShowContext();

	const { data: show } = showQuery || {};

	return <ViewSimilar mediaType='tv' mediaItem={show} />;
};

export default OverviewTabSimilar;
