import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { useUserTheme } from '../../../../../../../common/hooks';

const DummyCertification: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<DummyButton color='gray' colorMode={colorMode} variant='outlined'>
			Certification Name
		</DummyButton>
	);
};

export default DummyCertification;
