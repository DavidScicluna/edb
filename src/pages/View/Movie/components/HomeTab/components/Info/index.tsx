import { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Stack, HStack, Text } from '@chakra-ui/react';

import { handleReturnDummyWidths, handleFormatMoney } from '../../../../../../../common/utils';
import HorizontalScroll from '../../../../../../../components/HorizontalScroll';
import SkeletonText from '../../../../../../../components/Skeleton/Text';
import Label from '../../../../../components/Details/components/Label';
import { InfoProps, List } from './types';

const dummyTextWidths = handleReturnDummyWidths(200, 4);

const Info = (props: InfoProps): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 600px)');

  const { budget, revenue, languages, originalLanguage, isLoading = true } = props;

  const renderInfo: List[] = [
    {
      label: 'Budget',
      children: (
        <SkeletonText offsetY={8} isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
            {budget ? `$${handleFormatMoney(budget)}` : isLoading ? '1,000,000' : 'N/A'}
          </Text>
        </SkeletonText>
      )
    },
    {
      label: 'Revenue',
      children: (
        <SkeletonText offsetY={8} isLoaded={!isLoading}>
          <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
            {revenue ? `$${handleFormatMoney(revenue)}` : isLoading ? '1,000,000' : 'N/A'}
          </Text>
        </SkeletonText>
      )
    },
    {
      label: (languages?.length || 0) > 1 ? 'Original Language' : 'Language',
      children: (
        <SkeletonText
          width={isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'}
          offsetY={8}
          isLoaded={!isLoading}
        >
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
              }
            >
              {languages
                ?.filter((language) => language.iso_639_1 !== originalLanguage)
                ?.map((language, index) => (
                  <SkeletonText
                    key={index}
                    width={
                      isLoading ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}px` : 'auto'
                    }
                    offsetY={8}
                    isLoaded={!isLoading}
                  >
                    <Text
                      align='left'
                      color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
                      fontSize='md'
                      whiteSpace='nowrap'
                    >
                      {language.english_name || ''}
                    </Text>
                  </SkeletonText>
                ))}
            </HStack>
          </HorizontalScroll>
        ) : undefined
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
      spacing={isSm ? 2 : 4}
    >
      {renderInfo.map((item, index) =>
        item.children ? (
          <Label
            key={index}
            width={isSm ? '100%' : 'auto'}
            maxWidth={isSm ? '100%' : !isLoading ? handleMaxWidth() : `${100 / 4}%`}
            flex={1}
            label={item.label}
          >
            {item.children}
          </Label>
        ) : null
      )}
    </Stack>
  );
};

export default Info;
