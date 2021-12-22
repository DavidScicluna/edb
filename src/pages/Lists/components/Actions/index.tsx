import { ReactElement } from 'react';

import { useMediaQuery, HStack, VStack, Fade, ScaleFade } from '@chakra-ui/react';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';


import Button from '../../../../components/Clickable/Button';
import IconButton from '../../../../components/Clickable/IconButton';
import Filters from '../../../../components/Filters';
import { ActionsProps } from './types';

const Actions = (props: ActionsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const {
    mediaType,
    lists,
    list,
    movies,
    tv,
    onFilter,
    onMediaTypePickerOpen,
    onListPickerOpen,
    onListInfoOpen,
    onCreateListOpen
  } = props;

  return mediaType || (list && lists.length > 0) ? (
    isSm ? (
      <Fade in={!!mediaType || (!!list && lists.length > 1)} unmountOnExit style={{ width: '100%' }}>
        <VStack width='100%' spacing={2}>
          {mediaType ? (
            <HStack width='100%' spacing={2}>
              {movies.length > 0 && tv.length > 0 ? (
                <Button onClick={() => onMediaTypePickerOpen()} isFullWidth variant='outlined'>
                  Change media-type
                </Button>
              ) : null}
              {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={onFilter} /> : null}
            </HStack>
          ) : null}
          {!!list && lists.length > 1 ? (
            <Button onClick={() => onListPickerOpen()} isFullWidth variant='outlined'>
              Change list
            </Button>
          ) : null}
        </VStack>
      </Fade>
    ) : (
      <HStack spacing={2}>
        <ScaleFade in={!!mediaType} unmountOnExit>
          <HStack spacing={2}>
            {movies.length > 0 && tv.length > 0 ? (
              <Button onClick={() => onMediaTypePickerOpen()} variant='outlined'>
                Change media-type
              </Button>
            ) : null}
            {mediaType ? <Filters mediaType={mediaType} isLikedLists onFilter={onFilter} /> : null}
          </HStack>
        </ScaleFade>
        <ScaleFade in={!!list && lists.length > 1} unmountOnExit>
          <Button onClick={() => onListPickerOpen()} variant='outlined'>
            Change list
          </Button>
        </ScaleFade>
        <ScaleFade in={!!list} unmountOnExit>
          <IconButton
            aria-label='Open Information modal'
            icon={InfoTwoToneIcon}
            onClick={() => onListInfoOpen()}
            variant='outlined'
          />
        </ScaleFade>
      </HStack>
    )
  ) : (
    <Button onClick={() => onCreateListOpen()} isFullWidth={isSm} variant='outlined'>
      Create new list
    </Button>
  );
};

export default Actions;
