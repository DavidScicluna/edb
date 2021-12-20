import { ColorMode } from '../../../../common/types';
import { Header, Size } from '../../types';

export type HeaderProps = {
  colorMode: ColorMode;
  size: Size;
} & Header;
