import { FC, useRef, useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, Tooltip, utils } from '@davidscicluna/component-library';

import { useColorMode, useBoolean, HStack, Text } from '@chakra-ui/react';

import { useCountUp } from 'react-countup';
import { truncate } from 'lodash';
import { useUpdateEffect } from 'usehooks-ts';

import { getQueryFromSearch, getSearchTypesFromSearch } from '../../../../common/utils';
import { SearchForm } from '../../../../types';

import { SearchInfoProps } from './types';
import { getSuffix, getTotal } from './common/utils';

const { getColor } = utils;

const SearchInfo: FC<SearchInfoProps> = ({ total }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const countUpRef = useRef(null);

	const location = useLocation();

	const [query, setQuery] = useState<SearchForm['query']>(getQueryFromSearch({ location }));
	const [searchTypes, setSearchTypes] = useState<SearchForm['searchTypes']>(getSearchTypesFromSearch({ location }));

	const [isHovering, setIsHovering] = useBoolean();

	const { update } = useCountUp({
		ref: countUpRef,
		start: 0,
		end: getTotal({ total }),
		duration: 2.5,
		suffix: ` ${getSuffix({ searchTypes, total })} found!`
	});

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

export default SearchInfo;
