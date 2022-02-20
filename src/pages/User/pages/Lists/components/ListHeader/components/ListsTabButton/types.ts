import { TabsProps } from '../../../../../../../../components/Tabs/components/TabList/components/Tab/types';

export type ListsTabButtonProps = {
	onClick: () => void;
} & Omit<TabsProps, 'label'>;
