import { FC, useRef } from 'react';

import { Nullable, Card, CardBody, CardDivider, Collapse } from '@davidscicluna/component-library';

import { useBoolean, useOutsideClick, VStack } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../common/hooks';
import { isFocused as defaultIsFocused } from '../../common/data/defaultPropValues';

import { SearchFormProps } from './types';

const SearchForm: FC<SearchFormProps> = (props) => {
	const { colorMode } = useUserTheme();

	const formRef = useRef<Nullable<HTMLInputElement>>(null);

	const { children, isFocused = defaultIsFocused, onFocus, onBlur } = props;
	const { input, collapsible, info } = children;

	const [isHovering, setIsHovering] = useBoolean();

	useOutsideClick({ ref: formRef, handler: !isHovering ? () => onBlur() : undefined });

	return (
		<VStack width='100%'>
			<Card
				ref={formRef}
				spacing={0.5}
				colorMode={colorMode}
				isFullWidth
				onClick={() => onFocus()}
				onMouseEnter={() => setIsHovering.on()}
				onMouseLeave={() => setIsHovering.off()}
				p={2}
			>
				<CardBody>
					<VStack width='100%' spacing={2}>
						{input}

						<Collapse in={isFocused || isHovering} style={{ width: '100%' }}>
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
