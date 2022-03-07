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

import _ from 'lodash';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useTimeout } from 'usehooks-ts';

import useStyles from './styles';

import Link from '../../../../../../components/Clickable/Link';
import Icon from '../../../../../../components/Icon';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { FontSizes, Theme } from '../../../../../../theme/types';
import { allRoutes as routes } from '../../../../../Layout/components/Routes';

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

	const breadcrumbsHook = useBreadcrumbs(routes.map((route) => _.omit(route, 'element')));

	const [breadcrumbs, setBreadcrumbs] = useState(breadcrumbsHook);

	const style = useStyles(theme);

	useTimeout(() => setBreadcrumbs(breadcrumbsHook), 2500);

	return (
		<CUIBreadcrumb
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
			{breadcrumbs.map((breadcrumb, index) => (
				<BreadcrumbItem
					key={breadcrumb.key}
					isCurrentPage={index === breadcrumbs.length - 1}
					fontSize={breadcrumbFontSize}
					sx={{ ...style.common.breadcrumbItem }}
				>
					<SkeletonText
						fontSize={breadcrumbFontSize}
						isLoaded={!(_.isNil(breadcrumb) || _.isEmpty(breadcrumb))}
					>
						{index === breadcrumbs.length - 1 ? (
							<Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
								{breadcrumb.breadcrumb}
							</Text>
						) : (
							<BreadcrumbLink
								as={Link}
								to={{ pathname: breadcrumb.match.pathname }}
								sx={{ ..._.merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}
							>
								{breadcrumb.breadcrumb}
							</BreadcrumbLink>
						)}
					</SkeletonText>
				</BreadcrumbItem>
			))}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;
