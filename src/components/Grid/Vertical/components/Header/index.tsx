import React, { ReactElement } from 'react';

import { useColorMode, useMediaQuery, Stack, Text, Collapse } from '@chakra-ui/react';

import { VerticalGridProps } from '../../types';

const Header = ({ title, header }: Omit<VerticalGridProps, 'children'>): ReactElement => {
  const { colorMode } = useColorMode();
  const [isSm] = useMediaQuery('(max-width: 640px)');

  const headerTotal = header?.props?.children?.props?.children?.length || 0;

  return (
    <Collapse in={Boolean(title || header)} style={{ width: '100%' }} unmountOnExit>
      <Stack
        width='100%'
        direction={isSm && headerTotal > 1 ? 'column' : 'row'}
        alignItems={isSm && headerTotal > 1 ? 'stretch' : 'center'}
        justify={title ? 'space-between' : 'flex-end'}
        wrap='wrap'
        spacing={2}
        p={[2]}>
        {title ? (
          <Text
            align='left'
            color={colorMode === 'light' ? 'gray.900' : 'gray.50'}
            fontSize='2xl'
            fontWeight='semibold'
            textTransform='capitalize'>
            {title}
          </Text>
        ) : null}

        {header}
      </Stack>
    </Collapse>
  );
};

export default Header;
