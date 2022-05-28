import { ReactElement } from 'react';

import { useSelector } from '../../../../../../../../../common/hooks';
import { handleReturnImageSize } from '../../../../../../../../../common/utils';
import VerticalPoster from '../../../../../../../../../components/Poster/Vertical';

import { VerticalCompanyPosterProps } from './types';

const thumbnail = handleReturnImageSize('logo', 'thumbnail');
const full = handleReturnImageSize('logo', 'full');

const VerticalCompanyPoster = (props: VerticalCompanyPosterProps): ReactElement => {
	const { company, width, isLoading = true } = props;
	const { name, logo_path, origin_country } = company || {};

	const countries = useSelector((state) => state.options.data.countries);

	return (
		<VerticalPoster
			width={width || '100%'}
			mediaItem={company ? { ...company } : undefined}
			mediaType='company'
			image={{
				alt: `${name || ''} company poster`,
				src: logo_path || '',
				size: { full, thumbnail }
			}}
			title={name || ''}
			subtitle={countries.find((country) => country.iso_3166_1 === origin_country)?.english_name || ''}
			isLoading={isLoading}
		/>
	);
};

export default VerticalCompanyPoster;
