import { FC } from 'react';

import numbro from 'numbro';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../common/utils';
import { CompanyVerticalPoster } from '../../../../../../../../../components';
import dimensions from '../../../../../../../../../components/Posters/common/data/dimensions';
import { getMediaTypeIndex } from '../../../../common/utils';
import { useSearchContext } from '../../../../../../common/hooks';

import { AllTabCompaniesProps } from './types';

const AllTabCompanies: FC<AllTabCompaniesProps> = ({ mediaTypes, companies }) => {
	const { query, onSetActiveTab } = useSearchContext();

	const { total_results: total = 0, results = [] } = companies || {};

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' })}
			subtitle={`Found a total of ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'company'
			})} with query "${query}"`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'company'
			})}`}
			isDisabled={total === 0}
			onFooterClick={
				total > 0 && onSetActiveTab
					? () => onSetActiveTab({ index: getMediaTypeIndex({ mediaTypes, mediaType: 'company' }) })
					: undefined
			}
		>
			{results.map((company) => (
				<CompanyVerticalPoster key={company.id} company={company} sx={dimensions} />
			))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabCompanies;
