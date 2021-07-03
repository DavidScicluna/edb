export type SortDirection = 'asc' | 'desc';

export type DisplayMode = 'grid' | 'list';

export type SidebarMode = 'expanded' | 'collapsed';

export type StateProps = {
  data: {
    sortDirection: SortDirection;
  };
  ui: {
    displayMode: DisplayMode;
    sidebarMode: SidebarMode;
  };
};
