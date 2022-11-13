import { FC } from 'react';

import { DummyButton } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';

const DummyUserGenresActions: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<HStack spacing={1}>
			<DummyButton color={color} colorMode={colorMode} size='xs' variant='text'>
				Clear
			</DummyButton>
			<DummyButton color={color} colorMode={colorMode} size='xs' variant='text'>
				Select All
			</DummyButton>
		</HStack>
	);
};

export default DummyUserGenresActions;
