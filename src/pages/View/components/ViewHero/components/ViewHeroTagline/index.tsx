import { FC } from 'react';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroText from '../ViewHeroText';

import { ViewHeroTaglineProps } from './types';

const ViewHeroTagline: FC<ViewHeroTaglineProps> = ({ tagline, ...rest }) => {
	return (
		<ViewHeroLabel {...rest} label='Tagline'>
			<ViewHeroText fontStyle='italic' whiteSpace='normal'>
				{tagline}
			</ViewHeroText>
		</ViewHeroLabel>
	);
};

export default ViewHeroTagline;
