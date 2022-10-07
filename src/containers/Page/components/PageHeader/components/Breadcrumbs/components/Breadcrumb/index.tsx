import { FC } from 'react';

import { useTheme, InternalLink, utils } from '@davidscicluna/component-library';

import { useBreakpointValue, Center, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

import { BreadcrumbProps } from './types';

const { getColor } = utils;

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumb: breadcrumbProp, isCurrentPage = false }) => {
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
		<Center>
			{isCurrentPage ? (
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize={breadcrumbFontSize}
					fontWeight='medium'
				>
					{breadcrumb}
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
	);
};

export default Breadcrumb;
