import React, { ReactElement, useState } from 'react';

import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../../../../../common/hooks';
import Button from '../../../../../../../../../../components/Clickable/Button';
import SkeletonText from '../../../../../../../../../../components/Skeleton/Text';
import { DepartmentProps } from './types';

const dummies = _.range(25, 200, 5);

const Department = (props: DepartmentProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { department = '', isLoading = true, isDisabled = false, onTogglePanel } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
      <Link to={!isDisabled ? department.toLowerCase() : ''} spy smooth isDynamic={false} offset={-82} delay={1000}>
        <Button
          color={color}
          onClick={!isLoading && !isDisabled ? () => onTogglePanel() : undefined}
          isDisabled={isLoading}
          size='sm'
          variant='text'
          sx={{ front: { px: 0 } }}
        >
          {department || 'Lorem'}
        </Button>
      </Link>
    </SkeletonText>
  );
};

export default Department;
