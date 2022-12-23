import { FC } from 'react';

import ViewHeroLabel from '../ViewHeroLabel';
import ViewHeroText from '../ViewHeroText';

import { ViewHeroPlotProps } from './types';

const ViewHeroPlot: FC<ViewHeroPlotProps> = ({ plot, ...rest }) => {
	return (
		<ViewHeroLabel {...rest} label='Plot'>
			<ViewHeroText whiteSpace='normal'>{plot}</ViewHeroText>
		</ViewHeroLabel>
	);
};

export default ViewHeroPlot;
