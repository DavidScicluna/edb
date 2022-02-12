import React, { ReactElement, useState } from 'react';

import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { AssetProps } from './types';

const dummies = _.range(25, 200, 5);

const Asset = (props: AssetProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { asset, isLoading = true, isDisabled = false, onTogglePanel } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
      <Link to={!isDisabled && asset ? asset : ''} spy smooth isDynamic={false} offset={-82} delay={1000}>
        <Button
          color={color}
          onClick={!isLoading && !isDisabled ? () => onTogglePanel() : undefined}
          isDisabled={isLoading}
          size='sm'
          variant='text'
          sx={{ front: { px: 0 } }}
        >
          {asset || 'Asset Name'}
        </Button>
      </Link>
    </SkeletonText>
  );
};

export default Asset;
