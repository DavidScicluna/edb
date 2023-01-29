import { FC, useState } from 'react';

import { useTheme, useDebounce, Button, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, Text } from '@chakra-ui/react';

import { compact, range, sample } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';
import numbro from 'numbro';

import dimensions from '../../../../components/Posters/common/data/dimensions';
import { useUserTheme } from '../../../../common/hooks';
import {
	HorizontalGrid,
	HorizontalGridHeader,
	HorizontalGridBody,
	HorizontalGridScroll,
	HorizontalGridFooter,
	QueryEmpty,
	QueryEmptyStack,
	QueryEmptyIcon,
	QueryEmptyBody,
	QueryEmptyTitle,
	QueryEmptySubtitle,
	DummyVerticalPoster,
	MovieVerticalPoster,
	TVShowVerticalPoster
} from '../../../../components';
import { getEmptySubtitle } from '../../../../components/QueryEmpty/common/utils';
import { MediaType } from '../../../../common/types';

import { getKnownFor } from './common/utils';
import { ViewKnownForCredits, ViewKnownForProps } from './types';

const ViewKnownFor: FC<ViewKnownForProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const {
		credits,
		title = 'Known For',
		subtitle,
		emptyLabel,
		total = 0,
		isFetching = false,
		isLoading = false,
		isError = false,
		isSuccess = false,
		onFooterClick
	} = props;
	const { cast = [], crew = [] } = credits || {};

	const [knownFor, setKnownFor] = useState<ViewKnownForCredits>(getKnownFor({ credits: { cast, crew } }) || []);
	const knownForDebounced = useDebounce<ViewKnownForCredits>(knownFor, 'slow');

	useUpdateEffect(() => {
		setKnownFor(getKnownFor({ credits: { cast, crew } }) || []);
	}, [cast, crew]);

	return (
		// TODO: Go over all HorizontalGrid and disabled if loading or error or not items
		<HorizontalGrid
			colorMode={colorMode}
			isDisabled={knownForDebounced.length === 0 || isLoading}
			isFullWidth
			spacing={2}
			p={2}
		>
			<HorizontalGridHeader
				renderTitle={(props) => <Text {...props}>{title}</Text>}
				renderSubtitle={subtitle ? (props) => <Text {...props}>{subtitle}</Text> : undefined}
				arrowProps={{ variant: 'icon' }}
				spacing={0}
			/>
			<HorizontalGridBody>
				{!(isFetching || isLoading) && isError ? (
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
									{getEmptySubtitle({ type: 'error', label: emptyLabel })}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && knownForDebounced && knownForDebounced.length === 0 ? (
					<QueryEmpty color={color} colorMode={colorMode}>
						<QueryEmptyStack>
							<QueryEmptyBody>
								<QueryEmptyTitle />
								<QueryEmptySubtitle>
									{getEmptySubtitle({ type: 'empty', label: emptyLabel })}
								</QueryEmptySubtitle>
							</QueryEmptyBody>
						</QueryEmptyStack>
					</QueryEmpty>
				) : !(isFetching || isLoading) && isSuccess && knownForDebounced && knownForDebounced.length > 0 ? (
					<HorizontalGridScroll>
						{compact(
							knownForDebounced.map((mediaItem) =>
								mediaItem.media_type === 'movie' ? (
									<MovieVerticalPoster key={mediaItem.id} movie={mediaItem} sx={dimensions} />
								) : mediaItem.media_type === 'tv' ? (
									<TVShowVerticalPoster key={mediaItem.id} show={mediaItem} sx={dimensions} />
								) : null
							)
						)}
					</HorizontalGridScroll>
				) : (
					<HorizontalGridScroll>
						{range(20).map((_dummy, index) => (
							<DummyVerticalPoster
								key={index}
								mediaType={sample(['movie', 'tv']) as MediaType}
								hasSubtitle
								sx={dimensions}
							/>
						))}
					</HorizontalGridScroll>
				)}
			</HorizontalGridBody>
			{onFooterClick && (
				<HorizontalGridFooter>
					<Button
						color={color}
						colorMode={colorMode}
						isFullWidth
						onClick={onFooterClick}
						size={isSm ? 'xs' : 'sm'}
						variant='text'
					>
						{`View all ${numbro(total).format({ average: true })} credits`}
					</Button>
				</HorizontalGridFooter>
			)}
		</HorizontalGrid>
	);
};

export default ViewKnownFor;
