import { FC, useRef } from 'react';

import { Nullable, Card, CardBody, CardDivider, Collapse } from '@davidscicluna/component-library';

import { useBoolean, useOutsideClick, VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';

import { SearchFormProps } from './types';

const SearchForm: FC<SearchFormProps> = (props) => {
	const { colorMode } = useUserTheme();

	const ref = useRef<Nullable<HTMLInputElement>>(null);

	const { children } = props;
	const { input, collapsible, info } = children;

	const [isFocused, setIsFocused] = useBoolean();

	useOutsideClick({ ref, handler: () => setIsFocused.off() });

	return (
		<VStack ref={ref} width='100%' spacing={0.5}>
			<Card colorMode={colorMode} isFullWidth onClick={() => setIsFocused.on()} p={2}>
				<CardBody>
					<VStack width='100%' spacing={2}>
						{input}

						<Collapse in={isFocused} style={{ width: '100%' }}>
							<VStack width='100%' spacing={2}>
								<CardDivider />

								{collapsible}
							</VStack>
						</Collapse>
					</VStack>
				</CardBody>
			</Card>

			{info}
		</VStack>
	);
};

export default SearchForm;
