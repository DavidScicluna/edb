import { FC } from 'react';

import { useTheme, InternalLink, Card, CardBody, Icon, utils } from '@davidscicluna/component-library';

import { VStack, Center, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../../../common/hooks';

const { getColor } = utils;

const CreateUser: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	return (
		<InternalLink to='/register'>
			<Card color='gray' colorMode={colorMode} isClickable p={1}>
				<CardBody>
					<VStack width='100%' spacing={1}>
						<Center width={theme.space[5]} height={theme.space[5]} background={theme.colors.transparent}>
							<Icon
								color={getColor({ theme, colorMode, color, type: 'color' })}
								colorMode={colorMode}
								width={theme.fontSizes['2xl']}
								height={theme.fontSizes['2xl']}
								fontSize={theme.fontSizes['2xl']}
								icon='add_box'
								skeletonColor={color}
							/>
						</Center>

						<Text
							align='center'
							color={getColor({ theme, colorMode, type: 'text.primary' })}
							fontSize='md'
							fontWeight='semibold'
						>
							Create New Account
						</Text>
					</VStack>
				</CardBody>
			</Card>
		</InternalLink>
	);
};

export default CreateUser;
