import { FC } from 'react';

import { Divider } from '@davidscicluna/component-library';

import { VStack, Box } from '@chakra-ui/react';

import { useLayoutContext } from '../Layout/common/hooks';
import { useUserTheme } from '../../common/hooks';

import { PageProps } from './types';

const Page: FC<PageProps> = ({ children, ...rest }) => {
	const { colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	return (
		<VStack
			{...rest}
			width='100%'
			divider={
				<Box width='100%' border='none' px={spacing}>
					<Divider colorMode={colorMode} />
				</Box>
			}
			spacing={0}
		>
			{children}
		</VStack>
	);
};

export default Page;
