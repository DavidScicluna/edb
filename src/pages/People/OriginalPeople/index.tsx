import { FC, useState, lazy } from 'react';

import { useLocation } from 'react-router';

import { Undefinable } from '@davidscicluna/component-library';

import { Text } from '@chakra-ui/react';

import qs from 'query-string';
import { uniqBy } from 'lodash';

import { useLayoutContext } from '../../../containers/Layout/common/hooks';
import Page from '../../../containers/Page';
import PageBody from '../../../containers/Page/components/PageBody';
import PageHeader from '../../../containers/Page/components/PageHeader';
import { DisplayMode, Suspense } from '../../../components';
import { usePeopleInfiniteQuery } from '../../../common/queries';
import { PartialPerson } from '../../../common/types/person';
import { UsePeopleInfiniteQueryResponse } from '../../../common/queries/usePeopleInfiniteQuery';
import VerticalDummyPeople from '../components/VerticalDummyPeople';
import { formatMediaTypeLabel } from '../../../common/utils';
import { useDebounce } from '../../../common/hooks';

const VerticalPeople = lazy(() => import('../components/VerticalPeople'));

const OriginalPeople: FC = () => {
	const { spacing } = useLayoutContext();

	const location = useLocation();

	const [people, setPeople] = useState<UsePeopleInfiniteQueryResponse>();
	const peopleDebounced = useDebounce<Undefinable<UsePeopleInfiniteQueryResponse>>(people, 'slow');

	const peopleInfiniteQuery = usePeopleInfiniteQuery({
		config: {
			params: {
				...(qs.parse(location.search || '') || {}),
				append_to_response: 'known_for_department'
			}
		},
		options: {
			onSuccess: (data) => {
				let people: PartialPerson[] = [];

				data.pages.forEach((page) => {
					people = [...people, ...(page?.results || [])];
				});

				setPeople({
					page: data.pages[data.pages.length - 1].page,
					results: uniqBy([...people], 'id'),
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	});

	return (
		<Page>
			<PageHeader
				renderTitle={(props) => (
					<Text {...props}>{formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })}</Text>
				)}
				renderSubtitle={(props) => (
					<Text {...props}>
						{`A list containing the most popular ${formatMediaTypeLabel({
							type: 'multiple',
							mediaType: 'person'
						})} at the moment.`}
					</Text>
				)}
				actions={<DisplayMode />}
				direction='row'
				spacing={spacing}
				px={spacing}
				py={spacing * 2}
			/>
			<PageBody p={spacing}>
				<Suspense fallback={<VerticalDummyPeople />}>
					<VerticalPeople query={peopleInfiniteQuery} people={peopleDebounced} />
				</Suspense>
			</PageBody>
		</Page>
	);
};

export default OriginalPeople;
