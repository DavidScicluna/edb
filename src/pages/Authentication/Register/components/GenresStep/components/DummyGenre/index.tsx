import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { colorMode as defaultColorMode } from '../../../../../../../common/data/defaultPropValues';

import { DummyGenreProps } from './types';

const DummyGenre: FC<DummyGenreProps> = ({ colorMode = defaultColorMode }) => {
	return (
		<DummyButton color='gray' colorMode={colorMode} variant='outlined'>
			Genre Name
		</DummyButton>
	);
};

export default DummyGenre;
