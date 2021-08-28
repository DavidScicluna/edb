export type ActionsProps = {
  hasQuery: boolean;
  isFormLocked: boolean;
  isHoveringLock: boolean;
  onToggleLock: () => void;
  onHoverLock: (bool: boolean) => void;
  onClearQuery: () => void;
};
