import { FC } from 'react';

import { useColorMode, Center, Show, HStack, VStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useGetUserTheme } from '../../../../common/hooks';
import Divider from '../../../../components/Divider';

import { ErrorProps } from './types';
import Description from './components/Description';
import Code from './components/Code';

const Error: FC<ErrorProps> = (props) => {
	const { colorMode } = useColorMode();
	const { color } = useGetUserTheme();

	const [descriptionRef, { height }] = useElementSize();

	const { code = 404, title, subtitle, renderActions } = props;

	return (
		<Center width='100%' height='100%'>
			<VStack spacing={4} p={2}>
				<Show breakpoint='(max-width: 600px)'>
					<VStack alignItems='flex-start' divider={<Divider />} spacing={2}>
						<Code code={code} />
						<Description title={title} subtitle={subtitle} />
					</VStack>
				</Show>
				<Show breakpoint='(min-width: 600px)'>
					<HStack divider={<Divider orientation='vertical' height={`${height}px`} />} spacing={2}>
						<Code code={code} />
						<Center ref={descriptionRef} width='100%'>
							<Description title={title} subtitle={subtitle} />
						</Center>
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
