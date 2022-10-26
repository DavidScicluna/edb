import { FC } from 'react';

import { getImageSize } from '../../../common/utils';
import VerticalPoster from '../VerticalPoster';

import { PersonVerticalPosterProps } from './types';

const thumbnail = getImageSize({ type: 'poster', mode: 'thumbnail' });
const full = getImageSize({ type: 'poster', mode: 'full' });

const PersonVerticalPoster: FC<PersonVerticalPosterProps> = (props) => {
	const { person, ...rest } = props;
	const { name, profile_path, known_for_department } = person || {};

	return (
		<VerticalPoster<'person'>
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
		/>
	);
};

export default PersonVerticalPoster;
