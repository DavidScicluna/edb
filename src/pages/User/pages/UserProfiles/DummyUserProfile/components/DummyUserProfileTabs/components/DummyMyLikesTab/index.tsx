import { FC } from 'react';

import { useTheme, Divider } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import DummyTabs from '../DummyUserProfileTabsTabs';
import { useUserTheme } from '../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../containers/Layout/common/hooks';

import DummyMyLikesTabHeadline from './components/DummyMyLikesTabHeadline';

const DummyMyLikesTab: FC = () => {
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
				<DummyMyLikesTabHeadline />
			</Center>

			<DummyTabs mediaTypes={['movie', 'tv', 'person', 'company', 'collection']} />
		</VStack>
	);
};

export default DummyMyLikesTab;
