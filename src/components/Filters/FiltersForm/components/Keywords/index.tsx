import { FC, useState, useCallback, useEffect } from 'react';

import {
	Space,
	useTheme,
	useDebounce,
	Card,
	CardHeader,
	CardBody,
	Button,
	Badge,
	BadgeLabel,
	Divider,
	Icon,
	ScaleFade,
	utils
} from '@davidscicluna/component-library';

import { VStack, Center, Wrap, WrapItem, List, ListItem, Text } from '@chakra-ui/react';

import { SpinnerCircularFixed } from 'spinners-react';
import { Controller } from 'react-hook-form';
import { debounce, range, uniqBy } from 'lodash';
import { useInView } from 'react-cool-inview';

import defaultValues from '../../../common/data/defaults';
import { QueryError as QueryErrorType, Keyword as KeywordType } from '../../../../../common/types';
import { useUserTheme } from '../../../../../common/hooks';
import { useKeywordsInfiniteQuery } from '../../../../../common/queries';
import { UseKeywordsInfiniteQueryResponse } from '../../../../../common/queries/useKeywordsInfiniteQuery';
import QueryEmpty from '../../../../QueryEmpty';
import QueryEmptyStack from '../../../../QueryEmpty/components/QueryEmptyStack';
import QueryEmptyIcon from '../../../../QueryEmpty/components/QueryEmptyIcon';
import QueryEmptyBody from '../../../../QueryEmpty/components/QueryEmptyBody';
import QueryEmptyTitle from '../../../../QueryEmpty/components/QueryEmptyTitle';
import QueryEmptySubtitle from '../../../../QueryEmpty/components/QueryEmptySubtitle';
import QueryEmptyActions from '../../../../QueryEmpty/components/QueryEmptyActions';
import { getEmptySubtitle } from '../../../../QueryEmpty/common/utils';

import KeywordsSearch from './components/KeywordsSearch';
import { KeywordsProps } from './types';
import SearchedKeyword from './components/SearchedKeyword';
import SearchedDummyKeyword from './components/SearchedDummyKeyword';
import Keyword from './components/Keyword';
import KeywordsCardActions from './components/KeywordsCardActions';

const { getColor } = utils;

const spacing: Space = 2;

const Keywords: FC<KeywordsProps> = ({ form }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { control, setValue } = form;

	const [keywords, setKeywords] = useState<UseKeywordsInfiniteQueryResponse>();

	const [keyword, setKeyword] = useState<string>('');

	const [query, setQuery] = useState<string>('');
	const queryDebounced = useDebounce<string>(query);

	const [error, setError] = useState<QueryErrorType>();

	const { isFetchingNextPage, isFetching, isLoading, isError, isSuccess, hasNextPage, fetchNextPage, refetch } =
		useKeywordsInfiniteQuery({
			props: { query: queryDebounced },
			options: {
				enabled: !!queryDebounced,
				onSuccess: (data) => {
					let keywords: KeywordType[] = [];

					data.pages.forEach((page) => {
						keywords = [...keywords, ...(page?.results || [])];
					});

					setKeywords({
						page: data.pages[data.pages.length - 1].page,
						results: uniqBy([...keywords], 'id'),
						total_pages: data.pages[data.pages.length - 1].total_pages,
						total_results: data.pages[data.pages.length - 1].total_results
					});
				},
				onError: (error) => setError(error.response?.data)
			}
		});

	const { observe } = useInView<HTMLLIElement>({
		onEnter: ({ unobserve }) => {
			unobserve();

			if (hasNextPage) {
				fetchNextPage();
			}
		}
	});

	const handleSetQuery = useCallback(
		debounce(() => {
			setQuery(keyword);
		}, 250),
		[keyword]
	);

	useEffect(() => handleSetQuery(), [keyword]);

	return (
		<Controller
			control={control}
			name='keywords'
			render={({ field: { onBlur, value: selectedKeywords = [], name } }) => (
				<Card colorMode={colorMode} isFullWidth onBlur={onBlur} p={spacing}>
					<CardHeader
						renderTitle={(props) => <Text {...props}>Keywords</Text>}
						actions={
							keywords && keywords.results && keywords.results.length > 0 ? (
								<KeywordsCardActions
									allKeywords={keywords.results.length}
									keywords={selectedKeywords.length}
									onClear={() => setValue(name, defaultValues.keywords, { shouldDirty: true })}
									onToggle={() =>
										setValue(
											name,
											selectedKeywords.length === (keywords?.results?.length || 0)
												? []
												: [...(keywords?.results || [])].map(({ id }) => id),
											{ shouldDirty: true }
										)
									}
								/>
							) : undefined
						}
					/>
					<CardBody>
						<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
							{selectedKeywords.length > 0 && (
								<Wrap width='100%' spacing={1}>
									{selectedKeywords.map((k) => (
										<WrapItem key={k}>
											<Keyword
												id={k}
												onDelete={() =>
													setValue(
														name,
														selectedKeywords.filter((keyword) => keyword !== k),
														{ shouldDirty: true }
													)
												}
											/>
										</WrapItem>
									))}
								</Wrap>
							)}

							<KeywordsSearch
								name={name}
								onChange={(event) => setKeyword(event.target.value)}
								value={keyword}
							/>

							{!!queryDebounced && (
								<Center width='100%'>
									{!(isFetchingNextPage || isFetching || isLoading) && isError ? (
										<QueryEmpty color={color} colorMode={colorMode}>
											<QueryEmptyStack>
												<QueryEmptyIcon
													renderIcon={(props) => (
														<Icon
															{...props}
															width={theme.fontSizes['6xl']}
															height={theme.fontSizes['6xl']}
															fontSize={theme.fontSizes['6xl']}
															icon='error_outline'
														/>
													)}
													p={2}
												/>
												<QueryEmptyBody>
													<QueryEmptyTitle />
													<QueryEmptySubtitle>
														{getEmptySubtitle({
															type: 'error',
															label: `"${queryDebounced}" Keyword`
														})}
													</QueryEmptySubtitle>
												</QueryEmptyBody>

												{error && error.status_code && error.status_message && (
													<Badge color={color} colorMode={colorMode}>
														<BadgeLabel>{`(${error.status_code}) ${error.status_message}`}</BadgeLabel>
													</Badge>
												)}

												<QueryEmptyActions
													renderActions={(props) => (
														<Button {...props} onClick={() => refetch()}>
															Try Again
														</Button>
													)}
												/>
											</QueryEmptyStack>
										</QueryEmpty>
									) : !(isFetchingNextPage || isFetching || isLoading) &&
									  isSuccess &&
									  keywords &&
									  keywords.results &&
									  keywords.results.length === 0 ? (
										<QueryEmpty color={color} colorMode={colorMode}>
											<QueryEmptyStack>
												<QueryEmptyBody>
													<QueryEmptyTitle />
													<QueryEmptySubtitle>
														{getEmptySubtitle({
															type: 'empty',
															label: `"${queryDebounced}" Keyword`
														})}
													</QueryEmptySubtitle>
												</QueryEmptyBody>
											</QueryEmptyStack>
										</QueryEmpty>
									) : !(isFetchingNextPage || isFetching || isLoading) &&
									  isSuccess &&
									  keywords &&
									  keywords.results &&
									  keywords.results.length > 0 ? (
										<List width='100%' maxHeight='350px' overflowY='auto' spacing={1}>
											{keywords.results.map(({ id, ...rest }, index) => (
												<ListItem
													key={id}
													ref={
														index === (keywords?.results?.length || 0) - 1 ? observe : null
													}
													width='100%'
												>
													<SearchedKeyword
														{...rest}
														isActive={selectedKeywords.some((keyword) => keyword === id)}
														onClick={() =>
															setValue(
																name,
																selectedKeywords.some((keyword) => keyword === id)
																	? selectedKeywords.filter(
																			(keyword) => keyword !== id
																	  )
																	: [...selectedKeywords, id],
																{ shouldDirty: true }
															)
														}
													/>
												</ListItem>
											))}

											<ScaleFade
												in={isFetchingNextPage || isFetching || isLoading}
												style={{ width: '100%' }}
											>
												<Center width='100%'>
													<SpinnerCircularFixed
														color={getColor({ theme, colorMode, color, type: 'color' })}
														secondaryColor={getColor({ theme, colorMode, type: 'divider' })}
														size={theme.fontSizes['2xl']}
														thickness={160}
														speed={140}
													/>
												</Center>
											</ScaleFade>
										</List>
									) : (
										<List width='100%' maxHeight='350px' overflowY='auto' spacing={1}>
											{range(keywords?.results?.length || 5).map((_dummy, index) => (
												<ListItem key={index}>
													<SearchedDummyKeyword />
												</ListItem>
											))}
										</List>
									)}
								</Center>
							)}
						</VStack>
					</CardBody>
				</Card>
			)}
		/>
	);
};

export default Keywords;
