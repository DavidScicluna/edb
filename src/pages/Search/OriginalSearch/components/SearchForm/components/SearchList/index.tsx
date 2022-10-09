import { FC } from 'react';

import { useTheme, Card, CardHeader, CardBody, utils } from '@davidscicluna/component-library';

import { VStack, List as CUIList, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../common/hooks';

import { SearchListProps } from './types';

const { getColor } = utils;

const SearchList: FC<SearchListProps> = (props) => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const { children, title, actions } = props;

	return (
		<Card isFullWidth isDivisible={false} variant='transparent'>
			{title && (
				<CardHeader
					renderTitle={(props) => (
						<Text
							{...props}
							color={getColor({ theme, colorMode, type: 'text.secondary' })}
							fontSize='sm'
							textTransform='uppercase'
						>
							{title}
						</Text>
					)}
					actions={actions}
				/>
			)}
			<CardBody>
				<VStack as={CUIList} width='100%' maxHeight='35vh' overflowY='auto' spacing={0}>
					{children}
				</VStack>
			</CardBody>
		</Card>
	);
};

export default SearchList;
