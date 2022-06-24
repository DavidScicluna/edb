import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button, Icon } from '@davidscicluna/component-library';

import { useColorMode, HStack, Box, Text } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../common/hooks';
import Divider from '../../../../../../components/Divider';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
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
		renderLeft: (props) => <Icon {...props} icon='theaters' category={isActive ? 'filled' : 'outlined'} />
	},
	{
		value: 'tv',
		label: 'TV Shows',
		color: 'orange',
		renderLeft: (props) => <Icon {...props} icon='tv' category={isActive ? 'filled' : 'outlined'} />
	},
	{
		value: 'person',
		label: 'People',
		color: 'yellow',
		renderLeft: (props) => <Icon {...props} icon='people_alt' category={isActive ? 'filled' : 'outlined'} />
	},
	{
		value: 'collection',
		label: 'Collections',
		color: 'pink',
		renderLeft: (props) => <Icon {...props} icon='library_books' category={isActive ? 'filled' : 'outlined'} />
	},
	{
		value: 'company',
		label: 'Companies',
		color: 'purple',
		renderLeft: (props) => <Icon {...props} icon='business' category={isActive ? 'filled' : 'outlined'} />
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
		<Card isFullWidth isDivisible={false} variant='transparent'>
			<CardHeader
				renderTitle={(props) => (
					<Text
						{...props}
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						fontSize='sm'
						textTransform='uppercase'
					>
						{"I'm looking for..."}
					</Text>
				)}
				actions={
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
				}
			/>
			<CardBody>
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
			</CardBody>
		</Card>
	);
};

export default SearchTypes;
