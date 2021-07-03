import React, { ReactElement } from 'react';

import { useTheme, useColorMode, Tag, TagLeftIcon, TagLabel, ScaleFade } from '@chakra-ui/react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import _ from 'lodash';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { GenreProps } from './types';

const Genre = ({ id, name, isActive = false, onClick }: GenreProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const color = useSelector((state) => state.user.ui.theme.color);

  const style = useStyles(theme, color, isActive);

  return (
    <Tag
      onClick={() => onClick({ id, name }, isActive)}
      px={1.5}
      py={0.75}
      sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <ScaleFade in={isActive} unmountOnExit>
        <TagLeftIcon as={CheckOutlinedIcon} />
      </ScaleFade>
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
};

export default Genre;
