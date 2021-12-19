import { ReactElement } from 'react';

import { useColorMode, VStack } from '@chakra-ui/react';
import { useForm, useFormState } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../common/hooks';
import { handleReturnColor } from '../../../../../common/utils';
import Button from '../../../../../components/Clickable/Button';
import Modal from '../../../../../components/Modal';
import { toggleDisplay, toggleSplashscreen } from '../../../../../store/slices/Modals';
import { setTheme } from '../../../../../store/slices/User';
import { Theme } from '../../../../../store/slices/User/types';
import Background from './components/Background';
import Color from './components/Color';

const Display = (): ReactElement => {
  const { toggleColorMode } = useColorMode();

  const dispatch = useDispatch();
  const isDisplayModalOpen = useSelector((state) => state.modals.ui.isDisplayModalOpen);
  const theme = useSelector((state) => state.user.ui.theme);

  const form = useForm<Theme>({ defaultValues: { ...theme } });
  const color = form.watch('color');
  const background = form.watch('background');

  const { isDirty, dirtyFields } = useFormState({ control: form.control });

  const handleSubmit = (newTheme: Theme): void => {
    handleClose();

    dispatch(toggleSplashscreen(true));
    dispatch(setTheme(newTheme));

    form.reset({ ...newTheme });

    if (dirtyFields.background) {
      toggleColorMode();
    }

    setTimeout(() => dispatch(toggleSplashscreen(false)), 5000);
  };

  const handleClose = (): void => {
    form.reset({ ...theme });

    dispatch(toggleDisplay(false));
  };

  return (
    <Modal
      title='Edit Application Theme'
      actions={
        <Button
          colorMode={background}
          color={handleReturnColor(color)}
          isDisabled={!isDirty}
          onClick={form.handleSubmit((values) => handleSubmit(values))}
          size='sm'
        >
          Save
        </Button>
      }
      colorMode={background}
      isOpen={isDisplayModalOpen}
      onClose={handleClose}
      isCentered
      size='2xl'
    >
      <VStack spacing={2} p={2}>
        <Color form={form} />
        <Background form={form} />
      </VStack>
    </Modal>
  );
};

export default Display;
