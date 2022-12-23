import { FC } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';

import { range } from 'lodash';

import ViewHeroLabel from '../ViewHeroLabel';

import { ViewHeroDummyGenresProps } from './types';
import ViewHeroDummyGenresGenre from './components/ViewHeroDummyGenresGenre';

const ViewHeroDummyGenres: FC<ViewHeroDummyGenresProps> = (props) => {
	return (
		<ViewHeroLabel {...props} maxWidth='100%' label='Genres'>
			<Wrap width='100%' spacing={1}>
				{range(3).map((_dummy, index) => (
					<WrapItem key={index}>
						<ViewHeroDummyGenresGenre />
					</WrapItem>
				))}
			</Wrap>
		</ViewHeroLabel>
	);
};

export default ViewHeroDummyGenres;
