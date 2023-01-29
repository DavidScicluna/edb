import { FC, useState, useCallback, useEffect, Fragment, lazy } from 'react';

import { useDebounce, Headline } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import { debounce } from 'lodash';

import { TabItemStructure, Suspense, TotalBadge } from '../../../../../../../components';
import { TabItemStructureStatus } from '../../../../../../../components/Tabs/TabItemStructure/types';
import { status as defaultStatus } from '../../../../../../../components/Tabs/TabItemStructure/common/data/defaultPropValues';
import { formatMediaTypeLabel } from '../../../../../../../common/utils';
import { usePersonContext } from '../../common/hooks';
import { useUserTheme } from '../../../../../../../common/hooks';
import DummyTabs from '../../../components/DummyCreditsTab/components/DummyCreditsTabTabs';
import DummyTab from '../../../components/DummyCreditsTab/components/DummyCreditsTabMediaTypeTab';

import CreditsTabEmpty from './components/CreditsTabEmpty';
import { CreditsTabProps } from './types';

const Tabs = lazy(() => import('./components/CreditsTabTabs'));
const Movies = lazy(() => import('./components/CreditsTabMoviesTab'));
const TVShows = lazy(() => import('./components/CreditsTabTVShowsTab'));

const CreditsTab: FC<CreditsTabProps> = ({ movieDepartments = [], tvShowDepartments = [], total }) => {
	const { color, colorMode } = useUserTheme();

	const { personQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name, gender } = person || {};

	// TODO: Go over all contexts for edb & component-lib & create hooks instead of passing types each time
	// TODO: Check all statusDebounced & replace component with TabItemStructure
	const [status, setStatus] = useState<TabItemStructureStatus>(defaultStatus);
	const statusDebounced = useDebounce<TabItemStructureStatus>(status);

	const [activeTab, setActiveTab] = useState<number>(0);
	const activeTabDebounced = useDebounce<number>(activeTab);

	const handleStatus = useCallback(
		debounce((): void => {
			let total = 0;

			if (movieDepartments.length > 0) {
				total = total + 1;
			}

			if (tvShowDepartments.length > 0) {
				total = total + 1;
			}

			setStatus(total === 0 ? 'empty' : total === 1 ? 'single' : 'multiple');
		}, 500),
		[movieDepartments, tvShowDepartments]
	);

	useEffect(() => {
		setStatus('loading');

		handleStatus();
	}, [movieDepartments, tvShowDepartments]);

	return (
		<TabItemStructure
			status={statusDebounced}
			headline={
				<Headline
					width='100%'
					renderCaption={() => (
						<TotalBadge
							color={color}
							colorMode={colorMode}
							prefix={`${
								name ? name : formatMediaTypeLabel({ type: 'single', mediaType: 'person' })
							} has a total of`}
							suffix='Credits'
							total={total}
						/>
					)}
					renderTitle={(props) => <Text {...props}>Credits</Text>}
					renderSubtitle={(props) => (
						<Text {...props}>
							{`This Tab contains all the ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'movie'
							})} & ${formatMediaTypeLabel({
								type: 'multiple',
								mediaType: 'tv'
							})} that ${
								name ? name : `the ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })}`
							} was part of during ${
								gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'
							} career and also contains ${
								gender === 1 ? 'her' : gender === 2 ? 'his' : 'their'
							} upcoming credits in the years to come.`}
						</Text>
					)}
				/>
			}
			dummy={<DummyTabs />}
			empty={<CreditsTabEmpty />}
			multiple={
				<Suspense fallback={<DummyTabs />}>
					<Tabs
						activeTab={activeTabDebounced}
						movieDepartments={movieDepartments}
						tvShowDepartments={tvShowDepartments}
						onChange={({ index }) => setActiveTab(index)}
					/>
				</Suspense>
			}
			single={
				<Fragment>
					{movieDepartments.length > 0 && (
						<Suspense fallback={<DummyTab />}>
							<Movies movieDepartments={movieDepartments} />
						</Suspense>
					)}

					{tvShowDepartments.length > 0 && (
						<Suspense fallback={<DummyTab />}>
							<TVShows tvShowDepartments={tvShowDepartments} />
						</Suspense>
					)}
				</Fragment>
			}
		/>
	);
};

export default CreditsTab;
