import { ReactElement, useState } from 'react';

import {
	useTheme,
	useColorMode,
	useBreakpointValue,
	Breadcrumb as CUIBreadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Text
} from '@chakra-ui/react';

import merge from 'lodash/merge';
import omit from 'lodash/omit';
import range from 'lodash/range';
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { useEffectOnce } from 'usehooks-ts';


import Link from '../../../../../../components/Clickable/Link';
import Icon from '../../../../../../components/Icon';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { FontSizes, Theme } from '../../../../../../theme/types';
import { allRoutes as routes } from '../../../../../Routes';

import useStyles from './styles';

const Breadcrumbs = (): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const iconFontSize = useBreakpointValue({
		'base': theme.fontSizes.md,
		'sm': theme.fontSizes.md,
		'md': theme.fontSizes.lg,
		'lg': theme.fontSizes.lg,
		'xl': theme.fontSizes.lg,
		'2xl': theme.fontSizes.lg
	});

	const breadcrumbFontSize = useBreakpointValue<keyof FontSizes>({
		'base': 'sm',
		'sm': 'sm',
		'md': 'md',
		'lg': 'md',
		'xl': 'md',
		'2xl': 'md'
	});

	const getBreadcrumbs = useBreadcrumbs(routes.map((route) => omit(route, 'element')));

	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData<string>[]>([]);

	const style = useStyles(theme);

	useEffectOnce(() => {
		setTimeout(() => setBreadcrumbs(getBreadcrumbs), 2500);
	});

	return (
		<CUIBreadcrumb
			width='100%'
			separator={
				<Icon
					icon='chevron_right'
					type='outlined'
					color={theme.colors.gray[colorMode === 'light' ? 400 : 500]}
					fontSize={iconFontSize}
				/>
			}
			spacing={1}
		>
			{[...(breadcrumbs.length > 0 ? breadcrumbs : range(0, 2))].map((breadcrumb, index) => {
				const isDummy = typeof breadcrumb === 'number';

				return (
					<BreadcrumbItem
						key={!isDummy ? breadcrumb.key : index}
						isCurrentPage={!isDummy ? index === breadcrumbs.length - 1 : false}
						fontSize={breadcrumbFontSize}
						sx={{ ...style.common.breadcrumbItem }}
					>
						<SkeletonText fontSize={breadcrumbFontSize} isLoaded={!isDummy}>
							{index === breadcrumbs.length - 1 || isDummy ? (
								<Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
									{!isDummy ? breadcrumb.breadcrumb : 'Dummy'}
								</Text>
							) : (
								<BreadcrumbLink
									as={Link}
									to={{ pathname: breadcrumb.match.pathname }}
									sx={{ ...merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}
								>
									{breadcrumb.breadcrumb}
								</BreadcrumbLink>
							)}
						</SkeletonText>
					</BreadcrumbItem>
				);
			})}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;
