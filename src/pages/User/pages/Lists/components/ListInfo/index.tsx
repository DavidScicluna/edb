import { ReactElement } from 'react';

import { Card, CardHeader, CardBody, Button, Icon } from '@davidscicluna/component-library';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../common/hooks';
import Modal from '../../../../../../components/Modal';
import { getUser } from '../../../../../../store/slices/Users';

import { ListInfoProps } from './types';
import Stats from './components/Stats';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const ListInfo = ({ id, isOpen, onEdit, onDelete, onClose }: ListInfoProps): ReactElement => {
	const { colorMode } = useColorMode();

	const user = useSelector((state) => state.app.data.user);
	const list = useSelector((state) =>
		(getUser(state.users.data.users, state.app.data.user)?.data.lists || []).find((list) => list.id === id)
	);

	const isDisabled: boolean = isNil(user) || isEmpty(user);

	return (
		<Modal
			title={
				<VStack alignItems='flex-start' spacing={0}>
					<Text fontSize='md' fontWeight='semibold' color={`gray.${colorMode === 'light' ? 900 : 50}`}>
						{`${list?.label ? `"${list.label}"` : ''} List`}
					</Text>
					<Text
						align='left'
						color={`gray.${colorMode === 'light' ? 400 : 500}`}
						fontSize='xs'
						fontWeight='normal'
					>
						{`${
							(list ? list?.results.movies.length + list?.results.tv.length : 0) > 0
								? 'Updated'
								: 'Created'
						} ${
							dayjs(list?.date).isSame(dayjs(), 'day')
								? dayjs(list?.date).fromNow()
								: dayjs(list?.date).format('LL')
						}`}
					</Text>
				</VStack>
			}
			renderActions={({ colorMode, size }) => (
				<HStack spacing={2}>
					<Button
						colorMode={colorMode}
						renderLeft={({ fontSize }) => <Icon icon='edit' category='outlined' fontSize={fontSize} />}
						isDisabled={isDisabled}
						onClick={() => onEdit()}
						size={size}
					>
						Edit
					</Button>
					<Button
						color='red'
						colorMode={colorMode}
						renderLeft={({ fontSize }) => (
							<Icon icon='delete_outline' category='outlined' fontSize={fontSize} />
						)}
						isDisabled={isDisabled}
						onClick={() => onDelete()}
						size={size}
					>
						Delete
					</Button>
				</HStack>
			)}
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size='lg'
		>
			<VStack width='100%' spacing={2} p={2}>
				{list?.description ? (
					<Card isFullWidth>
						<CardHeader renderTitle={(props) => <Text {...props}>Description</Text>} />
						<CardBody>
							<Text
								align='left'
								color={`gray.${colorMode === 'light' ? 900 : 50}`}
								fontSize='lg'
								fontWeight='normal'
							>
								{list.description}
							</Text>
						</CardBody>
					</Card>
				) : null}

				<Stats totalMovies={list?.results.movies.length || 0} totalTvs={list?.results.tv.length || 0} />
			</VStack>
		</Modal>
	);
};

export default ListInfo;
