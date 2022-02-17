import { ReactElement } from 'react';

import { useMediaQuery, useConst } from '@chakra-ui/react';

import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import _ from 'lodash';

import { GenreProps } from './types';

import { useSelector } from '../../../../../../common/hooks';
import Button from '../../../../../Clickable/Button';
import SkeletonText from '../../../../../Skeleton/Text';

const dummies = _.range(25, 100, 10);

const Genre = ({ id, name, isActive = false, isLoading = true, onClick }: GenreProps): ReactElement => {
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const dummy = useConst<number>(_.sample(dummies) || 100);

  return (
    <Button
      color={isActive ? color : 'gray'}
      renderRightIcon={isActive ? ({ fontSize }) => <CheckOutlinedIcon style={{ fontSize }} /> : undefined}
      onClick={onClick ? () => onClick({ id, name }) : undefined}
      isDisabled={isLoading}
      size={isSm ? 'sm' : 'md'}
      variant='outlined'
    >
      <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize={isSm ? 'xs' : 'sm'} isLoaded={!isLoading}>
        {name || 'Genre'}
      </SkeletonText>
    </Button>
  );
};

export default Genre;
