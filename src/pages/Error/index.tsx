import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Center, HStack, VStack } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import Code from './components/Code';
import Description from './components/Description';
import { ErrorProps } from './types';

import { useSelector } from '../../common/hooks';
import Divider from '../../components/Divider';
import { headerHeight } from '../../containers/Layout/common/data/dimensions';

const Error = (props: ErrorProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const color = useSelector((state) => state.user.ui.theme.color);

	const [descriptionRef, { height }] = useElementSize();

	const { code = 404, title, subtitle, renderActions } = props;

	return (
		<Center width='100%' minHeight={`calc(100vh - ${headerHeight + 32}px)`}>
			<VStack spacing={4} p={isSm ? 2 : 4}>
				{isSm ? (
					<VStack alignItems='flex-start' spacing={1}>
						<Code code={code} />
						<Divider />
						<Description title={title} subtitle={subtitle} />
					</VStack>
				) : (
					<HStack spacing={2}>
						<Code code={code} />
						<Divider orientation='vertical' height={`${height}px`} />
						<Description ref={descriptionRef} title={title} subtitle={subtitle} />
					</HStack>
				)}

				{renderActions ? (
					<HStack alignItems='flex-start' spacing={2}>
						{renderActions({ color, colorMode, size: 'md' })}
					</HStack>
				) : null}
			</VStack>
		</Center>
	);
};

export default Error;