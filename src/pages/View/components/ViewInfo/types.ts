import { BoxMargin, BoxPadding, BoxLayout, BoxPosition, HorizontalScrollProps } from '@davidscicluna/component-library';

type Omitted = BoxMargin | BoxPadding | BoxLayout | BoxPosition | 'maxWidth' | 'colorMode' | 'renderDivider';

export type ViewInfoProps = Omit<HorizontalScrollProps, Omitted>;
