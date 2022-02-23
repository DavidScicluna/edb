import { ReactElement } from 'react';

import { useColorMode, useBoolean, HStack, Text } from '@chakra-ui/react';

import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';

import { SearchTypesProps } from './types';

import IconButton from '../../../../../../../../components/Clickable/IconButton';
import Tooltip from '../../../../../../../../components/Tooltip';
import { searchTypes as allSearchTypes } from '../../../SearchTypes';

const SearchTypes = ({ searchTypes, onClear }: SearchTypesProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [isHoveringClear, setIsHoveringClear] = useBoolean();

	return (
		<HStack
			minHeight='30px' // Size of Close Button
			backgroundColor={`gray.${colorMode === 'light' ? 200 : 700}`}
			borderRadius='sm'
			px={1}
			py={0.25}
			spacing={1}
		>
			<Text
				align='left'
				color={`gray.${colorMode === 'light' ? 400 : 500}`}
				fontSize='sm'
				fontWeight='semibold'
				textTransform='uppercase'
				whiteSpace='nowrap'
			>
				{searchTypes.length === allSearchTypes.length
					? 'All'
					: allSearchTypes
							.filter((searchType) => searchTypes.includes(searchType.value))
							.map((searchType) => searchType.label)
							.join(' • ')}
			</Text>
			{onClear ? (
				<Tooltip
					aria-label='Clear Search Types'
					label='Clear Search Types'
					isOpen={isHoveringClear}
					placement='top'
				>
					<IconButton
						aria-label='Clear Search Types'
						onClick={() => onClear()}
						onMouseEnter={() => setIsHoveringClear.on()}
						onMouseLeave={() => setIsHoveringClear.off()}
						size='sm'
						variant='icon'
					>
						<ClearOutlinedIcon />
					</IconButton>
				</Tooltip>
			) : undefined}
		</HStack>
	);
};

export default SearchTypes;
