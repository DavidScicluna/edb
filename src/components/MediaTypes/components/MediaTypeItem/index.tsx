import { ReactElement } from 'react';

import { NonNullable, CardRef, useTheme, Card, CardBody } from '@davidscicluna/component-library';

import { Center, Text } from '@chakra-ui/react';
import { useElementSize } from 'usehooks-ts';

// import { useSelector } from '../../../../common/hooks';
// import { defaultUser, getUser } from '../../../../store/slices/Users';

import { MediaTypeItemProps } from './types';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
	const theme = useTheme();

	// const color = useSelector(
	// 	(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	// );

	const [ref, { height }] = useElementSize<NonNullable<CardRef>>();

	const { renderLeft, label, value, isActive = false, onClick } = props;

	return (
		<Card
			ref={ref}
			// color={isActive ? color : 'gray'}
			color={isActive ? 'blue' : 'gray'}
			isFullWidth
			isClickable
			onClick={() => onClick(value)}
			p={4}
			sx={{ back: { minWidth: `${height * 1.5}px` } }}
		>
			<CardBody>
				<Center flexDirection='column'>
					{renderLeft({ isActive, fontSize: theme.fontSizes['4xl'] })}
					<Text
						align='center'
						fontSize='xl'
						fontWeight='semibold'
						textTransform='uppercase'
						whiteSpace='nowrap'
					>
						{label}
					</Text>
				</Center>
			</CardBody>
		</Card>
	);
};

export default MediaTypeItem;
