import { FC, memo } from 'react';

import { useConst } from '@chakra-ui/react';

import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';
import VerticalPoster from '../VerticalPoster';

import { PersonVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'profile', mode: 'thumbnail' });
const full = getImageSize({ type: 'profile', mode: 'full' });

const PersonVerticalPoster: FC<PersonVerticalPosterProps> = (props) => {
	const { person, subtitle, ...rest } = props;
	const { name, profile_path, known_for_department } = person || {};

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} avatar`
	);

	const defaultSubtitle = known_for_department;

	return (
		<VerticalPoster<'person'>
			{...rest}
			mediaItem={{ ...person }}
			mediaType='person'
			image={{
				alt,
				src: profile_path || '',
				size: { full, thumbnail }
			}}
			title={name || ''}
			subtitle={subtitle || defaultSubtitle || ''}
		/>
	);
};

export default memo(PersonVerticalPoster);
