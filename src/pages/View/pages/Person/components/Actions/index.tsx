import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import _ from 'lodash';

import Button from '../../../../../../components/Clickable/Button';
import Like, { handleReturnIcon } from '../../../../../../components/Clickable/Like';
import { ActionsProps } from './types';

const Actions = ({ person, isLoading = true }: ActionsProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  return (
    <Like
      renderButton={({ isLiked, onClick }) => (
        <Button
          color={isLiked ? 'red' : 'gray'}
          renderLeftIcon={({ fontSize }) => handleReturnIcon(isLiked, fontSize)}
          isFullWidth={isSm}
          isDisabled={isLoading || _.isNil(person) || _.isEmpty(person)}
          onClick={() => onClick()}
          size='md'
          variant='outlined'
        >
          {isLiked ? 'Liked' : 'Like'}
        </Button>
      )}
      mediaType='person'
      mediaItem={person}
    />
  );
};

export default Actions;
