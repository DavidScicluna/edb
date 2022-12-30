import { FC } from 'react';

import Hero from '../../../../../../components/ViewHero';
import ViewHeroCover from '../../../../../../components/ViewHero/components/ViewHeroCover';
import ViewHeroCoverDummyBackdrop from '../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyBackdrop';
import ViewHeroCoverDummyPoster from '../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyPoster';
import ViewHeroDummyPlot from '../../../../../../components/ViewHero/components/ViewHeroDummyPlot';
import ViewHeroDummyTagline from '../../../../../../components/ViewHero/components/ViewHeroDummyTagline';
import ViewHeroDummyKeywords from '../../../../../../components/ViewHero/components/ViewHeroDummyKeywords';
import ViewHeroDummyGenres from '../../../../../../components/ViewHero/components/ViewHeroDummyGenres';
import ViewHeroDummyCrew from '../../../../../../components/ViewHero/components/ViewHeroDummyCrew';
import ViewHeroVStack from '../../../../../../components/ViewHero/components/ViewHeroVStack';

const DummyOverviewTabHero: FC = () => {
	return (
		<Hero>
			<ViewHeroVStack>
				<ViewHeroCover
					renderPoster={() => <ViewHeroCoverDummyPoster />}
					renderBackdrop={() => <ViewHeroCoverDummyBackdrop />}
				/>

				<ViewHeroVStack px={2} pb={2}>
					<ViewHeroDummyTagline />

					<ViewHeroDummyPlot />

					<ViewHeroDummyGenres />

					<ViewHeroDummyCrew label='Directors' />

					<ViewHeroDummyCrew label='Executive Producers' />

					<ViewHeroDummyCrew label='Producers' />

					<ViewHeroDummyCrew label='Writers' />

					<ViewHeroDummyKeywords />
				</ViewHeroVStack>
			</ViewHeroVStack>
		</Hero>
	);
};

export default DummyOverviewTabHero;
