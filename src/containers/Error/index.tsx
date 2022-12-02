import { FC } from 'react';

import { useTheme, Divider } from '@davidscicluna/component-library';

import { Center, Show, HStack, VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../common/hooks';
import { useLayoutContext } from '../Layout/common/hooks';

import { ErrorProps } from './types';
import Description from './components/ErrorDescription';
import Code from './components/ErrorCode';

const Error: FC<ErrorProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { code = 404, title, subtitle, renderActions } = props;

	return (
		<Center width='100%' height='100%' minHeight='inherit'>
			<VStack spacing={spacing} p={2}>
				<Show breakpoint={`(max-width: ${theme.breakpoints.sm})`}>
					<VStack alignItems='flex-start' divider={<Divider />} spacing={2}>
						<Code code={code} />
						<Description title={title} subtitle={subtitle} />
					</VStack>
				</Show>
				<Show breakpoint={`(min-width: ${theme.breakpoints.sm})`}>
					<HStack
						alignItems='stretch'
						justifyContent='stretch'
						divider={<Divider colorMode={colorMode} orientation='vertical' />}
						spacing={2}
					>
						<Code code={code} />
						<Description title={title} subtitle={subtitle} />
					</HStack>
				</Show>

				{renderActions && (
					<HStack width='100%' alignItems='flex-start' spacing={2}>
						{renderActions({ color, colorMode, size: 'md', variant: 'contained' })}
					</HStack>
				)}
			</VStack>
		</Center>
	);
};

export default Error;
