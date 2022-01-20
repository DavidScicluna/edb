import { ReactElement } from 'react';

import { useColorMode, VStack, HStack, Text } from '@chakra-ui/react';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon
} from '@material-ui/icons';
import moment from 'moment';

import Button from '../../../../../../components/Clickable/Button';
import Divider from '../../../../../../components/Divider';
import Modal from '../../../../../../components/Modal';
import Panel from '../../../../../../components/Panel';
import Stats from './components/Stats';
import { ListInfoProps } from './types';

const ListInfo = ({ list, isOpen, onEdit, onDelete, onClose }: ListInfoProps): ReactElement => {
  const { colorMode } = useColorMode();

  return (
    <Modal
      title={
        <VStack alignItems='flex-start' spacing={0}>
          <Text fontSize='md' fontWeight='semibold' color={colorMode === 'light' ? 'gray.900' : 'gray.50'}>
            {`${list?.label ? `"${list.label}"` : ''} List`}
          </Text>
          <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs' fontWeight='normal'>
            {`${(list ? list?.results.movies.length + list?.results.tv.length : 0) > 0 ? 'Updated' : 'Created'} ${
              moment(list?.date).isSame(moment(), 'day')
                ? moment(list?.date).fromNow()
                : moment(list?.date).format('LL')
            }`}
          </Text>
        </VStack>
      }
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size='md'
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
                  color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
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

        <Divider />

        <HStack width='100%' spacing={2}>
          <Button
            renderLeftIcon={({ fontSize }) => <EditOutlinedIcon style={{ fontSize }} />}
            isFullWidth
            onClick={() => onEdit()}
          >
            Edit
          </Button>
          <Button
            color='red'
            renderLeftIcon={({ fontSize }) => <DeleteOutlineOutlinedIcon style={{ fontSize }} />}
            isFullWidth
            onClick={() => onDelete()}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );
};

export default ListInfo;
