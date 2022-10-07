import { FC, useState } from 'react';

import { Breadcrumb as CUIBreadcrumb, BreadcrumbItem } from '@chakra-ui/react';

import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { useDebounce, useTimeout } from 'usehooks-ts';
import { range } from 'lodash';

import Breadcrumb from './components/Breadcrumb';
import Separator from './components/Separator';
import DummyBreadcrumb from './components/DummyBreadcrumb';

const Breadcrumbs: FC = () => {
	const getBreadcrumbs = useBreadcrumbs();
	// routes.map((route) => omit(route, 'element'))

	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData<string>[]>([]);
	const debouncedBreadcrumbs = useDebounce<BreadcrumbData<string>[]>(breadcrumbs, 500);

	useTimeout(() => setBreadcrumbs(getBreadcrumbs), 2500);

	return (
		<CUIBreadcrumb separator={<Separator />} spacing={2}>
			{debouncedBreadcrumbs && debouncedBreadcrumbs.length > 0
				? debouncedBreadcrumbs.map((breadcrumb, index) => (
						<BreadcrumbItem key={index} isCurrentPage={index === debouncedBreadcrumbs.length - 1}>
							<Breadcrumb
								breadcrumb={breadcrumb}
								isCurrentPage={index === debouncedBreadcrumbs.length - 1}
							/>
						</BreadcrumbItem>
				  ))
				: range(0, 3).map((_dummy, index) => (
						<BreadcrumbItem key={index} isCurrentPage>
							<DummyBreadcrumb />
						</BreadcrumbItem>
				  ))}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;
