import { FC } from 'react';

import { Headline, Divider } from '@davidscicluna/component-library';

import { VStack, Text } from '@chakra-ui/react';

import { compact, uniq } from 'lodash';
import { sort } from 'fast-sort';

import { useUserTheme } from '../../../../../../../../../common/hooks';
import QuickViewModalPersonActions from '../QuickViewModalPersonActions';
import spacing from '../../../../common/data/spacing';
import ViewHeroText from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroText';
import ViewHeroLabel from '../../../../../../../../../pages/View/components/ViewHero/components/ViewHeroLabel';
import { Stats } from '../../../../../../../../../components';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';

import { QuickViewModalPersonContentProps } from './types';

const QuickViewModalPersonContent: FC<QuickViewModalPersonContentProps> = (props) => {
	const { colorMode } = useUserTheme();

	const { person, movieCredits, movieDepartments = [], tvShowCredits, tvShowDepartments = [] } = props;
	const { name, biography } = person;

	const { cast: movieCastCredits = [], crew: movieCrewCredits = [] } = movieCredits || {};

	const { cast: tvShowCastCredits = [], crew: tvShowCrewCredits = [] } = tvShowCredits || {};

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
				renderTitle={(props) => (
					<Text {...props} fontSize='5xl'>
						{name}
					</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{sort(
							uniq([
								...movieDepartments.map(({ label }) => label),
								...tvShowDepartments.map(({ label }) => label)
							])
						)
							.asc()
							.join(', ')}
					</Text>
				)}
			/>

			<QuickViewModalPersonActions person={person} />

			<VStack width='100%' alignItems='stretch' justifyContent='stretch' spacing={spacing}>
				{biography && (
					<ViewHeroLabel label='Biography'>
						<ViewHeroText whiteSpace='normal' noOfLines={3}>
							{biography}
						</ViewHeroText>
					</ViewHeroLabel>
				)}

				{movieCastCredits.length +
					movieCrewCredits.length +
					tvShowCastCredits.length +
					tvShowCrewCredits.length >
					0 && (
					<ViewHeroLabel label='Credits'>
						<Stats
							stats={compact([
								movieCastCredits.length + tvShowCastCredits.length > 0
									? { label: 'Cast', total: movieCastCredits.length + tvShowCastCredits.length }
									: null,
								movieCastCredits.length + movieCrewCredits.length > 0
									? {
											label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' }),
											total: movieCastCredits.length + movieCrewCredits.length
									  }
									: null,
								tvShowCastCredits.length + tvShowCrewCredits.length > 0
									? {
											label: formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' }),
											total: tvShowCastCredits.length + tvShowCrewCredits.length
									  }
									: null,
								movieCrewCredits.length + tvShowCrewCredits.length > 0
									? { label: 'Crew', total: movieCrewCredits.length + tvShowCrewCredits.length }
									: null
							])}
							isFullWidth
							spacing={1}
						/>
					</ViewHeroLabel>
				)}
			</VStack>
		</VStack>
	);
};

export default QuickViewModalPersonContent;
