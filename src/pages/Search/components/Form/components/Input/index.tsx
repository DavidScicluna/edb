import { ReactElement } from 'react';

import { useColorMode, useConst, HStack, Input as CUIInput, Center, Fade } from '@chakra-ui/react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import collectionsPlaceholders from './common/data/placeholders/collections';
import combinedPlaceholders from './common/data/placeholders/combined';
import companiesPlaceholders from './common/data/placeholders/companies';
import moviesPlaceholders from './common/data/placeholders/movie';
import peoplePlaceholders from './common/data/placeholders/people';
import tvPlaceholders from './common/data/placeholders/tv';
import Actions from './components/Actions';
import SearchTypes from './components/SearchTypes';
import { InputProps } from './types';

import { InputKeyboardEvent, InputChangeEvent } from '../../../../types';

const Input = (props: InputProps): ReactElement => {
	const { colorMode } = useColorMode();

	const {
		query,
		isDisabled = false,
		searchTypes,
		onInputKeyPress,
		onInputChange,
		onClearQuery,
		onSubmitQuery,
		onClearSearchTypes
	} = props;

	const handleReturnPlaceholders = (): string[] => {
		if (searchTypes.length === 1) {
			const searchType = searchTypes[0];

			switch (searchType) {
				case 'movie':
					return moviesPlaceholders;
				case 'tv':
					return tvPlaceholders;
				case 'people':
					return peoplePlaceholders;
				case 'collection':
					return collectionsPlaceholders;
				case 'company':
					return companiesPlaceholders;
				default:
					return combinedPlaceholders;
			}
		} else {
			return combinedPlaceholders;
		}
	};

	const placeholder = useConst<string | undefined>(_.sample(handleReturnPlaceholders()));

	return (
		<HStack
			width='100%'
			minHeight='30px' // Size of SearchTypes
			justifyContent='space-between'
		>
			<HStack flex={1}>
				<Center
					sx={{
						'& svg': {
							color: colorMode === 'light' ? 'gray.400' : 'gray.500',
							transition: 'none !important'
						}
					}}
				>
					<SearchOutlinedIcon />
				</Center>
				<Fade in={searchTypes.length > 0} unmountOnExit>
					<SearchTypes searchTypes={searchTypes} onClear={onClearSearchTypes} />
				</Fade>
				<CUIInput
					borderRadius='none'
					color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
					placeholder={`Try "${placeholder}"`}
					isDisabled={isDisabled}
					onKeyPress={(event: InputKeyboardEvent) => onInputKeyPress(event)}
					onChange={(event: InputChangeEvent) => onInputChange(event)}
					variant='unstyled'
					value={query}
					sx={{ transition: 'none !important' }}
				/>
			</HStack>
			<Actions
				hasQuery={query.length > 0}
				isDisabled={isDisabled}
				onClear={onClearQuery}
				onSubmit={onSubmitQuery}
			/>
		</HStack>
	);
};

export default Input;
