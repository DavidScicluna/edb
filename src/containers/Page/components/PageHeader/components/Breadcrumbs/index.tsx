import { FC, useState } from 'react';

import { useTheme, Icon } from '@davidscicluna/component-library';

import { useColorMode, useBreakpointValue, Breadcrumb as CUIBreadcrumb } from '@chakra-ui/react';

import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { useDebounce, useTimeout } from 'usehooks-ts';
import { range } from 'lodash';

import Breadcrumb from './components/Breadcrumb';
// import { allRoutes as routes } from '../../../../../Routes';

const Breadcrumbs: FC = () => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const iconFontSize = useBreakpointValue({
		'base': theme.fontSizes.md,
		'sm': theme.fontSizes.md,
		'md': theme.fontSizes.lg,
		'lg': theme.fontSizes.lg,
		'xl': theme.fontSizes.lg,
		'2xl': theme.fontSizes.lg
	});

	const getBreadcrumbs = useBreadcrumbs();
	// routes.map((route) => omit(route, 'element'))

	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData<string>[]>([]);
	const debouncedBreadcrumbs = useDebounce<BreadcrumbData<string>[]>(breadcrumbs, 500);

	useTimeout(() => setBreadcrumbs(getBreadcrumbs), 2500);

	return (
		<CUIBreadcrumb
			width='100%'
			separator={
				<Icon
					icon='chevron_right'
					category='outlined'
					color={theme.colors.gray[colorMode === 'light' ? 400 : 500]}
					fontSize={iconFontSize}
				/>
			}
			spacing={1}
		>
			{debouncedBreadcrumbs && debouncedBreadcrumbs.length > 0
				? debouncedBreadcrumbs.map((breadcrumb, index) => (
						<Breadcrumb
							key={`ds-edb-breadcrumb-${index}`}
							breadcrumb={breadcrumb}
							isCurrentPage={index === debouncedBreadcrumbs.length - 1}
							isLoading={false}
						/>
				  ))
				: range(0, 3).map((_dummy, index) => <Breadcrumb key={`ds-edb-dummy-breadcrumb-${index}`} isLoading />)}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;
