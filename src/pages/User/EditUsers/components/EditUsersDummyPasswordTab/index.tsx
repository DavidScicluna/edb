import { FC } from 'react';

import { Space, DummyCard, CardBody, Divider, Input } from '@davidscicluna/component-library';

import { VStack } from '@chakra-ui/react';

import DummyPasswordIcon from '../../../components/DummyPasswordIcon';
import EditUsersDummyStructure from '../EditUsersDummyStructure';
import { useUserTheme } from '../../../../../common/hooks';

const spacing: Space = 2;

const PasswordTab: FC = () => {
	const { color, colorMode } = useUserTheme();

	return (
		<EditUsersDummyStructure title='Password' subtitle='Update your password'>
			<DummyCard colorMode={colorMode} isFullWidth variant='outlined' p={spacing}>
				<CardBody>
					<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing * 2}>
						<Input
							color={color}
							colorMode={colorMode}
							autoComplete='off'
							label='Current Password'
							isDisabled
							isFullWidth
							isRequired
							renderRightPanel={({ color, ...rest }) => (
								<DummyPasswordIcon {...rest} skeletonColor={color} />
							)}
						/>

						<VStack width='100%' spacing={spacing}>
							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								label='New Password'
								isDisabled
								isFullWidth
								isRequired
								renderRightPanel={({ color, ...rest }) => (
									<DummyPasswordIcon {...rest} skeletonColor={color} />
								)}
							/>

							<Input
								color={color}
								colorMode={colorMode}
								autoComplete='off'
								label='Confirm Password'
								isDisabled
								isFullWidth
								isRequired
								renderRightPanel={({ color, ...rest }) => (
									<DummyPasswordIcon {...rest} skeletonColor={color} />
								)}
							/>
						</VStack>
					</VStack>
				</CardBody>
			</DummyCard>
		</EditUsersDummyStructure>
	);
};

export default PasswordTab;
