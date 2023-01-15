import { FC } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import ViewHeroTagline from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroTagline';
import ViewHeroPlot from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroPlot';
import ViewHeroGenres from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroGenres';
import { formatDate,  } from '../../../../../../../../../common/utils';
import QuickViewModalMovieActions from '../QuickViewModalMovieActions';
import spacing from '../../../../common/data/spacing';
import { Rating } from '../../../../../../../../../components';

import { QuickViewModalMovieContentProps } from './types';

const QuickViewModalMovieContent: FC<QuickViewModalMovieContentProps> = ({ movie }) => {
	const { colorMode } = useUserTheme();

	const { title, vote_average, vote_count, release_date, tagline, overview, genres = [] } = movie;

	return (
		<VStack
			width='100%'
			height='100%'
			alignItems='stretch'
			justifyContent='center'
			divider={<Divider colorMode={colorMode} />}
			spacing={spacing}
		>
			<Headline
				width='100%'
				renderCaption={
					vote_average ? () => <Rating rating={vote_average} count={vote_count} size='2xl' /> : undefined
				}
				renderTitle={(props) => (
					<Text {...props} fontSize='5xl'>
						{title}
					</Text>
				)}
				renderSubtitle={
					release_date
						? (props) => (
								<Text {...props}>
									{`${
										dayjs(release_date).isBefore(new Date()) ? 'Was' : 'Will be'
									} released on ${formatDate({ date: release_date })}`}
								</Text>
						  )
						: undefined
				}
			/>

			<QuickViewModalMovieActions movie={movie} />

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				{tagline ? <ViewHeroTagline tagline={tagline} /> : null}

				{overview ? <ViewHeroPlot plot={overview} noOfLines={3} /> : null}

				{genres.length > 0 ? <ViewHeroGenres mediaType='movie' genres={genres} /> : null}
			</VStack>
		</VStack>
	);
};

export default QuickViewModalMovieContent;
