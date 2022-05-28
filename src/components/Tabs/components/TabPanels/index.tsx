import { ReactElement, useContext } from 'react';

import { TabPanels as CUITabPanels, TabPanel, Center, Fade } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';


import { TabsContext } from '../../.';
import { TabsContext as TabsContextType } from '../../types';

import { TabPanelsProps } from './types';

const TabPanels = ({ children }: TabPanelsProps): ReactElement => {
	const { activeTab = 0 } = useContext<TabsContextType>(TabsContext);

	return (
		<CUITabPanels as={AnimatePresence} width='100%' exitBeforeEnter initial={false}>
			{children.map((panel, index) => (
				<TabPanel key={`tab_panel_${index}`} width='100%' p={0}>
					<Center as={Fade} in={activeTab === index} width='100%' unmountOnExit>
						{panel}
					</Center>
				</TabPanel>
			))}
		</CUITabPanels>
	);
};

export default TabPanels;
