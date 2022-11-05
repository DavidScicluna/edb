import { FC } from 'react';

import { useTheme, Tooltip, Button, IconButton, IconButtonIcon, Icon, utils } from '@davidscicluna/component-library';

import { useMediaQuery, useBoolean, Drawer, DrawerContent, DrawerBody, HStack, Center, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../../../../../../common/hooks';
import { useLayoutContext } from '../../../../../../../../../../../../../containers/Layout/common/hooks';

import { ListActionsProps } from './types';

const { getColor } = utils;

const ListActions: FC<ListActionsProps> = ({ list, isOpen = false, onEdit, onDelete, onClose }) => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

	const { spacing } = useLayoutContext();

	const [isHoveringEdit, setIsHoveringEdit] = useBoolean();
	const [isHoveringDelete, setIsHoveringDelete] = useBoolean();

	return (
		<Drawer placement='bottom' isOpen={isOpen} onClose={onClose} size='md'>
			<DrawerContent
				width='auto'
				maxWidth='none'
				alignItems='center'
				justifyContent='center'
				boxShadow='none'
				background='transparent'
			>
				<DrawerBody width='fit-content' p={spacing}>
					<Center
						background={getColor({ theme, colorMode, type: colorMode === 'light' ? 'dark' : 'light' })}
						borderRadius='full'
						boxShadow='lg'
						px={spacing}
						py={spacing / 2}
					>
						<HStack alignItems='center' justifyContent='space-between' spacing={spacing}>
							<Text
								align='left'
								color={getColor({
									theme,
									colorMode,
									type: colorMode === 'dark' ? 'darkest' : 'lightest'
								})}
								fontSize={isSm ? 'md' : 'lg'}
								fontWeight='medium'
								whiteSpace='nowrap'
							>
								{`Selected "${list.label}" list`}
							</Text>

							<HStack spacing={spacing / 2}>
								{isSm ? (
									<Tooltip
										aria-label='Edit selected list (tooltip)'
										colorMode={colorMode}
										isOpen={isHoveringEdit}
										placement='top'
										label='Edit'
									>
										<IconButton
											aria-label='Edit selected list'
											color={color}
											colorMode={colorMode}
											onClick={() => onEdit()}
											onMouseEnter={() => setIsHoveringEdit.on()}
											onMouseLeave={() => setIsHoveringEdit.off()}
										>
											<IconButtonIcon icon='edit' category='outlined' />
										</IconButton>
									</Tooltip>
								) : (
									<Button
										color={color}
										colorMode={colorMode}
										renderLeft={({ color, colorMode, height }) => (
											<Icon
												width={`${height}px`}
												height={`${height}px`}
												fontSize={`${height}px`}
												colorMode={colorMode}
												icon='edit'
												category='outlined'
												skeletonColor={color}
											/>
										)}
										onClick={() => onEdit()}
									>
										Edit
									</Button>
								)}

								{isSm ? (
									<Tooltip
										aria-label='Delete selected list (tooltip)'
										colorMode={colorMode}
										isOpen={isHoveringDelete}
										placement='top'
										label='Delete'
									>
										<IconButton
											aria-label='Delete selected list'
											color='red'
											colorMode={colorMode}
											onClick={() => onDelete()}
											onMouseEnter={() => setIsHoveringDelete.on()}
											onMouseLeave={() => setIsHoveringDelete.off()}
										>
											<IconButtonIcon icon='delete_outline' category='outlined' />
										</IconButton>
									</Tooltip>
								) : (
									<Button
										color='red'
										colorMode={colorMode}
										renderLeft={({ color, colorMode, height }) => (
											<Icon
												width={`${height}px`}
												height={`${height}px`}
												fontSize={`${height}px`}
												colorMode={colorMode}
												icon='delete_outline'
												category='outlined'
												skeletonColor={color}
											/>
										)}
										onClick={() => onDelete()}
									>
										Delete
									</Button>
								)}
							</HStack>
						</HStack>

						<Center ml={spacing / 2}>
							<IconButton
								aria-label='Close'
								colorMode={colorMode}
								onClick={() => onClose()}
								variant='icon'
							>
								<IconButtonIcon icon='close' category='outlined' />
							</IconButton>
						</Center>
					</Center>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default ListActions;
