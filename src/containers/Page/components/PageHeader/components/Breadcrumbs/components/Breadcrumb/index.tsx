import { FC, useState, useEffect } from 'react';

import { useTheme, InternalLink, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, useBoolean, Center, Text } from '@chakra-ui/react';

import { useQueryClient } from '@tanstack/react-query';

import { compact, lowerCase } from 'lodash';

import { useUserTheme } from '../../../../../../../../common/hooks';
import DummyBreadcrumb from '../DummyBreadcrumb';
import { formatMediaTypeLabel } from '../../../../../../../../common/utils';
import { mediaTypeQueryKey } from '../../../../../../../../common/queries/useMediaTypeQuery';
import { FullPerson } from '../../../../../../../../common/types/person';
import { Collection, FullMovie } from '../../../../../../../../common/types/movie';
import { FullTV } from '../../../../../../../../common/types/tv';

import { BreadcrumbProps, BreadcrumbLabel } from './types';

const { getColor } = utils;

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb, location, match, isCurrentPage = false }) => {
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

	const [isLoaded, setIsLoaded] = useBoolean();
	const [label, setLabel] = useState<BreadcrumbLabel>();

	const client = useQueryClient();

	const handleCheckCache = (): void => {
		const splitLocation = compact(location.pathname.split('/'));

		if (splitLocation.length > 1) {
			const type = splitLocation[0];
			const id = splitLocation[1];

			let label: BreadcrumbLabel;

			switch (type) {
				case lowerCase(formatMediaTypeLabel({ type: 'multiple', mediaType: 'movie' })): {
					const movie = client.getQueryData<FullMovie>(
						mediaTypeQueryKey({ mediaType: 'movie', id: Number(id) })
					);
					label = movie?.title;
					break;
				}
				case lowerCase(formatMediaTypeLabel({ type: 'multiple', mediaType: 'tv' })): {
					const show = client.getQueryData<FullTV>(mediaTypeQueryKey({ mediaType: 'tv', id: Number(id) }));
					label = show?.name;
					break;
				}
				case lowerCase(formatMediaTypeLabel({ type: 'multiple', mediaType: 'person' })): {
					const person = client.getQueryData<FullPerson>(
						mediaTypeQueryKey({ mediaType: 'person', id: Number(id) })
					);
					label = person?.name;
					break;
				}
				case lowerCase(formatMediaTypeLabel({ type: 'multiple', mediaType: 'collection' })): {
					const collection = client.getQueryData<Collection>(
						mediaTypeQueryKey({ mediaType: 'collection', id: Number(id) })
					);
					label = collection?.name;
					break;
				}
			}

			if (label) {
				setLabel(label);
				setIsLoaded.on();
			}
		} else {
			setIsLoaded.on();
		}
	};

	useEffect(() => handleCheckCache(), [location]);

	return isLoaded ? (
		<Center>
			{isCurrentPage ? (
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
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
					sx={{ color: getColor({ theme, colorMode, type: 'text.secondary' }) }}
				>
					{breadcrumb}
				</InternalLink>
			)}
		</Center>
	) : (
		<DummyBreadcrumb />
	);
};

export default Breadcrumb;
