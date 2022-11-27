import { FC } from 'react';

import { useTheme, Divider } from '@davidscicluna/component-library';

import { VStack, Center } from '@chakra-ui/react';

import { useUserTheme } from '../../../common/hooks';
import { useLayoutContext } from '../../../containers/Layout/common/hooks';

import { status as defaultStatus } from './common/data/defaultPropValues';
import { TabItemStructureProps } from './types';

const TabItemStructure: FC<TabItemStructureProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { status = defaultStatus, headline, dummy, empty, multiple, single } = props;

	return (
		<VStack
			width='100%'
			divider={<Divider colorMode={colorMode} mt={`${theme.space[spacing]} !important`} />}
			spacing={status !== 'loading' && status !== 'multiple' ? spacing : 0}
		>
			<Center width='100%' py={spacing * 2}>
				{headline}
			</Center>

			{status === 'loading' ? (
				dummy
			) : status === 'empty' ? (
				empty
			) : status === 'single' || status === 'multiple' ? (
				<Center width='100%'>{status === 'multiple' ? multiple : single}</Center>
			) : null}
		</VStack>
	);
};

export default TabItemStructure;
