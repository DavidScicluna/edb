import { FC } from 'react';

import { useTheme, Skeleton, DummyButton, ScaleFade, utils } from '@davidscicluna/component-library';

import { VStack, Text, Progress } from '@chakra-ui/react';

import { useUserTheme } from '../../../common/hooks';

import { DummyLoadMoreProps } from './types';

const { getColor } = utils;

const DummyLoadMore: FC<DummyLoadMoreProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { isButtonVisible = true, variant = 'outlined', spacing = 2, ...rest } = props;

	return (
		<VStack width='100%' spacing={spacing}>
			<VStack width='100%' spacing={0.5}>
				<Skeleton isLoaded={false} variant='text'>
					<Text align='center' fontSize='sm'>
						{`You've viewed ## of ## Label`}
					</Text>
				</Skeleton>
				<Progress
					width='100%'
					height={theme.space[1]}
					borderRadius='full'
					background={getColor({ theme, colorMode, type: 'divider' })}
				/>
			</VStack>

			<ScaleFade in={isButtonVisible} style={{ width: '100%' }}>
				<DummyButton {...rest} color={color} colorMode={colorMode} isFullWidth variant={variant}>
					Load more
				</DummyButton>
			</ScaleFade>
		</VStack>
	);
};

export default DummyLoadMore;
