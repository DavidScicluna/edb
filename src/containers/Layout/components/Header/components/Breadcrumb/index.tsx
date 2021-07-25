import React, { ReactElement, useState, useEffect } from 'react';

import {
  useTheme,
  useColorMode,
  Breadcrumb as CUIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  Text
} from '@chakra-ui/react';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import _ from 'lodash';
import { useLocation, useParams, Link } from 'react-router-dom';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import { Breadcrumb as BreadcrumbType } from '../../../../../../common/types/types';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';
import { Params } from './types';

const Breadcrumb = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme);

  const { id, mediaType } = useParams<Params>();
  const location = useLocation();

  const lists = useSelector((state) => state.user.data.lists);

  const [state, setstate] = useState<BreadcrumbType[]>([]);

  const breadcrumbs: any[] = [];

  useEffect(() => {
    setstate([]);

    if (location.pathname.includes('lists')) {
      if (id && mediaType) {
        const label =
          mediaType === 'movie'
            ? 'Movies'
            : mediaType === 'tv'
            ? 'TV Shows'
            : mediaType === 'person'
            ? 'People'
            : 'Media-Type';

        setstate([
          {
            label: lists.find((list) => list.id === id)?.label || 'List-Name',
            path: `/lists/${id}`
          },
          {
            label,
            path: `/lists/${id}/${mediaType}`
          }
        ]);
      } else if (id) {
        setstate([
          {
            label: lists.find((list) => list.id === id)?.label || 'List-Name',
            path: `/lists/${id}`
          }
        ]);
      }
    } else if (mediaType) {
      const label =
        mediaType === 'movie'
          ? 'Movies'
          : mediaType === 'tv'
          ? 'TV Shows'
          : mediaType === 'person'
          ? 'People'
          : 'Media-Type';

      setstate([
        {
          label,
          path: location.pathname.includes('trending')
            ? `/trending/${mediaType}`
            : location.pathname.includes('liked')
            ? `/liked/${mediaType}`
            : ''
        }
      ]);
    }
  }, [location]);

  return (
    <CUIBreadcrumb
      separator={
        <Icon
          as={ChevronRightOutlinedIcon}
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          sx={{ fontSize: `${theme.fontSizes.xl} !important` }}
        />
      }
      spacing={1}>
      {[...breadcrumbs, ...state].map((breadcrumb) => (
        <BreadcrumbItem
          key={breadcrumb.label}
          isCurrentPage={location.pathname === breadcrumb.path}
          fontSize={['xl']}
          sx={{ ...style.common.breadcrumbItem }}>
          {location.pathname === breadcrumb.path ? (
            <Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
              {breadcrumb.label}
            </Text>
          ) : (
            <BreadcrumbLink
              as={Link}
              to={breadcrumb.path}
              sx={{ ..._.merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}>
              {breadcrumb.label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </CUIBreadcrumb>
  );
};

export default Breadcrumb;
