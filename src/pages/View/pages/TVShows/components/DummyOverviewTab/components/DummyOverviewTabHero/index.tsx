import { FC } from 'react';

import ViewHero from '../../../../../../components/ViewHero';
import ViewHeroCover from '../../../../../../components/ViewHero/components/ViewHeroCover';
import ViewHeroCoverDummyBackdrop from '../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyBackdrop';
import ViewHeroCoverDummyPoster from '../../../../../../components/ViewHero/components/ViewHeroCover/components/ViewHeroCoverDummyPoster';
import ViewHeroDummyCrew from '../../../../../../components/ViewHero/components/ViewHeroDummyCrew';
import ViewHeroDummyGenres from '../../../../../../components/ViewHero/components/ViewHeroDummyGenres';
import ViewHeroDummyKeywords from '../../../../../../components/ViewHero/components/ViewHeroDummyKeywords';
import ViewHeroDummyPlot from '../../../../../../components/ViewHero/components/ViewHeroDummyPlot';
import ViewHeroDummyTagline from '../../../../../../components/ViewHero/components/ViewHeroDummyTagline';
import ViewHeroVStack from '../../../../../../components/ViewHero/components/ViewHeroVStack';

const DummyOverviewTabHero: FC = () => {
	return (
		<ViewHero>
			<ViewHeroVStack>
				<ViewHeroCover
					renderPoster={() => <ViewHeroCoverDummyPoster />}
					renderBackdrop={() => <ViewHeroCoverDummyBackdrop />}
				/>

				<ViewHeroVStack px={2} pb={2}>
					<ViewHeroDummyTagline />

					<ViewHeroDummyPlot />

					<ViewHeroDummyGenres />

					<ViewHeroDummyCrew label='Created By' />

					<ViewHeroDummyCrew label='Directors' />

					<ViewHeroDummyCrew label='Producers' />

					<ViewHeroDummyCrew label='Writers' />

					<ViewHeroDummyCrew label='Executive Producers' />

					<ViewHeroDummyKeywords />
				</ViewHeroVStack>
			</ViewHeroVStack>
		</ViewHero>
	);
};

export default DummyOverviewTabHero;
