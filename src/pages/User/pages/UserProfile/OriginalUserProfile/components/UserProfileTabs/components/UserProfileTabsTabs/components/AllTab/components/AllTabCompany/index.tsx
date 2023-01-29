import { FC } from 'react';

import numbro from 'numbro';
import { sort } from 'fast-sort';

import AllTabHorizontalGrid from '../AllTabHorizontalGrid';
import { formatMediaTypeLabel } from '../../../../../../../../../../../../../common/utils';
import { CompanyVerticalPoster } from '../../../../../../../../../../../../../components';
import dimensions from '../../../../../../../../../../../../../components/Posters/common/data/dimensions';

import { AllTabCompanyProps } from './types';

const limit = 20;

const AllTabCompany: FC<AllTabCompanyProps> = ({ type, companies, onSetActiveTab }) => {
	const total = companies.length;

	return (
		<AllTabHorizontalGrid
			title={formatMediaTypeLabel({ type: 'multiple', mediaType: 'company' })}
			subtitle={`${type === 'liked' ? 'Liked' : 'Bookmarked'} a total of ${numbro(total).format({
				average: true
			})} ${formatMediaTypeLabel({ type: total === 1 ? 'single' : 'multiple', mediaType: 'company' })}`}
			footerLabel={`View all ${numbro(total).format({ average: true })} ${formatMediaTypeLabel({
				type: total === 1 ? 'single' : 'multiple',
				mediaType: 'company'
			})}`}
			isDisabled={total === 0}
			onFooterClick={onSetActiveTab ? () => onSetActiveTab({ mediaType: 'company' }) : undefined}
		>
			{sort(companies)
				.desc(({ addedAt }) => addedAt)
				.filter((_company, index) => index <= limit)
				.map(({ mediaItem }) => (
					<CompanyVerticalPoster key={mediaItem.id} company={mediaItem} sx={dimensions} />
				))}
		</AllTabHorizontalGrid>
	);
};

export default AllTabCompany;
