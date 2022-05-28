import { ReactElement, useState, useCallback } from 'react';

import { Card, CardHeader, CardBody } from '@davidscicluna/component-library';

import { useColorMode, VStack, List as CUIList, Text } from '@chakra-ui/react';

import { ListProps, Ref } from './types';

const List = (props: ListProps): ReactElement => {
	const { colorMode } = useColorMode();
	const { children, title, actions } = props;

	const [isOverflown, setIsOverflown] = useState<boolean>(false);

	const handleIsOverflown = useCallback((ref: Ref) => {
		if (ref) {
			setIsOverflown(ref.scrollHeight > ref.offsetHeight);
		}
	}, []);

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
						{title}
					</Text>
				)}
				actions={actions}
			/>
			<CardBody>
				<VStack
					as={CUIList}
					ref={(ref: Ref) => handleIsOverflown(ref)}
					width='100%'
					maxHeight='35vh'
					overflowY='auto'
					pr={isOverflown ? 2 : 0}
					spacing={0}
				>
					{children}
				</VStack>
			</CardBody>
		</Card>
	);
};

export default List;
