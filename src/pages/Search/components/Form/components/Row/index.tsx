import { ReactElement } from 'react';

import { useTheme, useColorMode, useBoolean, VStack, Center, ListItem, Text, ScaleFade } from '@chakra-ui/react';
import _ from 'lodash';
import { X as XIcon } from 'react-feather';
import { useDispatch } from 'react-redux';

import { useSelector } from '../../../../../../common/hooks';
import { handleReturnDummyWidths } from '../../../../../../common/utils';
import Badge from '../../../../../../components/Badge';
import IconButton from '../../../../../../components/Clickable/IconButton';
import SkeletonText from '../../../../../../components/Skeleton/Text';
import Tooltip from '../../../../../../components/Tooltip';
import { setRecentSearches } from '../../../../../../store/slices/User';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { RowProps } from './types';

const dummyTextWidths = handleReturnDummyWidths(100, 10);

const Row = (props: RowProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.user.data.recentSearches);

  const { id, title, subtitle, mediaType, state = 'default', type = 'default', onSearch } = props;

  const style = useStyles(theme, type);

  const [isHoveringRow, setIsHoveringRow] = useBoolean();
  const [isHoveringDelete, setIsHoveringDelete] = useBoolean();

  const handleDelete = (): void => {
    if (id) {
      dispatch(setRecentSearches(recentSearches.filter((search) => search.id !== id)));
    }
  };

  return (
    <ListItem
      px={2}
      py={type === 'isKeyword' ? 1.25 : 1}
      onClick={!isHoveringDelete && state !== 'isLoading' && onSearch ? () => onSearch(title) : undefined}
      onMouseEnter={state !== 'isLoading' ? () => setIsHoveringRow.on() : undefined}
      onMouseLeave={state !== 'isLoading' ? () => setIsHoveringRow.off() : undefined}
      sx={{ ..._.merge(style.common, style[colorMode]) }}>
      <SkeletonText
        width={
          state === 'isLoading' ? `${dummyTextWidths[Math.floor(Math.random() * dummyTextWidths.length)]}%` : 'auto'
        }
        height={state === 'isLoading' ? '22px' : 'auto'}
        offsetY='11px'
        isLoaded={state === 'isLoaded'}>
        <VStack alignItems='flex-start' spacing={0}>
          <Center>
            <Text align='left' fontSize='md'>
              {title}
            </Text>
            {mediaType ? (
              <Badge color={mediaType === 'movie' ? 'teal' : mediaType === 'tv' ? 'cyan' : 'purple'} ml={1}>
                {mediaType}
              </Badge>
            ) : null}
          </Center>
          {type === 'default' && subtitle ? (
            <Text align='left' color={colorMode === 'light' ? 'gray.400' : 'gray.500'} fontSize='xs'>
              {subtitle}
            </Text>
          ) : null}
        </VStack>
      </SkeletonText>

      {type !== 'isKeyword' ? (
        <ScaleFade in={isHoveringRow}>
          <Tooltip aria-label='Remove search' label={`Remove "${title}"`} isOpen={isHoveringDelete} placement='top'>
            <IconButton
              aria-label='Remove search'
              icon={XIcon}
              onClick={() => handleDelete()}
              onMouseEnter={state !== 'isLoading' ? () => setIsHoveringDelete.on() : undefined}
              onMouseLeave={state !== 'isLoading' ? () => setIsHoveringDelete.off() : undefined}
              size='sm'
              variant='icon'
            />
          </Tooltip>
        </ScaleFade>
      ) : null}
    </ListItem>
  );
};

export default Row;
