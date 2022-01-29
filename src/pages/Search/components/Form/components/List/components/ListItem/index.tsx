import { ReactElement, useState } from 'react';

import { useTheme, useColorMode, ListItem as CUIListItem, VStack, Text, HStack } from '@chakra-ui/react';
import _ from 'lodash';

import { handleReturnDummyWidths } from '../../../../../../../../common/utils';
import SkeletonText from '../../../../../../../../components/Skeleton/Text';
import { Theme } from '../../../../../../../../theme/types';
import useStyles from './styles';
import { ListItemProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const ListItem = (props: ListItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { title, subtitle, badge, actions, isLoading = true, variant = 'contained', ...rest } = props;

  const [dummyTextWidth] = useState<string>(`${_.sample(dummyTextWidths)}%`);

  const style = useStyles(theme, { variant, isLoading });

  return (
    <CUIListItem {...rest} px={2} py={1} sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <VStack alignItems='flex-start' justifyContent='center' spacing={0}>
        <HStack>
          <SkeletonText width={isLoading ? dummyTextWidth : 'auto'} fontSize='md' isLoaded={!isLoading}>
            <Text align='left' color={colorMode === 'light' ? 'gray.900' : 'gray.50'} fontSize='md' whiteSpace='nowrap'>
              {title}
            </Text>
          </SkeletonText>
          {badge ? badge : null}
        </HStack>
        {subtitle ? (
          <SkeletonText
            width={isLoading ? `${_.sample(dummyTextWidths)}%` : 'auto'}
            fontSize='xs'
            isLoaded={!isLoading}
          >
            <Text
              align='left'
              color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
              fontSize='xs'
              whiteSpace='nowrap'
            >
              {subtitle}
            </Text>
          </SkeletonText>
        ) : null}
      </VStack>

      {actions ? actions : null}
    </CUIListItem>
  );
};

export default ListItem;
