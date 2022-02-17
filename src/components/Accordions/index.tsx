import { ReactElement, useState } from 'react';

import { VStack } from '@chakra-ui/react';

import Accordion from './components/Accordion';
import QuickToggles from './components/QuickToggles';
import { AccordionsProps, Accordion as AccordionType } from './types';

const Accordions = <D,>(props: AccordionsProps<D>): ReactElement => {
	const [openedAccordions, setOpenedAccordions] = useState<AccordionType<D>['id'][]>([]);

	const { renderAccordion, accordions = [], color, isError = false, isLoading = true } = props;

	/**
	 * This method will check whether the passed id is already opened, if so it will close it
	 * Else it will open it
	 *
	 * @param id string - ID of the Accordion
	 */
	const handleToggleAccordion = (id: AccordionType<D>['id']): void => {
		if (openedAccordions.some((accordion) => accordion === id)) {
			setOpenedAccordions(openedAccordions.filter((accordion) => accordion !== id));
		} else {
			setOpenedAccordions([...openedAccordions, id]);
		}
	};

	/**
	 * This methodd will either open all or close all accordions
	 */
	const handleToggleAllAccordions = (): void => {
		if (accordions.length === openedAccordions.length) {
			setOpenedAccordions([]);
		} else {
			setOpenedAccordions(accordions.map((accordion) => accordion.id));
		}
	};

	return (
		<VStack width='100%' spacing={2}>
			<QuickToggles
				accordions={accordions.map((accordion) => {
					return { id: accordion.id, title: accordion.title };
				})}
				openedPanels={openedAccordions.length}
				color={color}
				isLoading={isLoading}
				isDisabled={isError}
				onToggleAccordion={(id: AccordionType<D>['id']) => setOpenedAccordions([...openedAccordions, id])}
				onToggleAllAccordions={handleToggleAllAccordions}
			/>

			<VStack width='100%' spacing={2}>
				{accordions.map((accordion) => (
					<Accordion
						{...accordion}
						key={accordion.id}
						// footer={}
						isOpen={openedAccordions.some((openedAccordion) => openedAccordion === accordion.id)}
						isDisabled={isError || accordion.isDisabled}
						isLoading={isLoading}
						onToggle={() => handleToggleAccordion(accordion.id)}
					>
						{renderAccordion({
							...accordion,
							isOpen: openedAccordions.some((openedAccordion) => openedAccordion === accordion.id)
						})}
					</Accordion>
				))}
			</VStack>
		</VStack>
	);
};
export default Accordions;
