import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { colorMode as defaultColorMode } from '../../../../../common/data/defaultPropValues';

import { DummyUserGenreProps } from './types';

// TODO: Create DummyUserGenres & move component there

const DummyUserGenre: FC<DummyUserGenreProps> = ({ colorMode = defaultColorMode }) => {
	return (
		<DummyButton color='gray' colorMode={colorMode} variant='outlined'>
			Genre Name
		</DummyButton>
	);
};

export default DummyUserGenre;
