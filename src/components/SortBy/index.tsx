import { ReactElement } from 'react';

import { useDisclosure, HStack, VStack, Fade } from '@chakra-ui/react';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import { useForm, useFormState } from 'react-hook-form';

import { useSelector } from '../../common/hooks';
import Modal from '../../components/Modal';
import Button from '../Clickable/Button';
import Direction from './components/Direction';
import Sort from './components/Sort';
import { SortByProps, Form } from './types';

const SortBy = (props: SortByProps): ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { defaultValues, sortBy, renderToggleModal, onSort } = props;

  const form = useForm<Form>({ defaultValues });

  const { isDirty } = useFormState({ control: form.control });

  const handleSubmit = (values: Form): void => {
    onSort({ ...values });

    onClose();

    setTimeout(() => form.reset({ ...values }), 250);
  };

  const handleClose = (): void => {
    form.reset({ ...defaultValues });
    onClose();
  };

  return (
    <>
      {renderToggleModal({
        color: isOpen ? color : 'gray',
        icon: <ImportExportOutlinedIcon />,
        onClick: () => onOpen()
      })}

      <Modal
        title='Sort By'
        renderActions={({ color, colorMode, size }) => (
          <HStack spacing={2}>
            <Fade in unmountOnExit>
              <Button
                color={color}
                colorMode={colorMode}
                // isDisabled={!isDirty}
                onClick={() => form.reset({ ...defaultValues })}
                size={size}
                variant='text'
              >
                Reset
              </Button>
            </Fade>
            <Button
              color={color}
              colorMode={colorMode}
              isDisabled={!isDirty}
              onClick={form.handleSubmit((values) => handleSubmit(values))}
              size={size}
            >
              Search
            </Button>
          </HStack>
        )}
        isOpen={isOpen}
        onClose={handleClose}
        isCentered
        size='3xl'
      >
        <VStack width='100%' spacing={2} p={2}>
          <Direction form={form} />
          <Sort form={form} sortBy={sortBy} />
        </VStack>
      </Modal>
    </>
  );
};

export default SortBy;
