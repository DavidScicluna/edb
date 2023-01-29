import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import VerticalPoster from '../VerticalPoster';
import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';

import { CompanyVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'logo', mode: 'thumbnail' });
const full = getImageSize({ type: 'logo', mode: 'full' });

const CompanyVerticalPoster: FC<CompanyVerticalPosterProps> = (props) => {
	const { company, subtitle, ...rest } = props;
	const { name, logo_path, origin_country: country } = company;

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'company' })} logo`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'company' })} logo`
	);

	const defaultSubtitle = country ? country : undefined;

	return (
		<VerticalPoster<'company'>
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
		/>
	);
};

export default memo(CompanyVerticalPoster);
