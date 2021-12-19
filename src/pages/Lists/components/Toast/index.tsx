import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';
import { Info as InfoIcon, Edit as EditIcon, Trash2 as TrashIcon, X as XIcon } from 'react-feather';

import { handleReturnColor } from '../../../../common/utils';
import Button from '../../../../components/Clickable/Button';
import IconButton from '../../../../components/Clickable/IconButton';
import store from '../../../../store';
import { ToastProps } from './types';

const Toast = (props: ToastProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = store.getState().user.ui.theme.color;

  const { selected, onInfo, onEdit, onDelete, onClose } = props;

  return (
    <HStack
      backgroundColor={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      borderRadius='full'
      boxShadow='lg'
      spacing={2}
      px={2}
      py={1.5}
      mb={1.5}>
      <HStack spacing={0.25}>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.50' : 'gray.900'}
          fontSize={isSm ? 'sm' : 'md'}
          fontWeight='normal'
          whiteSpace='nowrap'>
          {`"${selected.label}" list`}
        </Text>
      </HStack>

      <HStack spacing={1}>
        {isSm ? (
          <IconButton
            aria-label='Information related to selected list'
            color={handleReturnColor(color)}
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={InfoIcon}
            onClick={() => onInfo()}
            size='sm'
          />
        ) : (
          <Button
            color={handleReturnColor(color)}
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            leftIcon={InfoIcon}
            onClick={() => onInfo()}>
            Info
          </Button>
        )}

        {isSm ? (
          <IconButton
            aria-label='Edit selected list'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={EditIcon}
            onClick={() => onEdit()}
            size='sm'
          />
        ) : (
          <Button colorMode={colorMode === 'light' ? 'dark' : 'light'} leftIcon={EditIcon} onClick={() => onEdit()}>
            Edit
          </Button>
        )}

        {isSm ? (
          <IconButton
            aria-label='Delete selected list'
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={TrashIcon}
            onClick={() => onDelete()}
            size='sm'
          />
        ) : (
          <Button
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            leftIcon={TrashIcon}
            onClick={() => onDelete()}>
            Delete
          </Button>
        )}
      </HStack>

      <IconButton
        aria-label='Close'
        colorMode={colorMode === 'light' ? 'dark' : 'light'}
        icon={XIcon}
        onClick={() => onClose()}
        size={isSm ? 'sm' : 'md'}
        variant='icon'
      />
    </HStack>
  );
};

export default Toast;
