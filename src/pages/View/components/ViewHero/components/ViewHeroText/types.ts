import { TextProps } from '@chakra-ui/react';

export type ViewHeroTextProps = Omit<TextProps, 'align' | 'fontSize' | 'lineHeight'>;
