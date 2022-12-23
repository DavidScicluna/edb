import { FC } from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';

import ViewHeroLabel from '../ViewHeroLabel';

import { ViewHeroGenresProps } from './types';
import ViewHeroGenresGenre from './components/ViewHeroGenresGenre';

const ViewHeroGenres: FC<ViewHeroGenresProps> = ({ mediaType, genres = [], ...rest }) => {
	return (
		<ViewHeroLabel {...rest} maxWidth='100%' label='Genres'>
			<Wrap width='100%' spacing={1}>
				{genres.map(({ id, name }) => (
					<WrapItem key={id}>
						<ViewHeroGenresGenre mediaType={mediaType} id={id} name={name} />
					</WrapItem>
				))}
			</Wrap>
		</ViewHeroLabel>
	);
};

export default ViewHeroGenres;
