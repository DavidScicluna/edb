import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';
import {
  EditOutlined as EditOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon
} from '@material-ui/icons';

import Button from '../../../../../../components/Clickable/Button';
import IconButton from '../../../../../../components/Clickable/IconButton';
import { ToastProps } from './types';

const Toast = (props: ToastProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { selected, onEdit, onDelete, onClose } = props;

  return (
    <HStack
      backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      borderRadius='full'
      boxShadow='lg'
      spacing={2}
      px={2}
      py={1.5}
      mb={1.5}
    >
      <HStack spacing={0.25}>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
          fontSize={isSm ? 'sm' : 'md'}
          fontWeight='normal'
          whiteSpace='nowrap'
        >
          {`"${selected.label}" list`}
        </Text>
      </HStack>

      <HStack spacing={1}>
        {isSm ? (
          <IconButton
            aria-label='Edit selected list'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            onClick={() => onEdit()}
            size='sm'
          >
            <EditOutlinedIcon />
          </IconButton>
        ) : (
          <Button
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            renderLeftIcon={({ fontSize }) => <EditOutlinedIcon style={{ fontSize }} />}
            onClick={() => onEdit()}
          >
            Edit
          </Button>
        )}

        {isSm ? (
          <IconButton
            aria-label='Delete selected list'
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            onClick={() => onDelete()}
            size='sm'
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        ) : (
          <Button
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            renderLeftIcon={({ fontSize }) => <DeleteOutlineOutlinedIcon style={{ fontSize }} />}
            onClick={() => onDelete()}
          >
            Delete
          </Button>
        )}
      </HStack>

      <IconButton
        aria-label='Close'
        colorMode={colorMode === 'light' ? 'dark' : 'light'}
        onClick={() => onClose()}
        size={isSm ? 'sm' : 'md'}
        variant='icon'
      >
        <CloseOutlinedIcon />
      </IconButton>
    </HStack>
  );
};

export default Toast;
