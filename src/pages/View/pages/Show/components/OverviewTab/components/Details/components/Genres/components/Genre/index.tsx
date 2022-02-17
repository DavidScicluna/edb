import { ReactElement } from 'react';

import { useTheme, useColorMode, useConst, Text } from '@chakra-ui/react';

import _ from 'lodash';
import qs from 'query-string';

import { GenreProps } from './types';

import { useSelector } from '../../../../../../../../../../../../common/hooks';
import Link from '../../../../../../../../../../../../components/Clickable/Link';
import SkeletonText from '../../../../../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../../../../../theme/types';

const dummies = _.range(25, 150, 15);

const Genre = (props: GenreProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const { id, name, isLoading = true } = props;

  const dummy = useConst<number>(_.sample(dummies) || 100);

  return (
    <SkeletonText width={isLoading ? `${dummy}px` : 'auto'} fontSize='md' isLoaded={!isLoading}>
      <Link to={{ pathname: '/movies/', search: qs.stringify({ with_genres: id }) }} isDisabled={isLoading}>
        <Text
          align='left'
          color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
          fontSize='md'
          whiteSpace='nowrap'
          textDecorationStyle='wavy'
          textDecorationLine='underline'
          textDecorationThickness='from-font'
          textDecorationColor={`${color}.${colorMode === 'light' ? 400 : 500}`}
          sx={{
            transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
          }}
          _focus={{ boxShadow: 'none' }}
          _hover={{ color: `${color}.${colorMode === 'light' ? 400 : 500}` }}
        >
          {name || 'Genre'}
        </Text>
      </Link>
    </SkeletonText>
  );
};

export default Genre;
