import { FC } from 'react';

import { useConst } from '@chakra-ui/react';

import { compact } from 'lodash';
import { sort } from 'fast-sort';

import { formatMediaTypeLabel, getImageSize } from '../../../common/utils';
import HorizontalPoster from '../HorizontalPoster';

import { PersonHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const PersonHorizontalPoster: FC<PersonHorizontalPosterProps> = (props) => {
	const { person, subtitle, description, ...rest } = props;
	const { name, profile_path, known_for_department, known_for = [] } = person || {};

	const alt = useConst<string>(
		name
			? `${name} ${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} poster`
			: `${formatMediaTypeLabel({ type: 'single', mediaType: 'person' })} poster`
	);

	const defaultSubtitle = known_for_department;
	const defaultDescription = known_for
		? compact(
				sort(known_for)
					.desc(({ popularity }) => popularity)
					.map(({ title, name }) => title || name || undefined)
		  ).join(' • ')
		: undefined;

	return (
		<HorizontalPoster<'person'>
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
			description={description || defaultDescription || ''}
		/>
	);
};

export default PersonHorizontalPoster;
