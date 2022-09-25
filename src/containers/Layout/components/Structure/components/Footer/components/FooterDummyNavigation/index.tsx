import { FC, useContext } from 'react';

import { useTheme, Skeleton } from '@davidscicluna/component-library';

import { useMediaQuery, Stack, Text } from '@chakra-ui/react';

import { range } from 'lodash';

import navItems from '../../common/data/navItems';
import { useUserTheme } from '../../../../../../../../common/hooks';
import { LayoutContext } from '../../../../../..';
import { LayoutContext as LayoutContextType } from '../../../../../../types';
import { spacing as defaultSpacing } from '../../../../../../common/data/defaultPropValues';

const FooterDummyNavigation: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing = defaultSpacing } = useContext<LayoutContextType>(LayoutContext);

	return (
		<Stack
			width='100%'
			direction={isSm ? 'column' : 'row'}
			alignItems='center'
			justifyContent='space-around'
			spacing={spacing}
		>
			{range(navItems.length - 1).map((_dummy, index) => (
				<Skeleton key={index} colorMode={colorMode} width='100%' isLoaded={false} variant='text'>
					<Text align='left' fontSize='md' fontWeight='semibold' textTransform='uppercase'>
						This is dummy text
					</Text>
				</Skeleton>
			))}
		</Stack>
	);
};

export default FooterDummyNavigation;
