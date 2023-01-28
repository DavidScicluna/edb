import { ReactElement, useState } from 'react';

import {
	Space,
	useTheme,
	useDebounce,
	Accordion,
	AccordionHeader,
	AccordionBody,
	Card,
	CardHeader,
	CardBody,
	Divider
} from '@davidscicluna/component-library';

import { useMediaQuery, VStack, Center, Text } from '@chakra-ui/react';

import { useUpdateEffect } from 'usehooks-ts';
import { compact, keys, uniq, uniqBy } from 'lodash';
import { sort } from 'fast-sort';
import numbro from 'numbro';
import dayjs from 'dayjs';

import {
	LoadMore,
	MovieHorizontalPoster,
	MovieVerticalPoster,
	TotalBadge,
	TVShowHorizontalPoster,
	TVShowVerticalPoster,
	VerticalGrid
} from '../../../../../../../../../components';
import { useSelector, useUserTheme } from '../../../../../../../../../common/hooks';
import { PersonCredit } from '../../../../types';
import { getDepartmentTotal } from '../../../../common/utils';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';
import { formatDate, formatMediaTypeLabel, getGenreLabelsByIDs } from '../../../../../../../../../common/utils';
import { usePersonContext } from '../../../../common/hooks';

import { CreditsTabAccordionProps, CreditsTabMediaType } from './types';

const limit = 5;

const today = formatDate({ date: dayjs(new Date()).toISOString(), section: 'year' });

const CreditsTabAccordion = <Cast extends PersonCredit, Crew extends PersonCredit>(
	props: CreditsTabAccordionProps<Cast, Crew>
): ReactElement => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const { personQuery } = usePersonContext();

	const { data: person } = personQuery || {};
	const { name } = person || {};

	const { mediaType, id, title, credits, isOpen = false } = props;

	const genres = useSelector((state) => state.options.data.genres[mediaType as CreditsTabMediaType]);

	const [total, setTotal] = useState<number>(getDepartmentTotal({ credits }));
	const totalDebounced = useDebounce<number>(total);

	const [visible, setVisible] = useState<number>(limit);
	const visibleDebounced = useDebounce<number>(visible, 'slow');

	const years = sort(uniq([...keys(credits.cast), ...keys(credits.crew)])).desc();

	useUpdateEffect(() => setTotal(getDepartmentTotal({ credits })), [credits]);

	return (
		<Accordion
			key={id}
			id={id}
			isDisabled={total === 0}
			header={
				<AccordionHeader
					renderTitle={(props) => <Text {...props}>{title}</Text>}
					// renderSubtitle={({ fontSize }) => (
					// )}
					actions={
						<TotalBadge
							color={isOpen ? color : 'gray'}
							colorMode={colorMode}
							total={totalDebounced}
							variant={isOpen ? 'contained' : 'outlined'}
						/>
					}
					spacing={1}
				/>
			}
			body={
				<AccordionBody>
					<VStack
						width='100%'
						divider={
							<Divider
								colorMode={colorMode}
								sx={{
									mt: `${theme.space[(spacing * 2) as Space]} !important`,
									mb: `${theme.space[2]} !important`
								}}
							/>
						}
						spacing={0}
					>
						{years
							.filter((_movie, index) => index < visibleDebounced)
							.map((year) => {
								const mediaItems = uniqBy(
									[...(credits.cast[year] || []), ...(credits.crew[year] || [])],
									'id'
								);
								return (
									<Center key={year} width='100%'>
										<Card colorMode={colorMode} isFullWidth variant='transparent' p={2}>
											<CardHeader
												renderTitle={(props) => <Text {...props}>{year}</Text>}
												renderSubtitle={(props) =>
													year !== 'Announced' ? (
														<Text {...props}>
															{`${
																today === year
																	? name
																		? `${name} is in`
																		: 'Is in'
																	: today > year
																	? name
																		? `${name} took part in`
																		: 'Took part in'
																	: name
																	? `${name} will be in`
																	: 'Will be in'
															} ${numbro(mediaItems.length).format({
																average: true
															})} ${formatMediaTypeLabel({
																type: mediaItems.length === 1 ? 'single' : 'multiple',
																mediaType
															})} ${today === year ? 'this year' : `in ${year}`}`}
														</Text>
													) : undefined
												}
											/>
											<CardBody>
												<VerticalGrid>
													{({ displayMode }) =>
														mediaItems.map((mediaItem) =>
															displayMode === 'list' && mediaType === 'movie' ? (
																<MovieHorizontalPoster
																	key={mediaItem.id}
																	movie={mediaItem}
																	subtitle={
																		mediaItem.character
																			? `As ${mediaItem.character}`
																			: undefined
																	}
																	description={
																		mediaItem.character &&
																		(!!mediaItem.release_date ||
																			!!mediaItem.genre_ids)
																			? `${compact([
																					mediaItem.release_date
																						? formatDate({
																								date: mediaItem.release_date
																						  })
																						: undefined,
																					mediaItem.genre_ids
																						? getGenreLabelsByIDs({
																								genres,
																								ids: mediaItem.genre_ids
																						  })
																						: undefined
																			  ]).join(' • ')}`
																			: undefined
																	}
																/>
															) : displayMode === 'list' && mediaType === 'tv' ? (
																<TVShowHorizontalPoster
																	key={mediaItem.id}
																	show={mediaItem}
																	subtitle={
																		mediaItem.character
																			? `As ${mediaItem.character}`
																			: undefined
																	}
																	description={
																		mediaItem.character &&
																		(!!mediaItem.first_air_date ||
																			!!mediaItem.genre_ids)
																			? `${compact([
																					mediaItem.first_air_date
																						? formatDate({
																								date: mediaItem.first_air_date
																						  })
																						: undefined,
																					mediaItem.genre_ids
																						? getGenreLabelsByIDs({
																								genres,
																								ids: mediaItem.genre_ids
																						  })
																						: undefined
																			  ]).join(' • ')}`
																			: undefined
																	}
																/>
															) : displayMode === 'grid' && mediaType === 'movie' ? (
																<MovieVerticalPoster
																	key={mediaItem.id}
																	movie={mediaItem}
																	subtitle={
																		mediaItem.character
																			? `As ${mediaItem.character}`
																			: undefined
																	}
																/>
															) : displayMode === 'grid' && mediaType === 'tv' ? (
																<TVShowVerticalPoster
																	key={mediaItem.id}
																	show={mediaItem}
																	subtitle={
																		mediaItem.character
																			? `As ${mediaItem.character}`
																			: undefined
																	}
																/>
															) : null
														)
													}
												</VerticalGrid>
											</CardBody>
										</Card>
									</Center>
								);
							})}

						<Center width={isSm ? '100%' : 'auto'}>
							<LoadMore
								amount={visibleDebounced}
								total={years.length}
								label={formatMediaTypeLabel({ type: 'multiple', mediaType })}
								isLoading={false}
								isButtonVisible={visibleDebounced <= years.length}
								onClick={() => setVisible((total) => total + limit)}
							/>
						</Center>
					</VStack>
				</AccordionBody>
			}
			spacing={2}
			p={2}
		/>
	);
};

export default CreditsTabAccordion;
