import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, useConst, HStack, Input as CUIInput, Fade } from '@chakra-ui/react';

import { sample } from 'lodash';

import collectionsPlaceholders from './common/data/placeholders/collections';
import combinedPlaceholders from './common/data/placeholders/combined';
import companiesPlaceholders from './common/data/placeholders/companies';
import moviesPlaceholders from './common/data/placeholders/movie';
import peoplePlaceholders from './common/data/placeholders/people';
import tvPlaceholders from './common/data/placeholders/tv';
import Actions from './components/Actions';
import SearchTypes from './components/SearchTypes';
import { InputProps } from './types';

import Icon from '../../../../../../components/Icon';
import { Theme } from '../../../../../../theme/types';
import { InputKeyboardEvent, InputChangeEvent } from '../../../../types';

const Input = (props: InputProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const [isSm] = useMediaQuery('(max-width: 600px)');

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

	const placeholder = useConst<string | undefined>(sample(handleReturnPlaceholders()));

	return (
		<HStack
			width='100%'
			minHeight='30px' // Size of SearchTypes
			justifyContent='space-between'
		>
			<HStack flex={1}>
				<Icon icon='search' type='outlined' color={theme.colors.gray[colorMode === 'light' ? 400 : 500]} />

				{!isSm ? (
					<Fade in={searchTypes.length > 0} unmountOnExit>
						<SearchTypes searchTypes={searchTypes} onClear={onClearSearchTypes} />
					</Fade>
				) : null}

				<CUIInput
					borderRadius='none'
					color={`gray.${colorMode === 'light' ? 900 : 50}`}
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
