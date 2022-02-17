import { ReactElement } from 'react';

import { useTheme, VStack, Text } from '@chakra-ui/react';

import { MediaTypeItemProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import { Theme } from '../../../../../../theme/types';
import Card from '../../../../../Clickable/Card';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { renderIcon, label, value, isActive = false, onClick } = props;

	return (
		<Card color={isActive ? color : 'gray'} isFullWidth isClickable onClick={() => onClick(value)} p={4} py={8}>
			<VStack width='100%' spacing={0}>
				{renderIcon({ isActive, fontSize: theme.fontSizes['4xl'] })}

				<Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase'>
					{label}
				</Text>
			</VStack>
		</Card>
	);
};

export default MediaTypeItem;
