import { ReactElement } from 'react';

import { useTheme, useColorMode, useMediaQuery, Stack, HStack, Text } from '@chakra-ui/react';
import _ from 'lodash';

import { useSelector } from '../../../../../../../common/hooks';
import { handleReturnDummyWidths } from '../../../../../../../common/utils';
import Link from '../../../../../../../components/Clickable/Link';
import HorizontalScroll from '../../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../theme/types';
import Label from '../../../../../components/Details/components/Label';
import { InfoProps, List } from './types';

const dummyTextWidths = handleReturnDummyWidths(200, 4);

const Info = (props: InfoProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const color = useSelector((state) => state.user.ui.theme.color);

  const { createdBy, languages, originalLanguage, status, isLoading = true } = props;

  const renderInfo: List[] = [
    {
      label: 'Created By',
      children: (
        <HorizontalScroll isLoading={isLoading}>
          <HStack
            divider={
              <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' pr={0.75}>
                ,
              </Text>
            }>
            {[...(!isLoading ? createdBy || [] : _.range(0, 2))].map((person, index) => (
              <Link
                key={typeof person !== 'number' ? person.id : index}
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
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ color: `${color}.${colorMode === 'light' ? 500 : 400}` }}>
                    {typeof person !== 'number' ? person.name : 'Lorem Ipsum'}
                  </Text>
                </SkeletonText>
              </Link>
            ))}
          </HStack>
        </HorizontalScroll>
      )
    },
    {
      label: (languages?.length || 0) > 1 ? 'Original Language' : 'Language',
      children: (
        <SkeletonText
          width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
          offsetY={8}
          isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
            {languages?.find((language) => language.iso_639_1 === originalLanguage)?.english_name || 'N/A'}
          </Text>
        </SkeletonText>
      )
    },
    {
      label: 'Other Languages',
      children:
        (languages?.length || 0) > 1 ? (
          <HorizontalScroll isLoading={isLoading}>
            <HStack
              divider={
                <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='sm' pr={0.75}>
                  ,
                </Text>
              }>
              {languages
                ?.filter((language) => language.iso_639_1 !== originalLanguage)
                ?.map((language, index) => (
                  <SkeletonText
                    key={index}
                    width={
                      isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'
                    }
                    offsetY={8}
                    isLoaded={!isLoading}>
                    <Text
                      align='left'
                      color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                      fontSize='md'
                      whiteSpace='nowrap'>
                      {language.english_name || ''}
                    </Text>
                  </SkeletonText>
                ))}
            </HStack>
          </HorizontalScroll>
        ) : undefined
    },
    {
      label: 'Status',
      children: (
        <SkeletonText
          width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
          offsetY={8}
          isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
            {status || 'N/A'}
          </Text>
        </SkeletonText>
      )
    }
  ];

  const handleMaxWidth = (): string => {
    let elements = 3;

    if ((languages?.length || 0) > 1) {
      elements = elements + 1;
    }

    return `${100 / elements}%`;
  };

  return (
    <Stack
      width='100%'
      maxWidth='100%'
      justifyContent='stretch'
      direction={isSm ? 'column' : 'row'}
      spacing={isSm ? 2 : 4}>
      {renderInfo.map((item, index) =>
        item.children ? (
          <Label
            key={index}
            width={isSm ? '100%' : 'auto'}
            maxWidth={isSm ? '100%' : !isLoading ? handleMaxWidth() : `${100 / 4}%`}
            flex={1}
            label={item.label}>
            {item.children}
          </Label>
        ) : null
      )}
    </Stack>
  );
};

export default Info;
