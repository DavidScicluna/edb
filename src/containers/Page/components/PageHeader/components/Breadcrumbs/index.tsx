import { FC, useState } from 'react';

import { useDebounce } from '@davidscicluna/component-library';

import { Breadcrumb as CUIBreadcrumb, BreadcrumbItem } from '@chakra-ui/react';

import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs';
import { useTimeout } from 'usehooks-ts';
import { range } from 'lodash';

import Breadcrumb from './components/Breadcrumb';
import Separator from './components/Separator';
import DummyBreadcrumb from './components/DummyBreadcrumb';

const Breadcrumbs: FC = () => {
	const getBreadcrumbs = useBreadcrumbs();

	const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData<string>[]>([]);
	const debouncedBreadcrumbs = useDebounce<BreadcrumbData<string>[]>(breadcrumbs, 'slow');

	useTimeout(() => setBreadcrumbs(getBreadcrumbs), 2500);

	return (
		<CUIBreadcrumb separator={<Separator />} spacing={1}>
			{debouncedBreadcrumbs && debouncedBreadcrumbs.length > 0
				? debouncedBreadcrumbs.map((breadcrumb, index) => (
						<BreadcrumbItem key={index} isCurrentPage={index === debouncedBreadcrumbs.length - 1}>
							<Breadcrumb {...breadcrumb} isCurrentPage={index === debouncedBreadcrumbs.length - 1} />
						</BreadcrumbItem>
				  ))
				: range(3).map((_dummy, index) => (
						<BreadcrumbItem key={index} isCurrentPage>
							<DummyBreadcrumb />
						</BreadcrumbItem>
				  ))}
		</CUIBreadcrumb>
	);
};

export default Breadcrumbs;
