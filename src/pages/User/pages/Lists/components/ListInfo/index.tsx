import { ReactElement } from 'react';

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Card,
	CardHeader,
	CardBody,
	Button,
	IconButton,
	Icon
} from '@davidscicluna/component-library';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import { useSelector } from '../../../../../../common/hooks';
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
		<Modal isOpen={isOpen} onClose={onClose} size='lg'>
			<ModalHeader
				renderTitle={(props) => <Text {...props}>{`${list?.label ? `"${list.label}"` : ''} List`}</Text>}
				renderSubtitle={(props) => (
					<Text {...props}>{`${
						(list ? list?.results.movies.length + list?.results.tv.length : 0) > 0 ? 'Updated' : 'Created'
					} ${
						dayjs(list?.date).isSame(dayjs(), 'day')
							? dayjs(list?.date).fromNow()
							: dayjs(list?.date).format('LL')
					}`}</Text>
				)}
				renderCancel={({ icon, category, ...rest }) => (
					<IconButton {...rest}>
						<Icon icon={icon} category={category} />
					</IconButton>
				)}
			/>
			<ModalBody>
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
			</ModalBody>
			<ModalFooter
				renderCancel={(props) => (
					<Button {...props} onClick={onClose}>
						Cancel
					</Button>
				)}
				renderAction={(props) => (
					<HStack spacing={2}>
						<Button
							{...props}
							renderLeft={({ colorMode, width, height }) => (
								<Icon
									colorMode={colorMode}
									icon='edit'
									category='outlined'
									width={width}
									height={height}
								/>
							)}
							isDisabled={isDisabled}
							onClick={() => onEdit()}
						>
							Edit
						</Button>
						<Button
							{...props}
							color='red'
							renderLeft={({ colorMode, width, height }) => (
								<Icon
									colorMode={colorMode}
									icon='delete_outline'
									category='outlined'
									width={width}
									height={height}
								/>
							)}
							isDisabled={isDisabled}
							onClick={() => onDelete()}
						>
							Delete
						</Button>
					</HStack>
				)}
			/>
		</Modal>
	);
};

export default ListInfo;
