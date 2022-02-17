import { ReactElement } from 'react';

import { VerticalPersonPosterProps } from './types';

import VerticalPoster from '../../../../../components/Poster/Vertical';

const VerticalPersonPoster = (props: VerticalPersonPosterProps): ReactElement => {
	const { person, width, isLoading = true } = props;
	const { name, profile_path, known_for_department } = person || {};

	return (
		<VerticalPoster
			width={width || '100%'}
			mediaItem={person ? { ...person } : undefined}
			mediaType='person'
			image={{
				alt: `${name || ''} person poster`,
				src: profile_path || '',
				size: {
					thumbnail: 'w45',
					full: 'original'
				}
			}}
			title={name || ''}
			subtitle={known_for_department || ''}
			isLoading={isLoading}
		/>
	);
};

export default VerticalPersonPoster;
