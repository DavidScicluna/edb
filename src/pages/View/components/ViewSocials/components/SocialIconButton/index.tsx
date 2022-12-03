import { FC } from 'react';

import { ExternalLink, Tooltip, IconButton } from '@davidscicluna/component-library';

import { useBoolean } from '@chakra-ui/react';

import { capitalize } from 'lodash';

import { useUserTheme } from '../../../../../../common/hooks';

import { SocialIconButtonProps } from './types';

const SocialIconButton: FC<SocialIconButtonProps> = ({ children, type, href }) => {
	const { color, colorMode } = useUserTheme();

	const [isHovering, setIsHovering] = useBoolean();

	return (
		<ExternalLink href={href}>
			<Tooltip
				aria-label={`Open ${capitalize(type)} page (tooltip)`}
				colorMode={colorMode}
				isOpen={isHovering}
				placement='top-end'
				label={`Open ${capitalize(type)} page`}
			>
				<IconButton
					aria-label={`Open ${capitalize(type)} page`}
					color={isHovering ? color : 'gray'}
					colorMode={colorMode}
					onMouseEnter={() => setIsHovering.on()}
					onMouseLeave={() => setIsHovering.off()}
					variant='icon'
				>
					{children}
				</IconButton>
			</Tooltip>
		</ExternalLink>
	);
};

export default SocialIconButton;
