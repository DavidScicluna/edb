import { ReactElement } from 'react';

import { HStack, Center, Text } from '@chakra-ui/react';

import range from 'lodash/range';
import { useElementSize } from 'usehooks-ts';


import Button from '../../../Clickable/Button';
import Divider from '../../../Divider';
import HorizontalScroll from '../../../HorizontalScroll';

import { QuickTogglesProps } from './types';
import Accordion from './components/Accordion';

const QuickToggles = (props: QuickTogglesProps): ReactElement => {
	const [textRef, { width: textWidth }] = useElementSize<HTMLParagraphElement>();
	const [buttonRef, { width: buttonWidth, height: buttonHeight }] = useElementSize<HTMLButtonElement>();

	const {
		accordions,
		openedPanels,
		color = 'gray',
		colorMode,
		isLoading = true,
		isDisabled = false,
		onToggleAccordion,
		onToggleAllAccordions
	} = props;

	return (
		<HStack
			width='100%'
			justifyContent='stretch'
			divider={<Divider colorMode={colorMode} orientation='vertical' height={`${buttonHeight}px`} />}
			spacing={2}
		>
			{/* Width is calculated by the width of the hide/show button component and the 32 pixels +
      2 pixels of the divider in spacing between the button & container below */}
			<HStack width={`calc(100% - ${buttonWidth + 34}px)`} justifyContent='stretch'>
				<Text
					ref={textRef}
					align='left'
					color={`gray.${colorMode === 'light' ? 400 : 500}`}
					fontSize='sm'
					whiteSpace='nowrap'
				>
					Jump to:
				</Text>

				{/* Width is calculated by the width of the text component above and the 8 pixels in spacing between the text & scroll */}
				<Center width={`calc(100% - ${textWidth + 8}px)`} height='100%'>
					<HorizontalScroll
						renderDivider={({ padding }) => (
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 400 : 500}`}
								fontSize='md'
								px={padding}
							>
								•
							</Text>
						)}
						isDisabled={isLoading}
					>
						{!isLoading
							? accordions.map((accordion) => (
									<Accordion
										key={accordion.id}
										{...accordion}
										color={color}
										colorMode={colorMode}
										isDisabled={isDisabled}
										isLoading={false}
										onToggle={() => onToggleAccordion(accordion.id)}
									/>
							  ))
							: range(0, 5).map((_dummy, index: number) => (
									<Accordion key={index} colorMode={colorMode} isDisabled={isDisabled} isLoading />
							  ))}
					</HorizontalScroll>
				</Center>
			</HStack>

			<Button
				ref={buttonRef}
				colorMode={colorMode}
				isDisabled={isLoading}
				onClick={() => onToggleAllAccordions()}
				size='sm'
				variant='text'
			>
				{accordions.length === openedPanels ? 'Hide all' : 'Show all'}
			</Button>
		</HStack>
	);
};

export default QuickToggles;
