import { FC, useCallback } from 'react';

import { useTheme, Tooltip, utils } from '@davidscicluna/component-library';

import { useColorMode, useConst, useBoolean, HStack, Text } from '@chakra-ui/react';

import CountUp from 'react-countup';
import { truncate } from 'lodash';

import { Form } from '../../../../types';

import { SearchInfoProps } from './types';

const { getColor } = utils;

const SearchInfo: FC<SearchInfoProps> = ({ watchQuery, watchSearchTypes, total }) => {
	const theme = useTheme();
	const { colorMode } = useColorMode();

	const { movie = 0, tv = 0, person = 0, collection = 0, company = 0 } = total;

	const query = useConst<Form['query']>(watchQuery);
	const searchTypes = useConst<Form['searchTypes']>(watchSearchTypes);

	const [isHovering, setIsHovering] = useBoolean();

	const handleAllTotal = useCallback((): number => {
		return movie + tv + person + collection + company;
	}, [movie, tv, person, collection, company]);

	const handleReturnLabel = useCallback((): string => {
		if (searchTypes.length === 1) {
			const searchType = searchTypes[0];
			const sum = searchTypes.reduce(
				(value, searchType) => value + (total && total[searchType] ? total[searchType] : 0),
				0
			);

			switch (searchType) {
				case 'collection':
					return `Collection${sum === 1 ? '' : 's'}`;
				case 'company':
					return `${sum === 1 ? 'Companies' : 'company'}`;
				case 'person':
					return `${sum === 1 ? 'People' : 'Person'}`;
				case 'tv':
					return `TV Show${sum === 1 ? '' : 's'}`;
				case 'movie':
					return `Movie${sum === 1 ? '' : 's'}`;
			}
		} else {
			const total = handleAllTotal();

			return `result${total === 1 ? '' : 's'}`;
		}
	}, [searchTypes, total, handleAllTotal]);

	return (
		<HStack width='100%' justifyContent='space-between' spacing={0}>
			<Tooltip
				aria-label={`Query: "${query}" (tooltip)`}
				label={`Query: "${query}" (tooltip)`}
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

			<Text align='right' color={getColor({ theme, colorMode, type: 'text.secondary' })} fontSize='sm'>
				<CountUp duration={1} end={handleAllTotal()} suffix={` ${handleReturnLabel()} found!`} />
			</Text>
		</HStack>
	);
};

export default SearchInfo;
