import { FC } from 'react';

import { Divider, DummyIconButton, IconButtonIcon } from '@davidscicluna/component-library';

import { HStack } from '@chakra-ui/react';

import { range } from 'lodash';

import { useUserTheme } from '../../../../common/hooks';

const ViewDummySocials: FC = () => {
	const { colorMode } = useUserTheme();

	return (
		<HStack alignItems='stretch' justifyContent='stretch' spacing={1} ml={1}>
			{/* TODO: Go over all Divider and confirm we are passing down colorMode */}
			<Divider colorMode={colorMode} orientation='vertical' my={0.5} />

			<HStack spacing={0}>
				{range(3).map((_dummy, index) => (
					<DummyIconButton key={index} colorMode={colorMode} variant='icon'>
						<IconButtonIcon icon='circle' category='outlined' />
					</DummyIconButton>
				))}
			</HStack>
		</HStack>
	);
};

export default ViewDummySocials;
