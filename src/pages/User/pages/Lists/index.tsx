import { ReactElement, useState, useEffect } from 'react';

import { useMediaQuery, useDisclosure, useToast, VStack, Collapse, Fade, Center } from '@chakra-ui/react';
import { InfoTwoTone as InfoTwoToneIcon } from '@material-ui/icons';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import moment from 'moment';

import { useSelector } from '../../../../common/hooks';
import Button from '../../../../components/Clickable/Button';
import IconButton from '../../../../components/Clickable/IconButton';
import Divider from '../../../../components/Divider';
import Empty from '../../../../components/Empty';
import Tabs from '../../../../components/Tabs';
import TabPanels from '../../../../components/Tabs/components/TabPanels';
import Page from '../../../../containers/Page';
import { List as ListType } from '../../../../store/slices/User/types';
import CreateList from './components/CreateList';
import DeleteList from './components/DeleteList';
import EditList from './components/EditList';
import ListHeader from './components/ListHeader';
import ListInfo from './components/ListInfo';
import ListPicker from './components/ListPicker';
import MediaTypesSection from './components/MediaTypesSection';
import Toast from './components/Toast';

const Lists = (): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { isOpen: isCreateListOpen, onOpen: onCreateListOpen, onClose: onCreateListClose } = useDisclosure();
  const { isOpen: isDeleteListOpen, onOpen: onDeleteListOpen, onClose: onDeleteListClose } = useDisclosure();
  const { isOpen: isEditListOpen, onOpen: onEditListOpen, onClose: onEditListClose } = useDisclosure();
  const { isOpen: isListInfoOpen, onOpen: onListInfoOpen, onClose: onListInfoClose } = useDisclosure();

  const toast = useToast();

  const lists = useSelector((state) => state.user.data.lists);

  const [selectedList, setSelectedList] = useState<ListType>();
  const [activeTab, setActiveTab] = useState<number>();

  const handleSelectList = (id: ListType['id']): void => {
    if (selectedList && selectedList.id === id) {
      setSelectedList(undefined);
    } else {
      setSelectedList(lists.find((list) => list.id === id));
    }
  };

  const handleOpenList = (index: number): void => {
    setActiveTab(index);
  };

  const handleCloseToast = (): void => {
    toast.closeAll();
    setSelectedList(undefined);
  };

  useEffect(() => {
    if (_.isNil(activeTab)) {
      toast.closeAll();

      if (selectedList) {
        toast({
          duration: null,
          isClosable: true,
          position: 'bottom',
          variant: 'solid',
          render: () => {
            return (
              <Toast
                selected={selectedList}
                onEdit={() => onEditListOpen()}
                onDelete={() => onDeleteListOpen()}
                onClose={() => handleCloseToast()}
              />
            );
          }
        });
      }
    }
  }, [selectedList]);

  useEffect(() => {
    if (lists.length === 0) {
      setActiveTab(undefined);
      setSelectedList(undefined);
    }
  }, [lists]);

  useEffect(() => {
    return () => {
      toast.closeAll();

      setActiveTab(undefined);
      setSelectedList(undefined);
    };
  }, []);

  return (
    <>
      <Page title='Lists'>
        {{
          actions: (
            <Button onClick={() => onCreateListOpen()} isFullWidth={isSm} variant='outlined'>
              Create new list
            </Button>
          ),
          body: (
            <Tabs activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}>
              <VStack
                width='100%'
                divider={lists && lists.length > 0 ? <Divider orientation='horizontal' /> : undefined}
                spacing={2}
                p={2}
              >
                <Collapse in={lists && lists.length > 0} unmountOnExit style={{ width: '100%' }}>
                  <ListHeader activeTab={activeTab} lists={lists} onListsClick={() => setActiveTab(undefined)} />
                </Collapse>

                {lists.length === 0 ? (
                  <Empty
                    hasIllustration
                    label='Oh no! No Lists were found.'
                    description='Unfortunately, you have no lists. Please add a list to be able to add items.'
                    size='xl'
                    variant='outlined'
                  />
                ) : (
                  <AnimatePresence exitBeforeEnter initial={false}>
                    {_.isNil(activeTab) ? (
                      <Center as={Fade} key='list-picker' width='100%' in unmountOnExit>
                        <ListPicker
                          lists={lists}
                          selected={selectedList}
                          onSelected={handleSelectList}
                          onOpenList={handleOpenList}
                        />
                      </Center>
                    ) : null}
                    {!_.isNil(activeTab) ? (
                      <Center as={Fade} key='list-tab-panels' width='100%' in unmountOnExit>
                        <TabPanels>
                          {_.orderBy(lists, (list) => moment(list.date), ['desc']).map((list) => (
                            <MediaTypesSection
                              key={list.id}
                              movies={list.results.movies}
                              tv={list.results.tv}
                              renderActions={() => (
                                <IconButton
                                  aria-label='Open Information modal'
                                  onClick={() => {
                                    handleSelectList(list.id);
                                    onListInfoOpen();
                                  }}
                                  variant='outlined'
                                >
                                  <InfoTwoToneIcon />
                                </IconButton>
                              )}
                            />
                          ))}
                        </TabPanels>
                      </Center>
                    ) : null}
                  </AnimatePresence>
                )}
              </VStack>
            </Tabs>
          )
        }}
      </Page>

      <CreateList isOpen={isCreateListOpen} onSubmit={() => setActiveTab(0)} onClose={onCreateListClose} />

      {lists && lists.length > 0 && selectedList ? (
        <DeleteList
          list={selectedList}
          isOpen={isDeleteListOpen}
          onClose={onDeleteListClose}
          onCloseToast={handleCloseToast}
        />
      ) : null}

      {lists && lists.length > 0 && selectedList ? (
        <EditList list={selectedList} isOpen={isEditListOpen} onClose={onEditListClose} />
      ) : null}

      {lists && lists.length > 0 && selectedList ? (
        <ListInfo list={selectedList} isOpen={isListInfoOpen} onClose={onListInfoClose} />
      ) : null}
    </>
  );
};

export default Lists;
