import { FC, useState, useEffect } from 'react';

import { useLocation } from 'react-router';

import { useTheme, utils } from '@davidscicluna/component-library';

import { useColorMode, Text } from '@chakra-ui/react';

import Marquee from 'react-fast-marquee';
import { parseToRgba } from 'color2k';

import { getQueryFromSearch, getSearchTypesFromSearch } from '../../../../../common/utils';
import { SearchForm } from '../../../../../types';
import { SearchInfosCommonProps as SearchInfoSmProps } from '../common/types';
import { getLabel, getTotal } from '../common/utils';

const { getColor } = utils;

const SearchInfoSm: FC<SearchInfoSmProps> = ({ total }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const [query, setQuery] = useState<SearchForm['query']>(getQueryFromSearch({ location }));
	const [searchTypes, setSearchTypes] = useState<SearchForm['searchTypes']>(getSearchTypesFromSearch({ location }));

	useEffect(() => {
		setQuery(getQueryFromSearch({ location }));
		setSearchTypes(getSearchTypesFromSearch({ location }));
	}, [location.search]);

	return (
		<Marquee
			pauseOnHover
			speed={50}
			delay={2.5}
			gradient
			gradientWidth={theme.space[4]}
			gradientColor={
				parseToRgba(getColor({ theme, colorMode, type: 'background' })).filter(
					(_color, index) => index < 3
				) as [number, number, number]
			}
			style={{ gap: theme.space['0.5'] }}
		>
			<Text
				width='100%'
				align='right'
				color={getColor({ theme, colorMode, type: 'text.secondary' })}
				fontSize='sm'
				whiteSpace='nowrap'
			>
				{`Your search results for "${query}" • ${getLabel({ searchTypes, end: getTotal({ total }) })} • `}
			</Text>
		</Marquee>
	);
};

export default SearchInfoSm;
