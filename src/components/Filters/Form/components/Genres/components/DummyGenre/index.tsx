import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';

const DummyGenre: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyButton color='gray' colorMode={colorMode} variant='outlined'>
			Genre Name
		</DummyButton>
	);
};

export default DummyGenre;
