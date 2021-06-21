import React, { ReactElement, useState } from 'react';

import { useTheme, useColorMode, HStack, ListItem, Badge, Text, Kbd, ScaleFade } from '@chakra-ui/react';
import { ClearOutlined as ClearOutlinedIcon } from '@material-ui/icons/';
import _ from 'lodash';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useSelector from '../../../../common/hooks/useSelectorTyped';
import utils from '../../../../common/utils/utils';
import { setRecentSearches } from '../../../../store/slices/User';
import { Theme } from '../../../../theme/types';
import IconButton from '../../../Inputs/IconButton';
import SkeletonText from '../../../Skeleton/Text';
import Tooltip from '../../../Tooltip';
import useStyles from './styles';
import { RowProps } from './types';

const dummyTextWidths = utils.handleReturnDummyWidths(100, 10);

const Row = (props: RowProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const history = useHistory();

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const { id, label, mediaType, state = 'default', type = 'default', onSearch } = props;

  const style = useStyles(theme, type);

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState<boolean>(false);

  const handleSearch = (): void => {
    if (type === 'isKeyword' && onSearch) {
      onSearch(label);
    } else {
      const search = { query: label, page: 1, mediaType };

      history.push({
        pathname: history.location.pathname,
        search: queryString.stringify(_.omit(search, 'page'))
      });
    }
  };

  const handleDelete = (): void => {
    if (id) {
      dispatch(setRecentSearches(recentSearches.filter((search) => search.id !== id)));
    }
  };

  return (
    <ListItem
      px={2}
      py={type === 'isKeyword' ? 1.25 : 0.25}
      onClick={!isHoveringDelete && state !== 'isLoading' ? () => handleSearch() : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <SkeletonText
        width={
          state === 'isLoading' ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : 'auto'
        }
        isLoaded={state === 'isLoaded'}>
        <HStack spacing={1}>
          {mediaType ? (
            <Badge colorScheme={mediaType === 'movie' ? 'teal' : mediaType === 'tv' ? 'cyan' : 'purple'}>
              {mediaType}
            </Badge>
          ) : null}
          <Text align='left' fontSize='md'>
            {label}
          </Text>
        </HStack>
      </SkeletonText>

      <HStack spacing={1}>
        <ScaleFade in={state === 'isFocused'} unmountOnExit>
          <span>
            To select<Kbd>enter</Kbd>
          </span>
        </ScaleFade>
        {type !== 'isKeyword' ? (
          <ScaleFade in={isHovering}>
            <Tooltip label={`Remove "${label}"`} placement='top'>
              <IconButton
                aria-label='Remove search'
                icon={ClearOutlinedIcon}
                onClick={() => handleDelete()}
                onMouseEnter={() => setIsHoveringDelete(true)}
                onMouseLeave={() => setIsHoveringDelete(false)}
                size='xs'
                variant='icon'
              />
            </Tooltip>
          </ScaleFade>
        ) : null}
      </HStack>
    </ListItem>
  );
};

export default Row;
