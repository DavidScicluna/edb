import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../common/hooks';

const DummyUserGenre: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyButton colorMode={colorMode} variant='outlined'>
			Genre Name
		</DummyButton>
	);
};

export default DummyUserGenre;
