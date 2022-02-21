import { ReactElement, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
	useTheme,
	useColorMode,
	useBreakpointValue,
	Breadcrumb as CUIBreadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Text,
	Icon
} from '@chakra-ui/react';

import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';

import useStyles from './styles';

import Link from '../../../../../../components/Clickable/Link';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { FontSizes, Theme } from '../../../../../../theme/types';
import { routes } from '../../../../../Layout/components/Routes';
import { Route } from '../../../../../Layout/components/Routes/types';

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

	const location = useLocation();

	const style = useStyles(theme);

	const [breadcrumbs, setBreadcrumbs] = useState<Omit<Route, 'children'>[]>([]);

	const handleGenerateBreadcrumbs = useCallback(
		_.debounce(() => {
			setBreadcrumbs([
				// ...breadcrumbs.filter((breadcrumb) => breadcrumb.path !== '/'),
				...routes
					.filter(({ path }) => location.pathname.includes(String(path)))
					.map(({ path, name }) => ({ path, name }))
			]);
		}, 250),
		[]
	);

	// console.log(breadcrumbs);

	useEffect(() => handleGenerateBreadcrumbs(), [location]);

	return (
		<CUIBreadcrumb
			separator={
				<Icon
					as={ChevronRightOutlinedIcon}
					color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
					sx={{ fontSize: `${iconFontSize} !important` }}
				/>
			}
			spacing={1}
		>
			{breadcrumbs.map((breadcrumb, index) => (
				<BreadcrumbItem
					key={index}
					isCurrentPage={index === breadcrumbs.length - 1}
					fontSize={breadcrumbFontSize}
					sx={{ ...style.common.breadcrumbItem }}
				>
					<SkeletonText fontSize={breadcrumbFontSize} isLoaded={!_.isNil(breadcrumb)}>
						{index === breadcrumbs.length - 1 ? (
							<Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
								{breadcrumb.name || ''}
							</Text>
						) : (
							<BreadcrumbLink
								as={Link}
								// to={{ ...breadcrumb.to }}
								to={{ ...breadcrumb.location }}
								sx={{ ..._.merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}
							>
								{breadcrumb.name || ''}
							</BreadcrumbLink>
						)}
					</SkeletonText>
				</BreadcrumbItem>
			))}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;