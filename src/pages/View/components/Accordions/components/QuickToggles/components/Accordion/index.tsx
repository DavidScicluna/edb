import React, { ReactElement, useState } from 'react';

import _ from 'lodash';
import { Link } from 'react-scroll';

import { useSelector } from '../../../../../../../../common/hooks';
import Button from '../../../../../../../../components/Clickable/Button';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { AccordionProps } from './types';

const dummies = _.range(25, 200, 5);

const Accordion = (props: AccordionProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { id, title, isLoading = true, isDisabled = false, onToggle } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='xs' isLoaded={!isLoading}>
      <Link to={!isDisabled && id ? id : ''} spy smooth isDynamic={false} offset={-82} delay={500}>
        <Button
          color={color}
          onClick={!isLoading && !isDisabled && onToggle ? () => onToggle() : undefined}
          isDisabled={isLoading}
          size='sm'
          variant='text'
          sx={{ front: { px: 0 } }}
        >
          {title || 'Accordion Title'}
        </Button>
      </Link>
    </SkeletonText>
  );
};

export default Accordion;