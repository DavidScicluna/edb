import { FC } from 'react';

import { useTheme, Icon, utils } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useUserTheme } from '../../../../../../../common/hooks';

import { SearchedKeywordProps } from './types';
import useStyles from './common/styles';
import { isActive as defaultIsActive } from './common/data/defaultPropValues';

const { getColor } = utils;

const SearchedKeyword: FC<SearchedKeywordProps> = ({ name, isActive = defaultIsActive, onClick }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [checkRef, { width: checkWidth }] = useElementSize();

	const style = useStyles({ theme, color, colorMode, isActive });

	return (
		<VStack width='100%' alignItems='center' justifyContent='space-between' spacing={0} sx={style.keyword}>
			<Center
				width={`calc(100% - ${isActive ? checkWidth : 0}px)`}
				alignItems='center'
				justifyContent='flex-start'
				onClick={onClick}
			>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.primary' })}
					fontSize='lg'
					textTransform='capitalize'
					noOfLines={1}
				>
					{name}
				</Text>
			</Center>

			{isActive && (
				<Center ref={checkRef}>
					<Icon
						width={theme.fontSizes['2xl']}
						height={theme.fontSizes['2xl']}
						fontSize={theme.fontSizes['2xl']}
						color={getColor({ theme, colorMode, color, type: 'color' })}
						colorMode={colorMode}
						icon='check'
					/>
				</Center>
			)}
		</VStack>
	);
};

export default SearchedKeyword;
