import React, { ReactElement } from 'react';

import { useColorMode, HStack, Text } from '@chakra-ui/react';
import moment from 'moment';

import ReviewButton from './components/ReviewButton';
import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
  const { colorMode } = useColorMode();

  const { review } = props;
  const { updated_at, created_at } = review || {};

  const hasUpdated = updated_at && !moment(updated_at).isSame(created_at);

  return (
    <HStack width='100%' justifyContent={hasUpdated ? 'space-between' : 'flex-end'}>
      {hasUpdated ? (
        <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
          {`* Updated on: ${moment(updated_at).format('LLL')}`}
        </Text>
      ) : undefined}

      <HStack spacing={0}>
        <ReviewButton review={review} state='isLiked' label='Like' />
        <ReviewButton review={review} state='isDisliked' label='Dislike' />
      </HStack>
    </HStack>
  );
};

export default Footer;
