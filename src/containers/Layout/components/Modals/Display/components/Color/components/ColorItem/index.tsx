import { ReactElement } from 'react';

import { useTheme, useBoolean, VStack, Box, Center, Text, ScaleFade } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import Card from '../../../../../../../../../components/Clickable/Card';
import Tooltip from '../../../../../../../../../components/Tooltip';
import { Theme } from '../../../../../../../../../theme/types';
import { ColorItemProps } from './types';

const ColorItem = (props: ColorItemProps): ReactElement => {
  const theme = useTheme<Theme>();

  const { label, value, background, isActive, onClick } = props;

  const [isMouseDown, setIsMouseDown] = useBoolean();
  const [isHovering, setIsHovering] = useBoolean();

  return (
    <Tooltip
      aria-label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      colorMode={background}
      isOpen={isHovering}
      isDisabled={isActive}
      label={isActive ? `Current color: ${label}` : `Set color to ${label}`}
      placement='top'
      shouldWrapChildren
      gutter={isMouseDown ? 8 : 11}
    >
      <Card
        color={isActive ? value : 'gray'}
        colorMode={background}
        isClickable
        onClick={!isActive && onClick ? () => onClick(value) : undefined}
        onMouseDown={() => setIsMouseDown.on()}
        onMouseUp={() => setIsMouseDown.off()}
        onMouseEnter={() => setIsHovering.on()}
        onMouseLeave={() => setIsHovering.off()}
        p={2}
      >
        <VStack width='100%' spacing={0.75}>
          <Box
            sx={{
              width: theme.fontSizes['6xl'],
              height: theme.fontSizes['6xl'],

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              backgroundColor: `${value}.400`,
              borderRadius: 'full'
            }}
          >
            <ScaleFade in={isActive} unmountOnExit>
              <Center>
                <CheckOutlinedIcon
                  style={{
                    fontSize: theme.fontSizes['4xl'],
                    color: theme.colors.gray[background === 'light' ? 50 : 900]
                  }}
                />
              </Center>
            </ScaleFade>
          </Box>
          <Text align='center' fontSize='sm' fontWeight='medium'>
            {label}
          </Text>
        </VStack>
      </Card>
    </Tooltip>
  );
};

export default ColorItem;
