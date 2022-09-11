import React, { FC } from 'react';

import { useTheme, Skeleton, InternalLink, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

import { BreadcrumbProps } from './types';

const { getColor } = utils;

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb: breadcrumbProp, isLoading = false, isCurrentPage = false }) => {
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

	const { breadcrumb, match } = breadcrumbProp || {};

	return (
		<BreadcrumbItem
			flex={1}
			fontSize={breadcrumbFontSize}
			fontWeight='medium'
			isCurrentPage={!isLoading && isCurrentPage}
		>
			<Skeleton colorMode={colorMode} isLoaded={!isLoading} variant='text'>
				{isLoading || isCurrentPage ? (
					<Text
						align='left'
						color={getColor({ theme, colorMode, type: 'text.primary' })}
						fontSize={breadcrumbFontSize}
						fontWeight='medium'
					>
						{!isLoading ? breadcrumb : 'Dummy Breadcrumb'}
					</Text>
				) : (
					<BreadcrumbLink
						as={InternalLink}
						to={{ pathname: match?.pathname }}
						color={getColor({ theme, colorMode, type: 'text.secondary' })}
						fontSize={breadcrumbFontSize}
						fontWeight='medium'
					>
						{breadcrumb}
					</BreadcrumbLink>
				)}
			</Skeleton>
		</BreadcrumbItem>
	);
};

export default Breadcrumb;
