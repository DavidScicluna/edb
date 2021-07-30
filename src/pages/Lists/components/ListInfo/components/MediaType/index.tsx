import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, HStack, Text, Icon, useMediaQuery } from '@chakra-ui/react';
import { TheatersOutlined as TheatersOutlinedIcon, TvOutlined as TvOutlinedIcon } from '@material-ui/icons/';
import _ from 'lodash';

import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { MediaTypeProps } from './types';

const MediaType = (props: MediaTypeProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const [isMob] = useMediaQuery('(max-width: 640px)');

  const style = useStyles(props);

  const { mediaType, amount } = props;

  const handleReturnTitle = (): string => {
    switch (mediaType) {
      case 'movie':
        return `Movie${amount === 0 || amount > 1 ? 's' : ''}`;
      case 'tv':
        return `TV Show${amount === 0 || amount > 1 ? 's' : ''}`;
      default:
        return '';
    }
  };

  return (
    <VStack
      width={isMob ? `${screen.width - 32}px` : `${400 / 2}px`}
      height={isMob ? `${screen.width - 32}px` : `${400 / 2}px`}
      alignItems='flex-start'
      justifyContent='space-between'
      spacing={0}
      sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <HStack spacing={0.75}>
        <Icon aria-label={handleReturnTitle()} as={mediaType === 'movie' ? TheatersOutlinedIcon : TvOutlinedIcon} />
        <Text align='left' fontSize='md' fontWeight='semibold'>
          {handleReturnTitle()}
        </Text>
      </HStack>
      <Text align='left' fontSize='6xl' fontWeight='bold' lineHeight={theme.fontSizes['5xl']}>
        {amount}
      </Text>
    </VStack>
  );
};

export default MediaType;
