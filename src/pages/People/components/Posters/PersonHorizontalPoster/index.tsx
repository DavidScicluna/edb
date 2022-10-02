import { FC } from 'react';

import { compact } from 'lodash';
import { sort } from 'fast-sort';

import { getImageSize } from '../../../../../common/utils';
import { HorizontalPoster } from '../../../../../components';

import { PersonHorizontalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const PersonHorizontalPoster: FC<PersonHorizontalPosterProps> = (props) => {
	const { person, ...rest } = props;
	const { name, profile_path, known_for_department, known_for = [] } = person || {};

	return (
		<HorizontalPoster<'person'>
			{...rest}
			mediaItem={{ ...person }}
			mediaType='person'
			image={{
				alt: name ? `${name || ''} person poster` : 'Person poster',
				src: profile_path || '',
				size: { full, thumbnail }
			}}
			title={name || ''}
			subtitle={known_for_department || ''}
			description={compact(
				sort(known_for)
					.desc((mediaItem) => mediaItem.popularity)
					.map((mediaItem) => mediaItem.title || mediaItem.name || undefined)
			).join(' • ')}
		/>
	);
};

export default PersonHorizontalPoster;
