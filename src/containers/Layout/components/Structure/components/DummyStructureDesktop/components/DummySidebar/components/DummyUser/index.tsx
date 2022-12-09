import { FC, useCallback } from 'react';

import { Space, useTheme, DummyCard, CardBody, Skeleton, utils } from '@davidscicluna/component-library';

import { VStack, HStack, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { useSelector, useUserTheme } from '../../../../../../../../../../common/hooks';

const { convertREMToPixels, convertStringToNumber } = utils;

const spacing: Space = 2;

const DummyUser: FC = () => {
	const theme = useTheme();
	const { colorMode } = useUserTheme();

	const [avatarRef, { width: avatarWidth }] = useElementSize();

	const sidebarMode = useSelector((state) => state.app.ui.sidebarMode);

	const handleAvatarWidth = useCallback(() => {
		const spacingWidth = convertREMToPixels(convertStringToNumber(theme.space[spacing], 'rem'));

		return `calc(100% - ${avatarWidth + spacingWidth}px)`;
	}, [theme, spacing, avatarWidth]);

	return (
		<DummyCard colorMode={colorMode} isFullWidth isLight p={sidebarMode === 'expanded' ? 2 : 1}>
			<CardBody>
				<HStack width='100%' alignItems='center' justifyContent='stretch' spacing={spacing}>
					<Center ref={avatarRef}>
						<Skeleton
							colorMode={colorMode}
							width={theme.space[sidebarMode === 'expanded' ? 7 : 4.25]}
							height={theme.space[sidebarMode === 'expanded' ? 7 : 4.25]}
							variant='rectangle'
						/>
					</Center>

					{sidebarMode === 'expanded' && (
						<VStack width={handleAvatarWidth()} alignItems='flex-start' spacing={0.5}>
							<Skeleton colorMode={colorMode} variant='text'>
								<Text align='left' fontSize='2xl' fontWeight='bold' lineHeight='normal' noOfLines={1}>
									Full Dummy User Name & Surname
								</Text>
							</Skeleton>
							<Skeleton colorMode={colorMode} variant='text'>
								<Text align='left' fontSize='md' lineHeight='normal' noOfLines={1}>
									@Dummy User Name
								</Text>
							</Skeleton>
						</VStack>
					)}
				</HStack>
			</CardBody>
		</DummyCard>
	);
};

export default DummyUser;
