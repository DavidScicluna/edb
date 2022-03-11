import { ReactElement, useRef } from 'react';

import { useTheme, useColorMode, useBoolean, useOutsideClick, VStack, Fade, Collapse } from '@chakra-ui/react';

import merge from 'lodash/merge';

import { FormProps } from './types';

import Divider from '../../../../components/Divider';
import usePanelStyles from '../../../../components/Panel/styles';
import { Theme } from '../../../../theme/types';

const Form = ({ children }: FormProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const ref = useRef<HTMLInputElement | null>(null);

	const [isFocused, setIsFocused] = useBoolean();

	const style = usePanelStyles(theme, { color: 'gray', isFullWidth: true });

	useOutsideClick({
		ref,
		handler: () => setIsFocused.off()
	});

	return (
		<VStack width='100%' spacing={0.5}>
			<VStack
				ref={ref}
				width='100%'
				divider={
					<Fade in={isFocused} unmountOnExit style={{ width: '100%' }}>
						<Divider my={2} />
					</Fade>
				}
				onClick={() => setIsFocused.on()}
				spacing={0}
				p={2}
				sx={{ ...merge(style.panel.outlined, style[colorMode].outlined) }}
			>
				{children.input}
				<Collapse in={isFocused} unmountOnExit style={{ width: '100%' }}>
					{children.collapsibleContent}
				</Collapse>
			</VStack>
			{children.display}
		</VStack>
	);
};

export default Form;
