import { FC, useState, useCallback, useEffect } from 'react';

import { useTheme, InternalLink, utils, Undefinable } from '@davidscicluna/component-library';

import { useBreakpointValue, useBoolean, Center, Text } from '@chakra-ui/react';

import { useQueryClient } from '@tanstack/react-query';

import { capitalize, compact, debounce } from 'lodash';

import { useUserTheme } from '../../../../../../../../common/hooks';
import DummyBreadcrumb from '../DummyBreadcrumb';
import { formatMediaType, formatMediaTypeLabel } from '../../../../../../../../common/utils';
import { mediaTypeQueryKey } from '../../../../../../../../common/queries/useMediaTypeQuery';
import { FullPerson } from '../../../../../../../../common/types/person';
import { Collection, FullMovie } from '../../../../../../../../common/types/movie';
import { FullTVShow } from '../../../../../../../../common/types/tv';

import { BreadcrumbProps, BreadcrumbLabel } from './types';

const { getColor } = utils;

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb, match, isCurrentPage = false }) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const breadcrumbFontSize = useBreakpointValue({
		'base': theme.fontSizes.sm,
		'sm': theme.fontSizes.sm,
		'md': theme.fontSizes.md,
		'lg': theme.fontSizes.md,
		'xl': theme.fontSizes.md,
		'2xl': theme.fontSizes.md
	});

	const client = useQueryClient();

	const [isLoaded, setIsLoaded] = useBoolean();
	const [isText, setIsText] = useBoolean();

	const [label, setLabel] = useState<BreadcrumbLabel>();

	// TODO: Check if we should remove ... this is only a temporary solution
	const handleFormatBreadcrumb = (type: string): Undefinable<string> => {
		switch (type) {
			case formatMediaType({ mediaType: 'movie' }):
				return formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' });
			case formatMediaType({ mediaType: 'tv' }):
				return formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' });
			case formatMediaType({ mediaType: 'person' }):
				return formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' });
			case formatMediaType({ mediaType: 'collection' }):
				return formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' });
		}
	};

	const handleCheckCache = useCallback(
		debounce((): void => {
			const splitLocation = compact(match.pathname.split('/'));

			if (splitLocation.length > 1) {
				const type = splitLocation[0];
				const id = splitLocation[1];

				let label: BreadcrumbLabel;

				switch (type) {
					case formatMediaType({ mediaType: 'movie' }): {
						const movie = client.getQueryData<FullMovie>(
							mediaTypeQueryKey({ mediaType: 'movie', id: Number(id) })
						);
						label = movie?.title;
						break;
					}
					case formatMediaType({ mediaType: 'tv' }): {
						if (splitLocation.length > 2) {
							label = capitalize(splitLocation[splitLocation.length - 1]);
							setIsText.on();
						} else {
							const show = client.getQueryData<FullTVShow>(
								mediaTypeQueryKey({ mediaType: 'tv', id: Number(id) })
							);
							label = show?.name;
						}
						break;
					}
					case formatMediaType({ mediaType: 'person' }): {
						const person = client.getQueryData<FullPerson>(
							mediaTypeQueryKey({ mediaType: 'person', id: Number(id) })
						);
						label = person?.name;
						break;
					}
					case formatMediaType({ mediaType: 'collection' }): {
						const collection = client.getQueryData<Collection>(
							mediaTypeQueryKey({ mediaType: 'collection', id: Number(id) })
						);
						label = collection?.name;
						break;
					}
				}

				if (label) {
					setLabel(label);
					setTimeout(() => setIsLoaded.on(), 250);
				} else {
					setLabel('N/A');
				}
			} else {
				const type = splitLocation[0];
				setLabel(handleFormatBreadcrumb(type));
				setTimeout(() => setIsLoaded.on(), 250);
			}
		}, 250),
		[location, client]
	);

	useEffect(() => handleCheckCache(), [location]);

	return isLoaded ? (
		<Center>
			{isText || isCurrentPage ? (
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: `text.${isCurrentPage ? 'primary' : 'secondary'}` })}
					fontSize={breadcrumbFontSize}
					fontWeight='medium'
				>
					{label || breadcrumb}
				</Text>
			) : (
				<InternalLink
					to={{ pathname: match?.pathname }}
					color='gray'
					fontSize={breadcrumbFontSize}
					fontWeight='medium'
					sx={{
						color: getColor({ theme, colorMode, type: 'text.secondary' }),
						textDecoration: 'none !important'
					}}
				>
					{label || breadcrumb}
				</InternalLink>
			)}
		</Center>
	) : (
		<DummyBreadcrumb />
	);
};

export default Breadcrumb;
