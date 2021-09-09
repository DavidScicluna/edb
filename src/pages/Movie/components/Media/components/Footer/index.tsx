import React, { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

import { useSelector } from '../../../../../../common/hooks';
import utils from '../../../../../../common/utils/utils';
import Button from '../../../../../../components/Clickable/Button';
import { FooterProps } from './types';

const Footer = (props: FooterProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { activeIndex, name, isDisabled, onClick } = props;

  const handleReturnLabel = (): string => {
    switch (activeIndex) {
      case 0:
        return 'photos';
      case 1:
        return 'backdrops';
      case 2:
        return 'videos';
      default:
        return '';
    }
  };

  return (
    <Button
      color={utils.handleReturnColor(color)}
      isFullWidth
      isDisabled={isDisabled}
      onClick={onClick ? () => onClick() : undefined}
      size={isSm ? 'sm' : 'md'}
      variant='text'>
      {`View all ${name ? `"${name}"` : ''} ${handleReturnLabel()}`}
    </Button>
  );
};

export default Footer;
