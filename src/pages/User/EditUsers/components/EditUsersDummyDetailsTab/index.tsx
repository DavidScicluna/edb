import { FC } from 'react';

import { useTheme, DummyCard, CardBody, Input, Textarea, Icon } from '@davidscicluna/component-library';

import { useMediaQuery, VStack, SimpleGrid } from '@chakra-ui/react';

import EditUsersDummyStructure from '../EditUsersDummyStructure';
import { useUserTheme } from '../../../../../common/hooks';

const EditUsersDummyDetailsTab: FC = () => {
	const theme = useTheme();
	const { color, colorMode } = useUserTheme();

	const [isSm] = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	return (
		<EditUsersDummyStructure title='Details' subtitle='Edit your basic information.'>
			<DummyCard colorMode={colorMode} isFullWidth variant='outlined' p={2}>
				<CardBody>
					<VStack width='100%' spacing={2}>
						<Input
							color={color}
							colorMode={colorMode}
							autoComplete='off'
							label='Username'
							isDisabled
							isFullWidth
							isRequired
							isReadOnly
							renderLeftPanel={({ color, ...rest }) => (
								<Icon {...rest} icon='alternate_email' category='outlined' skeletonColor={color} />
							)}
						/>

						<SimpleGrid width='100%' columns={isSm ? 2 : 1} spacing={2}>
							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								label='First name'
								isDisabled
								isFullWidth
								isRequired
							/>

							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								label='Last name'
								isDisabled
								isFullWidth
								isRequired
							/>
						</SimpleGrid>

						<Textarea
							color={color}
							colorMode={colorMode}
							label='Biography'
							isDisabled
							isFullWidth
							sx={{ textarea: { height: theme.space[12.5] } }}
						/>
					</VStack>
				</CardBody>
			</DummyCard>
		</EditUsersDummyStructure>
	);
};

export default EditUsersDummyDetailsTab;
