import React, { ReactElement, useState } from 'react';

import { useTheme, useColorMode, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../../../../../../common/hooks';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import SkeletonText from '../../../../../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../../../../../theme/types';
import { PersonProps } from './types';

const dummies = _.range(25, 100, 20);

const Person = ({ person, isLoading = true }: PersonProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const [dummy] = useState<number>(_.sample(dummies) || 50);

  return (
    <Link to={{ pathname: `/person/${person?.id}` }} isDisabled={isLoading}>
      <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='md'
          whiteSpace='nowrap'
          textDecorationStyle='wavy'
          textDecorationLine='underline'
          textDecorationThickness='auto'
          textDecorationColor={color}
          sx={{
            transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
          }}
          _focus={{ boxShadow: 'none' }}
          _hover={{ color: `${color}.${colorMode === 'light' ? 400 : 500}` }}
        >
          {person?.name || 'Person Name'}
        </Text>
      </SkeletonText>
    </Link>
  );
};

export default Person;
