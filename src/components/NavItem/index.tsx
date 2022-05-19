import { ReactElement, useCallback, useEffect } from 'react';


import { useTheme, useColorMode, useBoolean, VStack, HStack, Text, Box, ScaleFade, Collapse } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';


import { useSelector } from '../../common/hooks';
import { handleParseDurationForFramer, handleConvertStringToNumber } from '../../common/utils';
import Link from '../../components/Clickable/Link';
import { defaultUser, getUser } from '../../store/slices/Users';
import { Theme } from '../../theme/types';
import IconButton from '../Clickable/IconButton';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

import { NavItem as NavItemType } from './types';
import useStyles from './styles';
import NavItemChild from './components/NavItemChild';

const NavItem = (props: NavItemType): ReactElement => {
	const theme = useTheme<Theme>();
	const { colorMode } = useColorMode();

	const location = useLocation();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

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
		debounce(() => {
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
			sx={{ ...merge(style.common.container, style[colorMode].container) }}
			onClick={!isDisabled && onClick ? () => onClick() : undefined}
		>
			<Tooltip
				width='100%'
				aria-label={!isExpanded ? label : ''}
				label={!isExpanded ? label : ''}
				isOpen={!(isDisabled || isExpanded) && isHoveringNav}
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
						sx={{ ...merge(style.common.main, style[colorMode].main) }}
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
								<IconButton
									aria-label='Toggle '
									colorMode={colorMode === 'light' ? 'dark' : 'light'}
									onClick={() => setIsChildrenOpen.toggle()}
									onMouseEnter={() => setIsHoveringIcon.on()}
									onMouseLeave={() => setIsHoveringIcon.off()}
									size='sm'
									variant='icon'
								>
									<Icon
										icon='chevron_right'
										type='outlined'
										sx={{ transform: `rotate(${isChildrenOpen ? '90deg' : '0deg'})` }}
									/>
								</IconButton>
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
