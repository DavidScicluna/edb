import { ReactElement } from 'react';
import CountUp from 'react-countup';

import { useColorMode, useBoolean, HStack, Text } from '@chakra-ui/react';

import _ from 'lodash';

import { DisplayProps } from './types';

import Tooltip from '../../../../../../components/Tooltip';

const Display = ({ query = '', searchTypes, totalResults }: DisplayProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [isHovering, setIsHovering] = useBoolean();

	const handleAllTotal = (): number => {
		return (
			(totalResults?.movie || 0) +
			(totalResults?.tv || 0) +
			(totalResults?.person || 0) +
			(totalResults?.collection || 0) +
			(totalResults?.company || 0)
		);
	};

	const handleReturnMediaTypeTotal = (): number => {
		const total = 0;

		searchTypes.forEach((type) => total + (totalResults && totalResults[type] ? totalResults[type] : 0));

		return total;
	};

	const handleReturnMediaTypeLabel = (): string => {
		if (searchTypes.length === 1) {
			const searchType = searchTypes[0];
			const total = handleReturnMediaTypeTotal();

			switch (searchType) {
				case 'collection':
					return `Collection${total === 0 || total > 1 ? 's' : ''}`;
				case 'company':
					return `${total === 0 || total > 1 ? 'Companies' : 'company'}`;
				case 'person':
					return `${total === 0 || total > 1 ? 'People' : 'Person'}`;
				case 'tv':
					return `TV Show${total === 0 || total > 1 ? 's' : ''}`;
				case 'movie':
					return `Movie${total === 0 || total > 1 ? 's' : ''}`;
				default:
					return '';
			}
		} else {
			const total = handleAllTotal();

			return `result${total > 1 ? 's' : ''}`;
		}
	};

	return (
		<HStack width='100%' justifyContent='space-between'>
			<Tooltip
				aria-label={`Full query: "${query}"`}
				label={query}
				placement='bottom'
				isOpen={query.length > 20 && isHovering}
				isDisabled={query.length < 20}
				gutter={2}
			>
				<Text
					align='left'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='sm'
					onMouseEnter={query.length > 20 ? () => setIsHovering.on() : undefined}
					onMouseLeave={query.length > 20 ? () => setIsHovering.off() : undefined}
				>
					{`Your search results for "${_.truncate(query, { length: 20 })}"`}
				</Text>
			</Tooltip>
			<Text align='right' color={`gray.${colorMode === 'light' ? 400 : 500}`} fontSize='sm'>
				<CountUp duration={1} end={handleAllTotal()} suffix={` ${handleReturnMediaTypeLabel()} found!`} />
			</Text>
		</HStack>
	);
};

export default Display;
