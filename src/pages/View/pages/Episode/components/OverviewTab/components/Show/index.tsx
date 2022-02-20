import { ReactElement } from 'react';

import { ShowProps } from './types';

import Panel from '../../../../../../../../components/Panel';
import HorizontalTVShowPoster from '../../../../../../../TV/components/Poster/Horizontal';

const Show = ({ show, isLoading = true }: ShowProps): ReactElement => {
	return (
		<Panel isFullWidth>
			{{
				header: {
					title: `Part of ${show?.name ? `"${show.name}" show` : 'TV Show Name'}`
				},
				body: <HorizontalTVShowPoster key={show?.id} show={show} isLoading={isLoading} />
			}}
		</Panel>
	);
};

export default Show;
