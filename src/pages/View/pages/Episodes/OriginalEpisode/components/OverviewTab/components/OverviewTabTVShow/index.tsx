import { FC } from 'react';

import { useParams } from 'react-router';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import { TVShowHorizontalPoster } from '../../../../../../../../../components';
import { useEpisodeContext } from '../../../../common/hooks';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { EpisodeParams } from '../../../../types';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import DummyOverviewTabTVShow from '../../../../../components/DummyOverviewTab/components/DummyOverviewTabTVShow';

const OverviewTabTVShow: FC = () => {
	const { colorMode } = useUserTheme();

	const { season, episode: episode_number } = useParams<EpisodeParams>();

	const { showQuery } = useEpisodeContext();

	const { data: show, isFetching, isLoading, isError } = showQuery || {};
	const { name } = show || {};

	return !isError && (isFetching || isLoading) ? (
		<DummyOverviewTabTVShow />
	) : !isError && !!show ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderTitle={(props) => (
					<Text {...props}>
						{compact([
							`Season ${season}`,
							`Episode ${episode_number}`,
							'of the',
							name ? `${name}` : null,
							`${formatMediaTypeLabel({ type: 'single', mediaType: 'tv' })}`
						]).join(' ')}
					</Text>
				)}
			/>
			<CardBody>
				<TVShowHorizontalPoster show={show} />
			</CardBody>
		</Card>
	) : null;
};

export default OverviewTabTVShow;
