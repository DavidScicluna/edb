import { ReactElement, useEffect, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import { useMediaQuery, useBoolean, VStack, ScaleFade } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import mergeWith from 'lodash/mergeWith';
import uniqBy from 'lodash/uniqBy';
import qs from 'query-string';
import { useUpdateEffect } from 'usehooks-ts';

import { useSelector } from '../../common/hooks';
import axiosInstance, { handleDelay } from '../../common/scripts/axios';
import { Response } from '../../common/types';
import { PartialPerson } from '../../common/types/person';
import DisplayMode from '../../components/Clickable/DisplayMode';
import LoadMore from '../../components/Clickable/LoadMore';
import Page from '../../containers/Page';
import { defaultUser, getUser } from '../../store/slices/Users';

import VerticalPeople from './components/Orientation/Vertical';

const People = (): ReactElement => {
	const source = axios.CancelToken.source();

	const [isSm] = useMediaQuery('(max-width: 600px)');

	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [people, setPeople] = useState<Response<PartialPerson[]>>();
	const [isFetchingPage, setIsFetchingPage] = useBoolean();

	// Fetching People
	const peopleQuery = useInfiniteQuery(
		'people',
		async ({ pageParam = 1 }) => {
			const { data } = await axiosInstance
				.get<Response<PartialPerson[]>>('/person/popular', {
					params: {
						...(qs.parse(searchParams.toString() || '') || {}),
						page: pageParam || 1,
						append_to_response: 'known_for_department'
					},
					cancelToken: source.token
				})
				.then((response) => handleDelay(isFetchingPage ? 0 : 2500, response));
			return data;
		},
		{
			getPreviousPageParam: (firstPage) => (firstPage.page !== 1 ? (firstPage?.page || 0) - 1 : false),
			getNextPageParam: (lastPage) =>
				lastPage.page !== lastPage.total_pages ? (lastPage?.page || 0) + 1 : false,
			onSuccess: (data) => {
				let people: PartialPerson[] = [];

				data.pages.forEach((page) => {
					people = [...people, ...(page?.results || [])];
				});

				setPeople({
					page: data.pages[data.pages.length - 1].page,
					results: [...uniqBy(people, 'id')],
					total_pages: data.pages[data.pages.length - 1].total_pages,
					total_results: data.pages[data.pages.length - 1].total_results
				});
			}
		}
	);

	const handleLoadMore = (): void => {
		const page = people?.page || 1;

		setSearchParams(mergeWith({ page: page + 1 }));

		setIsFetchingPage.on();

		setTimeout(() => peopleQuery.fetchNextPage(), 250);
	};

	useUpdateEffect(() => {
		const currentSearch = qs.parse(location.search);
		const totalPages =
			currentSearch && currentSearch.page && typeof currentSearch.page === 'string'
				? Number(currentSearch.page)
				: 1;
		const page = people?.page || 1;

		if (page < totalPages && peopleQuery.hasNextPage) {
			setIsFetchingPage.on();

			peopleQuery.fetchNextPage();
		}
	}, [people?.page]);

	useEffect(() => {
		return () => source.cancel();
	}, []);

	return (
		<Page title='People' direction='row'>
			{{
				actions: <DisplayMode />,
				body: (
					<VStack width='100%' spacing={4} px={2} pt={2}>
						<VerticalPeople
							isError={peopleQuery.isError}
							isSuccess={peopleQuery.isSuccess}
							isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
							people={people?.results || []}
						/>

						<ScaleFade in={!peopleQuery.isError} unmountOnExit style={{ width: isSm ? '100%' : 'auto' }}>
							<LoadMore
								color={color}
								amount={people?.results?.length || 0}
								total={people?.total_results || 0}
								label='People'
								isLoading={peopleQuery.isFetching || peopleQuery.isLoading}
								isButtonVisible={(peopleQuery.hasNextPage || true) && !peopleQuery.isError}
								onClick={handleLoadMore}
							/>
						</ScaleFade>
					</VStack>
				)
			}}
		</Page>
	);
};

export default People;
