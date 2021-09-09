import { CoverType } from '../../../../types';

export type BackdropProps = {
  title?: string;
  path?: string | null;
  isLoading?: boolean;
  isError?: boolean;
  onClick: (path: string, type: CoverType) => void;
};
