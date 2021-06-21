export type SortDirection = 'asc' | 'desc';

export type DisplayMode = 'grid' | 'list';

export type SidebarMode = 'expanded' | 'collapsed';

export type StateProps = {
  data: {
    displayMode: DisplayMode;
    sortDirection: SortDirection;
    sidebarMode: SidebarMode;
  };
};
