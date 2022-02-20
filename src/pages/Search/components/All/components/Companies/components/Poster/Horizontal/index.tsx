import { ReactElement } from 'react';

import { HorizontalCompanyPosterProps } from './types';

import { useSelector } from '../../../../../../../../../common/hooks';
import HorizontalPoster from '../../../../../../../../../components/Poster/Horizontal';

const HorizontalCompanyPoster = (props: HorizontalCompanyPosterProps): ReactElement => {
	const { company, isLoading = true } = props;
	const { name, logo_path, origin_country } = company || {};

	const countries = useSelector((state) => state.options.data.countries);

	return (
		<HorizontalPoster
			mediaItem={company ? { ...company } : undefined}
			mediaType='company'
			image={{
				alt: `${name || ''} company poster`,
				src: logo_path || '',
				size: {
					thumbnail: 'w45',
					full: 'original'
				}
			}}
			title={name || ''}
			subtitle={countries.find((country) => country.iso_3166_1 === origin_country)?.english_name || ''}
			isLoading={isLoading}
		/>
	);
};

export default HorizontalCompanyPoster;
