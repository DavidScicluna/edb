import { FC } from 'react';

import QuickViewModalCollection from '../QuickViewModalCollection';
import QuickViewModalEmpty from '../QuickViewModalEmpty';
import QuickViewModalMovie from '../QuickViewModalMovie';
import QuickViewModalPerson from '../QuickViewModalPerson';
import QuickViewModalTVShow from '../QuickViewModalTVShow';

import { QuickViewModalBodyProps } from './types';

const QuickViewModalBody: FC<QuickViewModalBodyProps> = ({ mediaType, mediaItem }) => {
	const { id } = mediaItem || {};

	if (id) {
		switch (mediaType) {
			case 'collection':
				return <QuickViewModalCollection id={id} />;
			case 'movie':
				return <QuickViewModalMovie id={id} />;
			case 'person':
				return <QuickViewModalPerson id={id} />;
			case 'tv':
				return <QuickViewModalTVShow id={id} />;
			default:
				return <QuickViewModalEmpty label='Media-Item' />;
		}
	} else {
		return <QuickViewModalEmpty label='Media-Item' />;
	}
};

export default QuickViewModalBody;
