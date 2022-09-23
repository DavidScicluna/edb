import { FC } from 'react';

import { ExternalLink, LinkProps as FooterExternalLinkProps } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { merge } from 'lodash';

import { useUserTheme } from '../../../../../../../../common/hooks';

const FooterExternalLink: FC<FooterExternalLinkProps> = ({ children, href, sx, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<ExternalLink
			{...rest}
			color={isHovering ? color : 'gray'}
			colorMode={colorMode}
			href={href}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
			sx={merge({ textDecoration: 'none !important' }, sx)}
		>
			{children}
		</ExternalLink>
	);
};

export default FooterExternalLink;
