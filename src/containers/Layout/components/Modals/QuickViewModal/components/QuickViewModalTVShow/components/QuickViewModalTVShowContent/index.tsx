import { FC } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import { compact } from 'lodash';
import numbro from 'numbro';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import ViewHeroTagline from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroTagline';
import ViewHeroPlot from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroPlot';
import ViewHeroGenres from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroGenres';
import { formatDate } from '../../../../../../../../../common/utils';
import QuickViewModalTVShowActions from '../QuickViewModalTVShowActions';
import spacing from '../../../../common/data/spacing';
import { Rating } from '../../../../../../../../../components';

import { QuickViewModalTVShowContentProps } from './types';

const QuickViewModalTVShowContent: FC<QuickViewModalTVShowContentProps> = ({ show }) => {
	const { colorMode } = useUserTheme();

	const {
		name,
		vote_average,
		vote_count,
		first_air_date,
		last_air_date,
		tagline,
		overview,
		genres = [],
		seasons = [],
		status
	} = show;

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
						{name}
					</Text>
				)}
				renderSubtitle={
					first_air_date
						? (props) => (
								<Text {...props}>
									{compact([
										`First air-date ${
											dayjs(first_air_date).isBefore(new Date()) ? 'was' : 'will be'
										} on ${formatDate({ date: first_air_date })}`,
										last_air_date
											? status === 'Returning Series' || dayjs(last_air_date).isAfter(new Date())
												? 'is currently still ongoing'
												: `ended on ${formatDate({ date: last_air_date })}`
											: null,
										seasons.length > 0
											? status === 'Returning Series' || dayjs(last_air_date).isAfter(new Date())
												? `currently is in it's ${numbro(seasons.length).format({
														output: 'ordinal'
												  })} season`
												: `lasted for ${seasons.length} season${
														seasons.length === 1 ? '' : 's'
												  }`
											: null
									]).join(' and ')}
								</Text>
						  )
						: undefined
				}
			/>

			<QuickViewModalTVShowActions show={show} />

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				{tagline ? <ViewHeroTagline tagline={tagline} /> : null}

				{overview ? <ViewHeroPlot plot={overview} noOfLines={3} /> : null}

				{genres.length > 0 ? <ViewHeroGenres mediaType='tv' genres={genres} /> : null}
			</VStack>
		</VStack>
	);
};

export default QuickViewModalTVShowContent;
