import { FC } from 'react';

import { useParams } from 'react-router';

import { useTheme, Card, CardHeader, CardBody, Icon } from '@davidscicluna/component-library';

import { HStack, Text } from '@chakra-ui/react';

import { compact } from 'lodash';

import { useTVShowEpisodeQuery } from '../../../../../../../../../common/queries';
import ViewEpisode from '../../../../../../../components/ViewEpisode';
import DummyOverviewTabEpisode from '../../../../../components/DummyOverviewTab/components/DummyOverviewTabEpisode';
import { EpisodeParams } from '../../../../types';
import { useUserTheme } from '../../../../../../../../../common/hooks';

import { OverviewTabEpisodeProps } from './types';

const OverviewTabEpisode: FC<OverviewTabEpisodeProps> = ({ type, season, episode }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { id } = useParams<EpisodeParams>();

	const {
		data: fullEpisode,
		isFetching,
		isLoading,
		isError
	} = useTVShowEpisodeQuery({ props: { id: Number(id), season: Number(season), episode: Number(episode) } });

	return !isError && (isFetching || isLoading) ? (
		<DummyOverviewTabEpisode />
	) : !isError && !!fullEpisode ? (
		<Card colorMode={colorMode} isFullWidth p={2}>
			<CardHeader
				renderTitle={({ color, ...rest }) => (
					<HStack
						width='100%'
						alignItems='center'
						justifyContent={type === 'prev' ? 'flex-start' : 'flex-end'}
					>
						{type === 'prev' && (
							<Icon
								width={theme.fontSizes['2xl']}
								height={theme.fontSizes['2xl']}
								fontSize={theme.fontSizes['2xl']}
								color={color}
								colorMode={colorMode}
								icon='arrow_back'
								category='outlined'
							/>
						)}
						<Text {...rest} color={color}>
							{[type === 'prev' ? 'Previous' : 'Next', 'Episode', `(S${season} • E${episode})`].join(' ')}
						</Text>
						{type === 'next' && (
							<Icon
								width={theme.fontSizes['2xl']}
								height={theme.fontSizes['2xl']}
								fontSize={theme.fontSizes['2xl']}
								color={color}
								colorMode={colorMode}
								icon='arrow_forward'
								category='outlined'
							/>
						)}
					</HStack>
				)}
			/>
			<CardBody>
				<ViewEpisode
					episode={{ ...fullEpisode, show_id: Number(id) }}
					badgeLabel={compact([
						fullEpisode.season_number ? `S${fullEpisode.season_number}` : null,
						fullEpisode.episode_number ? `E${fullEpisode.episode_number}` : null
					]).join(' • ')}
				/>
			</CardBody>
		</Card>
	) : null;
};

export default OverviewTabEpisode;
