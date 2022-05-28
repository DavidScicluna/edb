import { ReactElement } from 'react';

import { Button, Icon } from '@davidscicluna/component-library';

import { useColorMode, HStack, Box, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../common/hooks';
import Divider from '../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import Panel from '../../../../../../components/Panel';
import { defaultUser, getUser } from '../../../../../../store/slices/Users';
import { SearchType as SearchTypeValue } from '../../../../../../store/slices/Users/types';

import { SearchTypesProps } from './types';
import { SearchType as SearchTypeType } from './components/SearchType/types';
import SearchType from './components/SearchType';

export const searchTypes: SearchTypeType[] = [
	{
		value: 'movie',
		label: 'Movies',
		color: 'blue',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='theaters' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	},
	{
		value: 'tv',
		label: 'TV Shows',
		color: 'orange',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='tv' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	},
	{
		value: 'person',
		label: 'People',
		color: 'yellow',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='people_alt' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	},
	{
		value: 'collection',
		label: 'Collections',
		color: 'pink',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='library_books' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	},
	{
		value: 'company',
		label: 'Companies',
		color: 'purple',
		renderLeft: ({ isActive, fontSize }) => (
			<Icon icon='business' category={isActive ? 'filled' : 'outlined'} fontSize={fontSize} />
		)
	}
];

const SearchTypes = ({ searchTypes: activeSearchTypes, onSetSearchTypes }: SearchTypesProps): ReactElement => {
	const { colorMode } = useColorMode();

	const [ref, { height }] = useElementSize();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const handleAllClick = (): void => {
		if (activeSearchTypes.length === searchTypes.length) {
			onSetSearchTypes([]);
		} else {
			onSetSearchTypes(searchTypes.map((type) => type.value));
		}
	};

	const handleAllLabel = (): string => {
		return `${activeSearchTypes.length === searchTypes.length ? 'Remove' : 'Select'} All`;
	};

	const handleSearchTypeClick = (value: SearchTypeValue): void => {
		if (activeSearchTypes.some((activeType) => activeType === value)) {
			onSetSearchTypes(activeSearchTypes.filter((activeType) => activeType !== value));
		} else {
			onSetSearchTypes([...activeSearchTypes, value]);
		}
	};

	return (
		<Panel isFullWidth isDivisible={false} size='xs' variant='transparent'>
			{{
				header: {
					title: (
						<Text
							align='left'
							color={`gray.${colorMode === 'light' ? 400 : 500}`}
							fontSize='sm'
							fontWeight='bold'
							textTransform='uppercase'
							isTruncated
							overflow='hidden'
							whiteSpace='nowrap'
						>
							{`I'm looking for...`}
						</Text>
					),
					actions: (
						<HStack ref={ref} divider={<Divider orientation='vertical' height={`${height}px`} />}>
							<Button
								color={color}
								isDisabled={
									activeSearchTypes.length === 0 || activeSearchTypes.length === searchTypes.length
								}
								onClick={() => onSetSearchTypes([])}
								size='sm'
								variant='text'
							>
								Clear
							</Button>
							<Button color={color} onClick={() => handleAllClick()} size='sm' variant='text'>
								{handleAllLabel()}
							</Button>
						</HStack>
					)
				},
				body: (
					<HorizontalScroll renderDivider={() => <Box p={1} />}>
						{searchTypes.map((type) => (
							<SearchType
								{...type}
								key={type.value}
								isActive={activeSearchTypes.some((activeType) => activeType === type.value)}
								onClick={handleSearchTypeClick}
							/>
						))}
					</HorizontalScroll>
				)
			}}
		</Panel>
	);
};

export default SearchTypes;
