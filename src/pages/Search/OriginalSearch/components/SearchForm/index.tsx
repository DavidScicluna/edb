import { FC, useRef } from 'react';

import { Nullable, Card, CardBody, CardDivider, Collapse } from '@davidscicluna/component-library';

import { useOutsideClick, VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { isFocused as defaultIsFocused } from '../../common/data/defaultPropValues';

import { SearchFormProps } from './types';

const SearchForm: FC<SearchFormProps> = (props) => {
	const { colorMode } = useUserTheme();

	const ref = useRef<Nullable<HTMLInputElement>>(null);

	const { children, isFocused = defaultIsFocused, onFocus, onBlur } = props;
	const { input, collapsible, info } = children;

	useOutsideClick({ ref, handler: () => onBlur() });

	return (
		<VStack ref={ref} width='100%' spacing={0.5}>
			<Card colorMode={colorMode} isFullWidth onClick={() => onFocus()} p={2}>
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
