import { IconButtonProps, LinkProps } from '@davidscicluna/component-library';

type SocialIconButtonType = 'facebook' | 'twitter' | 'instagram' | 'imdb' | 'homepage';

export type SocialIconButtonProps = Pick<LinkProps, 'href'> & {
	type?: SocialIconButtonType;
} & Pick<IconButtonProps, 'children'>;
