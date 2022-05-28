import { ReactElement } from 'react';

import { useColorMode, VStack, Text } from '@chakra-ui/react';

import HorizontalScroll from '../../../../components/HorizontalScroll';

import { TitleProps } from './types';

const Title = (props: TitleProps): ReactElement => {
	const { colorMode } = useColorMode();

	const { renderTitle, renderSubtitles, isLoading } = props;

	return (
		<VStack width='100%' alignItems='flex-start' spacing={0.5}>
			{renderTitle({
				color: `gray.${colorMode === 'light' ? 900 : 50}`,
				fontSize: '3xl',
				fontWeight: 'extrabold',
				lineHeight: 'normal'
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
