import React, { ReactElement, useEffect } from 'react';

import { useColorMode, useDisclosure, VStack } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import useSelector from '../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../common/utils/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import { setTheme, toggleDisplay } from '../../../../../store/slices/User';
import { Theme } from '../../../../../store/slices/User/types';
import Background from './components/Background';
import Color from './components/Color';

const Display = (): ReactElement => {
  const { toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const isDisplayModalOpen = useSelector((state) => state.user.ui.isDisplayModalOpen);
  const theme = useSelector((state) => state.user.ui.theme);

  const form = useForm<Theme>({ defaultValues: { ...theme } });
  const color = form.watch('color');

  const { isDirty, dirtyFields } = useFormState({ control: form.control });

  const handleSubmit = (newTheme: Theme): void => {
    if (dirtyFields.background) {
      toggleColorMode();
    }

    form.reset({ ...newTheme });

    dispatch(setTheme(newTheme));

    handleClose();
  };

  const handleClose = (): void => {
    form.reset({ ...theme });

    dispatch(toggleDisplay(false));

    onClose();
  };

  useEffect(() => {
    if (isDisplayModalOpen) {
      onOpen();
    } else {
      handleClose();
    }
  }, [isDisplayModalOpen]);

  return (
    <Modal
      title='Edit Application Theme'
      actions={
        <Button
          color={utils.handleReturnColor(color)}
          isDisabled={!isDirty}
          onClick={form.handleSubmit((values) => handleSubmit(values))}
          size='xs'>
          Save
        </Button>
      }
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size='2xl'>
      <VStack spacing={2} p={2}>
        <Color form={form} />
        <Background form={form} />
      </VStack>
    </Modal>
  );
};

export default Display;
