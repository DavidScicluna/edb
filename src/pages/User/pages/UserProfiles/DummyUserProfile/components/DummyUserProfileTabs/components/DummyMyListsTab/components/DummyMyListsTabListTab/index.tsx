import { FC } from 'react';

import { useTheme, Divider } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../containers/Layout/common/hooks';
import DummyTabs from '../../../DummyUserProfileTabsTabs';
import { MediaType } from '../../../../../../../../../../../common/types';

import DummyMyListsTabListTabHeadline from './components/DummyMyListsTabListTabHeadline';

const mediaTypes: MediaType[] = ['movie', 'tv'];

const DummyMyListsTabListTab: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={0}
		>
			<Center width='100%' py={spacing * 2}>
				<DummyMyListsTabListTabHeadline />
			</Center>

			<DummyTabs mediaTypes={mediaTypes} />
		</VStack>
	);
};

export default DummyMyListsTabListTab;
