import { ReactElement } from 'react';

import { useTheme, HStack, VStack, Text } from '@chakra-ui/react';

import moment from 'moment';
import { useElementSize } from 'usehooks-ts';

import { ListProps } from './types';

import { useSelector } from '../../../../../../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../../../common/utils';
import Card from '../../../../../../../components/Clickable/Card';
import Icon from '../../../../../../../components/Icon';
import { Theme } from '../../../../../../../theme/types';

const List = (props: ListProps): ReactElement => {
	const theme = useTheme<Theme>();

	const [ref, { width }] = useElementSize();

	const color = useSelector((state) => state.user.ui.theme.color);

	const { list, isSelected = false, onClick } = props;
	const { id, label, description, results, date } = list;

	const fontSize = theme.fontSizes['3xl'];

	return (
		<Card
			color={isSelected ? color : 'gray'}
			isFullWidth
			isClickable
			onClick={() => onClick(id, isSelected)}
			px={2}
			py={1}
		>
			<HStack width='100%' justifyContent='space-between' spacing={2}>
				<VStack
					width={`calc(100% - ${
						width + handleConvertREMToPixels(handleConvertStringToNumber(theme.space[4], 'rem'))
					}px)`}
					alignItems='flex-start'
					spacing={0}
				>
					<Text align='left' fontSize='md' fontWeight='semibold' textTransform='capitalize'>
						{label}
					</Text>
					{description && description.length > 0 ? (
						<Text
							width='auto'
							maxWidth='100%'
							align='left'
							fontSize='xs'
							fontWeight='400'
							textTransform='capitalize'
							isTruncated
						>
							{description}
						</Text>
					) : null}
					<Text align='left' fontSize='xs' fontWeight='400' textTransform='capitalize'>
						{`${
							results.movies.length + results.tv.length > 0
								? `${results.movies.length + results.tv.length} items  • `
								: ''
						}${results.movies.length + results.tv.length > 0 ? 'Updated' : 'Created'} ${moment(
							date
						).fromNow()}`}
					</Text>
				</VStack>

				<Icon
					ref={ref}
					icon={isSelected ? 'check_box' : 'check_box_outline_blank'}
					type={isSelected ? 'filled' : 'outlined'}
					fontSize={fontSize}
				/>
			</HStack>
		</Card>
	);
};

export default List;
