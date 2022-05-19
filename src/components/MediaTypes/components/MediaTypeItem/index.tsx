import { ReactElement } from 'react';

import { useTheme, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';


import { useSelector } from '../../../../common/hooks';
import { NonNullable } from '../../../../common/types';
import { defaultUser, getUser } from '../../../../store/slices/Users';
import { Theme } from '../../../../theme/types';
import Card from '../../../Clickable/Card';
import { CardRef } from '../../../Clickable/Card/types';

import { MediaTypeItemProps } from './types';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const [ref, { height }] = useElementSize<NonNullable<CardRef>>();

	const { renderLeft, label, value, isActive = false, onClick } = props;

	return (
		<Card
			ref={ref}
			color={isActive ? color : 'gray'}
			isFullWidth
			isClickable
			onClick={() => onClick(value)}
			p={4}
			sx={{ back: { minWidth: `${height * 1.5}px` } }}
		>
			<Center flexDirection='column'>
				{renderLeft({ isActive, fontSize: theme.fontSizes['4xl'] })}
				<Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase' whiteSpace='nowrap'>
					{label}
				</Text>
			</Center>
		</Card>
	);
};

export default MediaTypeItem;
