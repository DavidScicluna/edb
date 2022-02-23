import { ReactElement } from 'react';

import { useTheme, Center, Text } from '@chakra-ui/react';

import { useElementSize } from 'usehooks-ts';

import { MediaTypeItemProps } from './types';

import { useSelector } from '../../../../common/hooks';
import { NonNullable } from '../../../../common/types';
import { Theme } from '../../../../theme/types';
import Card from '../../../Clickable/Card';
import { CardRef } from '../../../Clickable/Card/types';

const MediaTypeItem = (props: MediaTypeItemProps): ReactElement => {
	const theme = useTheme<Theme>();

	const color = useSelector((state) => state.user.ui.theme.color);

	const [ref, { height }] = useElementSize<NonNullable<CardRef>>();

	const { renderIcon, label, value, isActive = false, onClick } = props;

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
				{renderIcon({ isActive, fontSize: theme.fontSizes['4xl'] })}

				<Text align='center' fontSize='xl' fontWeight='semibold' textTransform='uppercase' whiteSpace='nowrap'>
					{label}
				</Text>
			</Center>
		</Card>
	);
};

export default MediaTypeItem;
