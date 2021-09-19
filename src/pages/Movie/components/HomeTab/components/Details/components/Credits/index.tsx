import React, { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Stack, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../../common/hooks';
import { handleReturnDummyWidths } from '../../../../../../../../common/utils';
import Link from '../../../../../../../../components/Clickable/Link';
import HorizontalScroll from '../../../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../theme/types';
import Label from '../Label';
import { CreditsProps, Credit } from './types';

const dummyTextWidths = handleReturnDummyWidths(200, 4);

const Credits = (props: CreditsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { directors, executiveProducer, producers, writers, isLoading = true } = props;

  const renderCredits: Credit[] = [
    {
      label: `Director${(directors?.length || 0) > 1 ? 's' : ''}`,
      data: directors || []
    },
    {
      label: `Executive Producer${(executiveProducer?.length || 0) > 1 ? 's' : ''}`,
      data: executiveProducer || []
    },
    {
      label: `Producer${(producers?.length || 0) > 1 ? 's' : ''}`,
      data: producers || []
    },
    {
      label: `Writer${(writers?.length || 0) > 1 ? 's' : ''}`,
      data: writers || []
    }
  ];

  const handleMaxWidth = (): string => {
    let elements = 0;

    renderCredits.forEach((credit) => {
      if (credit.data.length > 0) {
        elements = elements + 1;
      }
    });

    return `${100 / elements}%`;
  };

  return (
    <Stack
      width='100%'
      maxWidth='100%'
      justifyContent='stretch'
      direction={isSm ? 'column' : 'row'}
      spacing={isSm ? 2 : 4}>
      {renderCredits.map((credit, index) =>
        isLoading || credit.data.length > 0 ? (
          <Label
            key={index}
            width={isSm ? '100%' : 'auto'}
            maxWidth={isSm ? '100%' : !isLoading ? handleMaxWidth() : `${100 / 4}%`}
            flex={1}
            label={credit.label}>
            <HorizontalScroll isLoading={isLoading}>
              <HStack
                wrap='nowrap'
                divider={
                  <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' pr={0.75}>
                    ,
                  </Text>
                }>
                {[...(!isLoading ? credit.data : _.range(0, 2))].map((person, index) => (
                  <Link
                    key={index}
                    to={typeof person !== 'number' ? { pathname: `/person/${person.id}` } : {}}
                    isDisabled={isLoading}
                    whiteSpace='nowrap'>
                    <SkeletonText
                      width={
                        isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'
                      }
                      offsetY={8}
                      isLoaded={!isLoading}>
                      <Text
                        align='left'
                        color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                        fontSize='md'
                        sx={{
                          transition: `${theme.transition.duration.faster} ${theme.transition.easing['ease-out']}`
                        }}
                        _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}>
                        {typeof person !== 'number' ? person.name : 'Lorem Ipsum'}
                      </Text>
                    </SkeletonText>
                  </Link>
                ))}
              </HStack>
            </HorizontalScroll>
          </Label>
        ) : null
      )}
    </Stack>
  );
};

export default Credits;
