import React, { ReactElement } from 'react';

import { useTheme, useColorMode, VStack, IconButton, Box, Icon, Text, ScaleFade } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import _ from 'lodash';

import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';
import useStyles from './styles';
import { ColorItemProps } from './types';

const ColorItem = (props: ColorItemProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const { label, value, isActive, onClick } = props;

  const style = useStyles(theme, value);

  return (
    <Tooltip
      aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      closeOnClick={false}
      closeOnMouseDown={false}
      isDisabled={isActive}
      label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      placement='top'
      span>
      <IconButton
        aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
        isDisabled={isActive}
        onClick={!isActive && onClick ? () => onClick(value) : undefined}
        variant='unstyled'
        sx={{ ..._.merge(style.common.button, style[colorMode].button) }}
        _disabled={{ ..._.merge(style.common.disabled, style[colorMode].disabled) }}>
        <VStack spacing={0.75}>
          <Box sx={{ ..._.merge(style.common.circle) }}>
            <ScaleFade in={isActive} unmountOnExit>
              <Icon as={CheckOutlinedIcon} sx={{ ..._.merge(style.common.icon, style[colorMode].icon) }} />
            </ScaleFade>
          </Box>
          <Text align='center' fontSize='sm' fontWeight='medium'>
            {label}
          </Text>
        </VStack>
      </IconButton>
    </Tooltip>
  );
};

export default ColorItem;
