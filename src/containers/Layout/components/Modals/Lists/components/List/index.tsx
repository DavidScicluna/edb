import { ReactElement } from 'react';

import { useTheme, Card, CardBody, Icon } from '@davidscicluna/component-library';

import { HStack, VStack, Text, Center } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import compact from 'lodash/compact';
import { useElementSize } from 'usehooks-ts';

import { useSelector } from '../../../../../../../common/hooks';
import { handleConvertREMToPixels, handleConvertStringToNumber } from '../../../../../../../common/utils';
import { defaultUser, getUser } from '../../../../../../../store/slices/Users';

import { ListProps } from './types';

dayjs.extend(relativeTime);

const List = (props: ListProps): ReactElement => {
	const theme = useTheme();

	const [ref, { width }] = useElementSize();

	const color = useSelector(
		(state) => getUser(state.users.data.users, state.app.data.user)?.ui.theme.color || defaultUser.ui.theme.color
	);

	const { list, isSelected = false, onClick } = props;
	const { id, label, description, results, date } = list;

	const fontSize = theme.fontSizes['3xl'];

	return (
		<Card
			// color={isSelected ? color : 'gray'}
			color={isSelected ? 'blue' : 'gray'}
			isFullWidth
			isClickable
			onClick={() => onClick(id, isSelected)}
			px={2}
			py={1}
		>
			<CardBody>
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
							>
								{description}
							</Text>
						) : null}
						<Text align='left' fontSize='xs' fontWeight='400' textTransform='capitalize'>
							{compact([
								results.movies.length + results.tv.length > 0
									? `${results.movies.length + results.tv.length} items`
									: undefined,
								`${results.movies.length + results.tv.length > 0 ? 'Updated' : 'Created'} ${dayjs(
									date
								).fromNow()}`
							]).join(' • ')}
						</Text>
					</VStack>

					<Center ref={ref}>
						<Icon
							icon={isSelected ? 'check_box' : 'check_box_outline_blank'}
							category={isSelected ? 'filled' : 'outlined'}
							fontSize={fontSize}
						/>
					</Center>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default List;
