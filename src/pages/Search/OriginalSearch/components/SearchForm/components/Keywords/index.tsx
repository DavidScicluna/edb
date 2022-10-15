import { FC } from 'react';

import { useTheme, ScaleFade, utils } from '@davidscicluna/component-library';

import { Box, Center, Text } from '@chakra-ui/react';

import { SpinnerCircularFixed } from 'spinners-react';
import { useInView } from 'react-cool-inview';

import SearchList from '../SearchList';
import SearchListItem from '../SearchList/components/SearchListItem';
import { useUserTheme } from '../../../../../../../common/hooks';

import { KeywordsProps } from './types';

const { getColor } = utils;

// TODO: Implement component similar to https://mantine.dev/core/scroll-area/

const Keywords: FC<KeywordsProps> = (props) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const { query, keywords, onMouseEnter, onMouseLeave, onKeywordClick } = props;
	const { isFetchingNextPage, isFetching, isLoading, hasNextPage, fetchNextPage } = query;
	const { results = [] } = keywords || {};

	const { observe } = useInView<HTMLDivElement>({
		onEnter: ({ unobserve }) => {
			unobserve();

			if (hasNextPage) {
				fetchNextPage();
			}
		}
	});

	return (
		<SearchList onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{results.map((keyword, index) => (
				<Box key={keyword.id} ref={index === results.length - 1 ? observe : null} width='100%'>
					<SearchListItem
						renderTitle={(props) => <Text {...props}>{keyword.name || ''}</Text>}
						onClick={() => onKeywordClick({ name: keyword.name })}
						variant='transparent'
					/>
				</Box>
			))}

			<ScaleFade in={isFetchingNextPage || isFetching || isLoading} style={{ width: '100%' }}>
				<Center width='100%'>
					<SpinnerCircularFixed
						color={getColor({ theme, colorMode, color, type: 'color' })}
						secondaryColor={getColor({ theme, colorMode, type: 'divider' })}
						size={theme.fontSizes['2xl']}
						thickness={160}
						speed={140}
					/>
				</Center>
			</ScaleFade>
		</SearchList>
	);
};

export default Keywords;
