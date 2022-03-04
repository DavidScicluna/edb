import { ReactElement, useContext } from 'react';

import { TabPanels as CUITabPanels, TabPanel, Box, Fade } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';

import { TabPanelsProps } from './types';

import { TabsContext } from '../../.';
import { TabsContext as TabsContextType } from '../../types';

const TabPanels = ({ children }: TabPanelsProps): ReactElement => {
	const { activeTab = 0 } = useContext<TabsContextType>(TabsContext);

	return (
		<CUITabPanels as={AnimatePresence} width='100%' exitBeforeEnter initial={false}>
			{children.map((panel, index) => (
				<TabPanel key={`tab_panel_${index}`} width='100%' p={0}>
					<Box as={Fade} in={activeTab === index} width='100%' unmountOnExit>
						{panel}
					</Box>
				</TabPanel>
			))}
		</CUITabPanels>
	);
};

export default TabPanels;
