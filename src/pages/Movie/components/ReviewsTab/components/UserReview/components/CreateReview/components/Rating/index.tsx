import React, { ReactElement, useState } from 'react';

import { HStack } from '@chakra-ui/react';
import _ from 'lodash';

import Star from './components/Star';
import { RatingProps } from './types';

const Rating = ({ name, onChange, value }: RatingProps): ReactElement => {
  const [hoveringNumber, setHoveringNumber] = useState<number>(0);

  return (
    <HStack width='100%' aria-label={name} justifyContent='space-between' spacing={0}>
      {_.range(1, 11).map((star, index) => (
        <Star
          key={index}
          value={star}
          hoveringNumber={hoveringNumber}
          isChecked={star === value || star < value}
          onChange={onChange}
          onHover={(value: number) => setHoveringNumber(value)}
        />
      ))}
    </HStack>
  );
};

export default Rating;
