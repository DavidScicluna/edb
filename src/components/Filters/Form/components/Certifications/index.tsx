import { FC } from 'react';

import MovieCertifications from './components/MovieCertifications';
import TVShowCertifications from './components/TVShowCertifications';
import { CertificationsProps } from './types';

const Certifications: FC<CertificationsProps> = ({ form, mediaType }) => {
	switch (mediaType) {
		case 'movie':
			return <MovieCertifications form={form} />;
		case 'tv':
			return <TVShowCertifications form={form} />;
	}
};

export default Certifications;
