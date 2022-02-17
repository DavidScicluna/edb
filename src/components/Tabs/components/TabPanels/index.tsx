import { ReactElement, useContext } from 'react';

import { TabPanels as CUITabPanels, TabPanel, Fade } from '@chakra-ui/react';

import { AnimatePresence } from 'framer-motion';

import { TabPanelsProps } from './types';

import { TabsContext } from '../../.';
import { TabsContext as TabsContextType } from '../../types';

const TabPanels = ({ children }: TabPanelsProps): ReactElement => {
	const { activeTab = 0 } = useContext<TabsContextType>(TabsContext);

	return (
		<AnimatePresence exitBeforeEnter initial={false}>
			<CUITabPanels>
				{children.map((panel, index) => (
					<TabPanel key={index} as={Fade} in={activeTab === index} p={0}>
						{panel}
					</TabPanel>
				))}
			</CUITabPanels>
		</AnimatePresence>
	);
};

export default TabPanels;
