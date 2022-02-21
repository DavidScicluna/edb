import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme, useColorMode, useBoolean, HStack, Text, Box } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { NavItemChildProps } from './types';

import { useSelector } from '../../../../common/hooks';
import Link from '../../../../components/Clickable/Link';
import { Theme } from '../../../../theme/types';
import Tooltip from '../../../Tooltip';

const NavItemChild = (props: NavItemChildProps): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { label, path, isLastChild = false, isExpanded = false } = props;

	const [isHoveringChild, setIsHoveringChild] = useBoolean();

	const isActive: boolean = location.pathname === path;
	const style = useStyles(theme, color, isActive, isExpanded, isLastChild);

	/**
	 * This method will get the label and return the initials of that label
	 *
	 * @returns - Initials
	 */
	const handleGetInitials = (): string => {
		const parts = label.split(' ');
		let initials = '';

		parts.forEach((part) => {
			if (part) {
				initials += part[0];
			}
		});

		return initials;
	};

	return (
		<Link to={{ pathname: path || '' }} isFullWidth isDisabled={!path} sx={{ ...style.common.link }}>
			<Tooltip
				aria-label={!isExpanded ? label : ''}
				width='100%'
				label={!isExpanded ? label : ''}
				isOpen={isHoveringChild}
				isDisabled={isExpanded}
				placement='right'
				gutter={16}
			>
				<HStack width='100%' spacing='12px'>
					{isExpanded ? (
						<Box
							width='2px'
							height='42px'
							backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
						/>
					) : null}

					<HStack
						width='100%'
						justifyContent={isExpanded ? 'flex-start' : 'center'}
						px={isExpanded ? 2 : 1}
						py={1}
						onMouseEnter={() => setIsHoveringChild.on()}
						onMouseLeave={() => setIsHoveringChild.off()}
						spacing={0}
						sx={{ ..._.merge(style.common.child, style[colorMode].child) }}
					>
						<Text
							align='left'
							fontSize={isExpanded ? 'md' : 'sm'}
							fontWeight='semibold'
							whiteSpace='nowrap'
							textTransform={isExpanded ? 'capitalize' : 'uppercase'}
						>
							{isExpanded ? label : handleGetInitials()}
						</Text>
					</HStack>
				</HStack>
			</Tooltip>
		</Link>
	);
};

export default NavItemChild;