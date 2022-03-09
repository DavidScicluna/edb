export type DisplayMode = 'grid' | 'list';

export type SidebarMode = 'expanded' | 'collapsed';

export type StateProps = {
	data: {
		user?: string;
		hasLoadedIcons: boolean;
	};
	ui: {
		displayMode: DisplayMode;
		sidebarMode: SidebarMode;
	};
};
