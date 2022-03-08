import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, VStack, Text } from '@chakra-ui/react';

import { TitleProps } from './types';

import HorizontalScroll from '../../../../components/HorizontalScroll';

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();
	const [isSm] = useMediaQuery('(max-width: 600px)');

	const { renderTitle, renderSubtitles, mediaType, isLoading } = props;

	return (
		<VStack
			width='100%'
			alignItems='flex-start'
			spacing={mediaType === 'person' ? (isLoading ? 0.5 : 0) : isSm ? 0 : 0.5}
		>
			{renderTitle({
				color: `gray.${colorMode === 'light' ? 900 : 50}`,
				fontSize: '3xl',
				fontWeight: 'bold'
			})}
			{renderSubtitles ? (
				<HorizontalScroll
					renderDivider={({ padding }) => (
						<Text
							align='left'
							color={`gray.${colorMode === 'light' ? 400 : 500}`}
							fontSize='sm'
							px={padding}
						>
							•
						</Text>
					)}
					isDisabled={isLoading}
				>
					{renderSubtitles({
						color: `gray.${colorMode === 'light' ? 400 : 500}`,
						fontSize: 'sm'
					})}
				</HorizontalScroll>
			) : null}
		</VStack>
	);
};

export default Title;
