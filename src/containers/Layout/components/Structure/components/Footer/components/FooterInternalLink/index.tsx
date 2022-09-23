import { FC } from 'react';

import { InternalLink, InternalLinkProps as FooterInternalLinkProps } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { merge } from 'lodash';

import { useUserTheme } from '../../../../../../../../common/hooks';

const FooterInternalLink: FC<FooterInternalLinkProps> = ({ children, to, sx, ...rest }) => {
	const { color, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<InternalLink
			{...rest}
			color={isHovering ? color : 'gray'}
			colorMode={colorMode}
			to={to}
			onMouseEnter={() => setIsHovering.on()}
			onMouseLeave={() => setIsHovering.off()}
			sx={merge({ textDecoration: 'none !important' }, sx)}
		>
			{children}
		</InternalLink>
	);
};

export default FooterInternalLink;
