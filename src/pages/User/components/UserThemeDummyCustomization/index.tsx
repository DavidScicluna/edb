import { FC } from 'react';

import { VStack } from '@chakra-ui/react';

import DummyColor from './components/DummyColor';
import DummyColorMode from './components/DummyColorMode';

const UserThemeDummyCustomization: FC = () => {
	return (
		<VStack width='100%' spacing={4}>
			<DummyColorMode />

			<DummyColor />
		</VStack>
	);
};

export default UserThemeDummyCustomization;
