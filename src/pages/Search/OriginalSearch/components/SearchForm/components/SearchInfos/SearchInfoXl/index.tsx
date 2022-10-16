import { FC, useRef, useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Tooltip, utils, Nullable } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, HStack, Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { memoize, truncate } from 'lodash';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import { getQueryFromSearch, getSearchTypesFromSearch } from '../../../../../common/utils';
import { SearchForm } from '../../../../../types';
import { SearchInfosCommonProps as SearchInfoXlProps } from '../common/types';
import { getLabel, getTotal } from '../common/utils';

const { getColor } = utils;

const SearchInfoXl: FC<SearchInfoXlProps> = ({ total }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const countUpRef = useRef<Nullable<HTMLParagraphElement>>(null);

	const location = useLocation();

	const [query, setQuery] = useState<SearchForm['query']>(getQueryFromSearch({ location }));
	const [searchTypes, setSearchTypes] = useState<SearchForm['searchTypes']>(getSearchTypesFromSearch({ location }));

	const [isHovering, setIsHovering] = useBoolean();

	const { start, update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: getTotal({ total }),
		delay: 2.5,
		duration: 2.5,
		formattingFn: memoize((end): string => getLabel({ searchTypes, end })),
		startOnMount: false
	});

	useEffectOnce(() => start());

	useUpdateEffect(() => update(getTotal({ total })), [total]);

	useEffect(() => {
		setQuery(getQueryFromSearch({ location }));
		setSearchTypes(getSearchTypesFromSearch({ location }));
	}, [location.search]);

	return (
		<HStack width='100%' justifyContent='space-between' spacing={0}>
			<Tooltip
				aria-label={`Query: "${query}" (tooltip)`}
				label={`Query: "${query}"`}
				placement='bottom'
				isOpen={query.length >= 20 && isHovering}
				isDisabled={query.length < 20}
			>
				<Text
					align='left'
					color={getColor({ theme, colorMode, type: 'text.secondary' })}
					fontSize='sm'
					onMouseEnter={query.length >= 20 ? () => setIsHovering.on() : undefined}
					onMouseLeave={query.length >= 20 ? () => setIsHovering.off() : undefined}
				>
					{`Your search results for "${truncate(query, { length: 20 })}"`}
				</Text>
			</Tooltip>

			<Text
				ref={countUpRef}
				align='right'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize='sm'
			/>
		</HStack>
	);
};

export default SearchInfoXl;
