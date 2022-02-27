export type DisplayMode = 'grid' | 'list';

export type SidebarMode = 'expanded' | 'collapsed';

export type StateProps = {
	ui: {
		displayMode: DisplayMode;
		sidebarMode: SidebarMode;
	};
	data: {
		hasLoadedIcons: boolean;
	};
};
