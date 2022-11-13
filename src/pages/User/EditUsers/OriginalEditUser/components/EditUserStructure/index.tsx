import { FC } from 'react';

import { Form, InternalLink, Button, Divider } from '@davidscicluna/component-library';

import { VStack, HStack, Center, Text } from '@chakra-ui/react';

import { color as defaultColor, colorMode as defaultColorMode } from '../../../../../../common/data/defaultPropValues';
import { useLayoutContext } from '../../../../../../containers/Layout/common/hooks';
import { useSelector } from '../../../../../../common/hooks';
import { Headline } from '../../../../../../components';

import { EditUserStructureProps } from './types';

const EditUserStructure: FC<EditUserStructureProps> = (props) => {
	const { spacing } = useLayoutContext();

	const { id } = useSelector((state) => state.users.data.activeUser.data);

	const {
		children,
		color = defaultColor,
		colorMode = defaultColorMode,
		title,
		subtitle,
		isSubmitDisabled = true,
		onReset,
		onSubmit
	} = props;

	return (
		<Form onSubmit={onSubmit}>
			<VStack width='100%' divider={<Divider colorMode={colorMode} />} spacing={spacing}>
				<Headline
					width='100%'
					// renderCaption={() => (
					// 	<Badge color={color} colorMode={colorMode} size='xs'>
					// 		<BadgeLabel>{[name, username].join(' • ')}</BadgeLabel>
					// 	</Badge>
					// )}
					renderTitle={(props) => (
						<Text {...props} fontSize={['3xl', '3xl', '4xl', '4xl', '5xl', '5xl']}>
							{title}
						</Text>
					)}
					renderSubtitle={(props) => <Text {...props}>{subtitle}</Text>}
					py={spacing}
				/>

				<Center width='100%'>{children}</Center>

				<HStack width='100%' justifyContent='space-between' spacing={0}>
					<InternalLink to='/profile'>
						<Button colorMode={colorMode} variant='outlined'>
							Cancel
						</Button>
					</InternalLink>

					<HStack spacing={2}>
						{onReset && (
							<Button color={color} colorMode={colorMode} onClick={() => onReset()} variant='text'>
								Reset
							</Button>
						)}
						<Button color={color} colorMode={colorMode} isDisabled={!id || isSubmitDisabled} type='submit'>
							Update
						</Button>
					</HStack>
				</HStack>
			</VStack>
		</Form>
	);
};

export default EditUserStructure;
