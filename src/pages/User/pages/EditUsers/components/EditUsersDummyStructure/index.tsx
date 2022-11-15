import { FC } from 'react';

import { Skeleton, DummyButton, Divider } from '@davidscicluna/component-library';

import { VStack, HStack, Center, Text } from '@chakra-ui/react';

import { useUserTheme } from '../../../../../../common/hooks';
import { Headline } from '../../../../../../components';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';

import { EditUsersDummyStructureProps } from './types';

const EditUsersDummyStructure: FC<EditUsersDummyStructureProps> = (props) => {
	const { color, colorMode } = useUserTheme();

	const { spacing } = useLayoutContext();

	const { children, title, subtitle } = props;

	return (
		<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
			<Headline
				width='100%'
				// renderCaption={() => (
				// 	<Badge color={color} colorMode={colorMode} size='xs'>
				// 		<BadgeLabel>{[name, username].join(' • ')}</BadgeLabel>
				// 	</Badge>
				// )}
				renderTitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props} fontSize={['3xl', '3xl', '4xl', '4xl', '5xl', '5xl']}>
							{title}
						</Text>
					</Skeleton>
				)}
				renderSubtitle={(props) => (
					<Skeleton colorMode={colorMode} isLoaded={false} variant='text'>
						<Text {...props}>{subtitle}</Text>
					</Skeleton>
				)}
				py={spacing}
			/>

			<Center width='100%'>{children}</Center>

			<HStack width='100%' justifyContent='space-between' spacing={0}>
				<DummyButton colorMode={colorMode} variant='outlined'>
					Cancel
				</DummyButton>

				<DummyButton color={color} colorMode={colorMode}>
					Update
				</DummyButton>
			</HStack>
		</VStack>
	);
};

export default EditUsersDummyStructure;
