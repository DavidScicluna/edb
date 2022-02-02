import { ReactElement } from 'react';

import { useMediaQuery } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnDummyWidths } from '../../../../../../common/utils';
import Button from '../../../../../Clickable/Button';
import SkeletonText from '../../../../../Skeleton/Text';
import { CertificationProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 4);

const Certification = (props: CertificationProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { certification, meaning, order, isActive = false, isLoading = true, onClick } = props;

  return (
    <Button
      color={isActive ? color : 'gray'}
      renderRightIcon={isActive ? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} /> : undefined}
      onClick={onClick ? () => onClick({ certification, meaning, order }) : undefined}
      isDisabled={isLoading}
      size={isSm ? 'sm' : 'md'}
      variant='outlined'
    >
      <SkeletonText
        width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
        fontSize={isSm ? 'xs' : 'sm'}
        isLoaded={!isLoading}
      >
        {certification || 'Certification'}
      </SkeletonText>
    </Button>
  );
};

export default Certification;
