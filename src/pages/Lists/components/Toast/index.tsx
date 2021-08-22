import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, HStack, Text } from '@chakra-ui/react';
import {
  InfoTwoTone as InfoTwoToneIcon,
  EditOutlined as EditOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon
} from '@material-ui/icons';

import utils from '../../../../common/utils/utils';
import Button from '../../../../components/Clickable/Button';
import IconButton from '../../../../components/Clickable/IconButton';
import store from '../../../../store';
import { ToastProps } from './types';

const Toast = (props: ToastProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 480px)');

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
            color={utils.handleReturnColor(color)}
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={InfoTwoToneIcon}
            onClick={() => onInfo()}
            size='sm'
          />
        ) : (
          <Button
            color={utils.handleReturnColor(color)}
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            leftIcon={InfoTwoToneIcon}
            onClick={() => onInfo()}>
            Info
          </Button>
        )}

        {isSm ? (
          <IconButton
            aria-label='Edit selected list'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={EditOutlinedIcon}
            onClick={() => onEdit()}
            size='sm'
          />
        ) : (
          <Button
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            leftIcon={EditOutlinedIcon}
            onClick={() => onEdit()}>
            Edit
          </Button>
        )}

        {isSm ? (
          <IconButton
            aria-label='Delete selected list'
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            icon={DeleteOutlineOutlinedIcon}
            onClick={() => onDelete()}
            size='sm'
          />
        ) : (
          <Button
            color='red'
            colorMode={colorMode === 'light' ? 'dark' : 'light'}
            leftIcon={DeleteOutlineOutlinedIcon}
            onClick={() => onDelete()}>
            Delete
          </Button>
        )}
      </HStack>

      <IconButton
        aria-label='Close'
        colorMode={colorMode === 'light' ? 'dark' : 'light'}
        icon={CloseOutlinedIcon}
        onClick={() => onClose()}
        size={isSm ? 'sm' : 'md'}
        variant='icon'
      />
    </HStack>
  );
};

export default Toast;
