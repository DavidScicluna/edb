import React, { ReactElement } from 'react';

import { useTheme, HStack, VStack, Text, Icon } from '@chakra-ui/react';
import {
  CheckBoxTwoTone as CheckBoxTwoToneIcon,
  CheckBoxOutlineBlankOutlined as CheckBoxOutlineBlankOutlinedIcon
} from '@material-ui/icons';
import moment from 'moment';

import useSelector from '../../../../../../../common/hooks/useSelectorTyped';
import utils from '../../../../../../../common/utils/utils';
import Card from '../../../../../../../components/Clickable/Card';
import { Theme } from '../../../../../../../theme/types';
import { ListProps } from './types';

const List = ({ id, label, description, date, results, isSelected = false, onClick }: ListProps): ReactElement => {
  const theme = useTheme<Theme>();

  const color = useSelector((state) => state.user.ui.theme.color);

  return (
    <Card
      color={isSelected ? utils.handleReturnColor(color) : 'gray'}
      isFullWidth
      onClick={() => onClick(id, isSelected)}
      px={2}
      py={1}>
      <HStack width='100%' justifyContent='space-between' spacing={2}>
        <VStack width='calc(100% - 46px)' alignItems='flex-start' spacing={0}>
          <Text align='left' fontSize='md' fontWeight='semibold' textTransform='capitalize'>
            {label}
          </Text>
          {description && description.length > 0 ? (
            <Text
              width='auto'
              maxWidth='100%'
              align='left'
              fontSize='xs'
              fontWeight='400'
              textTransform='capitalize'
              isTruncated>
              {description}
            </Text>
          ) : null}
          <Text align='left' fontSize='xs' fontWeight='400' textTransform='capitalize'>
            {`${
              results.movies.length + results.tv.length > 0
                ? `${results.movies.length + results.tv.length} items  • `
                : ''
            }${results.movies.length + results.tv.length > 0 ? 'Updated' : 'Created'} ${moment(date).fromNow()}`}
          </Text>
        </VStack>

        <Icon
          as={isSelected ? CheckBoxTwoToneIcon : CheckBoxOutlineBlankOutlinedIcon}
          sx={{ fontSize: `${theme.fontSizes['3xl']} !important` }}
        />
      </HStack>
    </Card>
  );
};

export default List;
