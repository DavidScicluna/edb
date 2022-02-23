import { ReactElement, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
	useTheme,
	useColorMode,
	useBoolean,
	VStack,
	HStack,
	Icon,
	Text,
	Box,
	ScaleFade,
	Collapse
} from '@chakra-ui/react';

import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';

import NavItemChild from './components/NavItemChild';
import useStyles from './styles';
import { NavItem as NavItemType } from './types';

import { useSelector } from '../../common/hooks';
import { handleParseDurationForFramer, handleConvertStringToNumber } from '../../common/utils';
import Link from '../../components/Clickable/Link';
import { Theme } from '../../theme/types';
import Tooltip from '../Tooltip';

const NavItem = (props: NavItemType): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { renderIcon, children, label, path, isExpanded = true, isDisabled = false, onClick } = props;

	const [isChildrenOpen, setIsChildrenOpen] = useBoolean();

	const [isHoveringNav, setIsHoveringNav] = useBoolean();
	const [isHoveringIcon, setIsHoveringIcon] = useBoolean();

	const isActive: boolean = location.pathname === path;
	const isChildActive: boolean = children ? children.some((child) => location.pathname === child.path) : false;

	const canRenderChildren: boolean = children ? children.every((child) => child.renderChild) : false;

	const style = useStyles(theme, {
		color,
		isActive,
		isChildActive,
		renderChildren: canRenderChildren,
		isExpanded,
		isDisabled,
		isOpen: children ? isChildrenOpen : false
	});

	const handleToggleChildren = useCallback(
		_.debounce(() => {
			setIsChildrenOpen.toggle();
		}, 250),
		[setIsChildrenOpen]
	);

	useEffect(() => {
		if ((isActive || isChildActive) && !isChildrenOpen) {
			handleToggleChildren();
		}
	}, [isActive, isChildActive, isChildrenOpen]);

	useEffect(() => {
		if (isChildrenOpen) {
			handleToggleChildren();
		}
	}, [isExpanded]);

	return (
		<VStack
			aria-disabled={isDisabled}
			width='100%'
			spacing={isExpanded ? 2 : 0}
			sx={{ ..._.merge(style.common.container, style[colorMode].container) }}
			onClick={!isDisabled && onClick ? () => onClick() : undefined}
		>
			<Tooltip
				width='100%'
				aria-label={!isExpanded ? label : ''}
				label={!isExpanded ? label : ''}
				isOpen={!isDisabled && !isExpanded && isHoveringNav}
				isDisabled={isDisabled || isExpanded}
				placement='right'
				gutter={16}
				shouldWrapChildren
			>
				<Link
					to={{ pathname: path || '' }}
					isFullWidth
					isDisabled={isDisabled || !path || isHoveringIcon}
					sx={{ ...style.common.link }}
				>
					<HStack
						width='100%'
						justifyContent='space-between'
						px={isExpanded ? 2 : 1}
						py={1}
						spacing={2}
						onMouseEnter={() => setIsHoveringNav.on()}
						onMouseLeave={() => setIsHoveringNav.off()}
						sx={{ ..._.merge(style.common.main, style[colorMode].main) }}
					>
						<HStack width='100%' spacing={2}>
							{renderIcon({ isActive, fontSize: theme.fontSizes['2xl'] })}
							<ScaleFade
								in={isExpanded}
								unmountOnExit
								delay={{
									enter: handleParseDurationForFramer(
										handleConvertStringToNumber(theme.transition.duration.slow, 'ms')
									),
									exit: 0
								}}
							>
								<Text align='left' fontSize='xl' fontWeight='semibold' whiteSpace='nowrap'>
									{label}
								</Text>
							</ScaleFade>
						</HStack>

						{children && canRenderChildren ? (
							<ScaleFade
								in={isExpanded}
								unmountOnExit
								delay={{
									enter: handleParseDurationForFramer(
										handleConvertStringToNumber(theme.transition.duration.slow, 'ms')
									),
									exit: 0
								}}
							>
								<Icon
									as={ChevronRightOutlinedIcon}
									sx={{
										fontSize: `${theme.fontSizes.xl} !important`,
										transform: `rotate(${isChildrenOpen ? '90deg' : '0deg'})`
									}}
									onClick={() => setIsChildrenOpen.toggle()}
									onMouseEnter={() => setIsHoveringIcon.on()}
									onMouseLeave={() => setIsHoveringIcon.off()}
								/>
							</ScaleFade>
						) : null}
					</HStack>
				</Link>
			</Tooltip>

			{children && canRenderChildren ? (
				<Collapse in={isChildrenOpen} unmountOnExit style={{ width: '100%' }}>
					<VStack
						width='100%'
						spacing={0}
						pl={isExpanded ? 3.5 : 0}
						pr={isExpanded ? 2 : 0}
						mb={isExpanded ? 1 : 0}
					>
						{!isExpanded ? (
							<Box
								width='100%'
								height='2px'
								backgroundColor={`gray.${colorMode === 'light' ? 200 : 700}`}
							/>
						) : null}
						{children.map((child, index) => (
							<NavItemChild
								key={child.label}
								label={child.label}
								path={child.path}
								isLastChild={index === children.length - 1}
							/>
						))}
					</VStack>
				</Collapse>
			) : null}
		</VStack>
	);
};

export default NavItem;
