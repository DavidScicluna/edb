import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';
import HorizontalPoster from '../HorizontalPoster';

import { CompanyHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'logo', mode: 'thumbnail' });
const full = getImageSize({ type: 'logo', mode: 'full' });

const CompanyHorizontalPoster: FC<CompanyHorizontalPosterProps> = (props) => {
	const { company, subtitle, description, ...rest } = props;
	const { name, logo_path, origin_country: country } = company;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'company' })} logo`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'company' })} logo`
	);

	const defaultSubtitle = country ? country : undefined;

	return (
		<HorizontalPoster<'company'>
			{...rest}
			mediaItem={{ ...company }}
			mediaType='company'
			image={{
				alt,
				src: logo_path || '',
				size: { full, thumbnail }
			}}
			title={name || ''}
			subtitle={subtitle || defaultSubtitle || ''}
			description={description || ''}
		/>
	);
};

export default memo(CompanyHorizontalPoster);
