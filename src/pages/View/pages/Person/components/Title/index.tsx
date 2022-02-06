import React, { ReactElement, useState } from 'react';

import { Text } from '@chakra-ui/react';
import _ from 'lodash';

import SkeletonText from '../../../../../../components/Skeleton/Text';
import Title from '../../../../components/Title';
import Department from './components/Department';
import { PersonTitleProps } from './types';

const dummies = _.range(25, 75, 10);

const PersonTitle = (props: PersonTitleProps): ReactElement => {
  const { person, departments = [], isLoading = true } = props;

  const [dummy] = useState<number>(_.sample(dummies) || 75);

  return (
    <Title
      renderTitle={({ color, fontSize, fontWeight }) => (
        <SkeletonText width={isLoading ? `${dummy}%` : 'auto'} fontSize={fontSize} isLoaded={!isLoading}>
          <Text align='left' color={color} fontSize={fontSize} fontWeight={fontWeight}>
            {person?.name || 'Person Name'}
          </Text>
        </SkeletonText>
      )}
      renderSubtitles={({ color, fontSize }) =>
        !isLoading
          ? departments.map((department) => (
              <Department
                key={department}
                department={department}
                color={color}
                fontSize={fontSize}
                isLoading={false}
              />
            ))
          : _.range(0, 5).map((_dummy, index) => <Department key={index} color={color} fontSize={fontSize} isLoading />)
      }
      isLoading={isLoading}
    />
  );
};

export default PersonTitle;
