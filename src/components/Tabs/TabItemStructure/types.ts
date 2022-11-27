import { ReactNode } from 'react';

export type TabItemStructureStatus = 'empty' | 'loading' | 'multiple' | 'single' | 'hidden';

export type TabItemStructureProps = {
	status: TabItemStructureStatus;
	headline: ReactNode;
	dummy: ReactNode;
	empty: ReactNode;
	multiple: ReactNode;
	single: ReactNode;
};
