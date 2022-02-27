import { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';

import moment from 'moment';

import Stats from './components/Stats';
import { ListInfoProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../../components/Clickable/Button';
import Icon from '../../../../../../components/Icon';
import Modal from '../../../../../../components/Modal';
import Panel from '../../../../../../components/Panel';

const ListInfo = ({ id, isOpen, onEdit, onDelete, onClose }: ListInfoProps): ReactElement => {
	const { colorMode } = useColorMode();

	const list = useSelector((state) => state.user.data.lists.find((list) => list.id === id));

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
							moment(list?.date).isSame(moment(), 'day')
								? moment(list?.date).fromNow()
								: moment(list?.date).format('LL')
						}`}
					</Text>
				</VStack>
			}
			renderActions={({ colorMode, size }) => (
				<HStack spacing={2}>
					<Button
						colorMode={colorMode}
						renderLeft={({ fontSize }) => <Icon icon='edit' type='outlined' fontSize={fontSize} />}
						onClick={() => onEdit()}
						size={size}
					>
						Edit
					</Button>
					<Button
						color='red'
						colorMode={colorMode}
						renderLeft={({ fontSize }) => (
							<Icon icon='delete_outline' type='outlined' fontSize={fontSize} />
						)}
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
					<Panel isFullWidth>
						{{
							header: {
								title: 'Description'
							},
							body: (
								<Text
									align='left'
									color={`gray.${colorMode === 'light' ? 900 : 50}`}
									fontSize='lg'
									fontWeight='normal'
								>
									{list.description}
								</Text>
							)
						}}
					</Panel>
				) : null}

				<Stats totalMovies={list?.results.movies.length || 0} totalTvs={list?.results.tv.length || 0} />
			</VStack>
		</Modal>
	);
};

export default ListInfo;
