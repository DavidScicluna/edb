import { ReactElement } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';
import HorizontalTVShowPoster from '../../../../../../../TV/components/Poster/Horizontal';

import { Text } from '@chakra-ui/react';
import { ShowProps } from './types';

const Show = ({ show, isLoading = true }: ShowProps): ReactElement => {
	return (
		<Card isFullWidth>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>{`Part of ${show?.name ? `"${show.name}" show` : 'TV Show Name'}`}</Text>
				)}
			/>
			<CardBody>
				<HorizontalTVShowPoster key={show?.id} show={show} isLoading={isLoading} />
			</CardBody>
		</Card>
	);
};

export default Show;
