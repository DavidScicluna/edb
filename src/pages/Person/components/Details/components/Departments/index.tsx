import React, { ReactElement, Fragment } from 'react';

import { useTheme, useColorMode, HStack, Text, SlideFade } from '@chakra-ui/react';
import _ from 'lodash';

import utils from '../../../../../../common/utils/utils';
import HorizontalScroll from '../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../theme/types';
import { DepartmentsProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(200, 4);

const Departments = (props: DepartmentsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { departments, isLoading = false } = props;

  return (
    <HStack maxWidth='100%' spacing={isLoading ? 1 : 0}>
      {!isLoading ? (
        <HorizontalScroll>
          <>
            {departments.map((department, index) => (
              <Fragment key={index}>
                <SlideFade
                  in
                  offsetY={9.5}
                  delay={utils.handleReturnNumberFromString(theme.transition.duration['faster'], 'ms') / 250}>
                  <Text
                    align='left'
                    color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
                    fontSize='md'
                    whiteSpace='nowrap'>
                    {department}
                  </Text>
                </SlideFade>

                {index < departments.length - 1 ? (
                  <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
                    •
                  </Text>
                ) : null}
              </Fragment>
            ))}
          </>
        </HorizontalScroll>
      ) : (
        _.range(0, 4).map((_dummy, index) => (
          <Fragment key={index}>
            <SkeletonText
              width={`${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px`}
              height='19px'
              offsetY={9.5}
            />

            {index < 3 ? (
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='md'>
                •
              </Text>
            ) : null}
          </Fragment>
        ))
      )}
    </HStack>
  );
};

export default Departments;
