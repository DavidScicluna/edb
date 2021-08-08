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
import { useLocation, useParams, Link, useHistory } from 'react-router-dom';

import useSelector from '../../../../../../common/hooks/useSelectorTyped';
import { Theme } from '../../../../../../theme/types';
import breadcrumbs, { Breadcrumb as BreadcrumbType } from '../../../../common/data/breadcrumbs';
import useStyles from './styles';
import { Params } from './types';

const Breadcrumb = (): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme);

  const { id, mediaType } = useParams<Params>();
  const location = useLocation();
  const history = useHistory();

  const lists = useSelector((state) => state.user.data.lists);

  // const [state, setstate] = useState<BreadcrumbType[]>([]);

  const handleCheckBreadcrumb = (): boolean => {
    const splitLocation = location.pathname.split('/');

    // console.log(splitLocation);

    return false;
  };

  const handleGenericBreadcrumbLabel = (): string => {
    return '';
  };

  const handleReturnBreadcrumbs = (): string[] => {
    if (breadcrumbs[location.pathname]) {
      return breadcrumbs[location.pathname].consistsOf;
    } else {
      const splitLocation = location.pathname.split('/').filter((item) => item);
      const breadcrumb = breadcrumbs[`/${splitLocation[0]}`];
      // console.log(breadcrumb);

      return [];
    }
  };

  handleReturnBreadcrumbs();

  // useEffect(() => {
  //   setstate([]);

  //   if (location.pathname.includes('lists')) {
  //     if (id && mediaType) {
  //       const label =
  //         mediaType === 'movie'
  //           ? 'Movies'
  //           : mediaType === 'tv'
  //           ? 'TV Shows'
  //           : mediaType === 'person'
  //           ? 'People'
  //           : 'Media-Type';

  //       setstate([
  //         {
  //           label: lists.find((list) => list.id === id)?.label || 'List-Name',
  //           path: `/lists/${id}`
  //         },
  //         {
  //           label,
  //           path: `/lists/${id}/${mediaType}`
  //         }
  //       ]);
  //     } else if (id) {
  //       setstate([
  //         {
  //           label: lists.find((list) => list.id === id)?.label || 'List-Name',
  //           path: `/lists/${id}`
  //         }
  //       ]);
  //     }
  //   } else if (mediaType) {
  //     const label =
  //       mediaType === 'movie'
  //         ? 'Movies'
  //         : mediaType === 'tv'
  //         ? 'TV Shows'
  //         : mediaType === 'person'
  //         ? 'People'
  //         : 'Media-Type';

  //     setstate([
  //       {
  //         label,
  //         path: location.pathname.includes('trending')
  //           ? `/trending/${mediaType}`
  //           : location.pathname.includes('liked')
  //           ? `/liked/${mediaType}`
  //           : ''
  //       }
  //     ]);
  //   }
  // }, [location]);

  // console.log(history);

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
      {/* {[...(breadcrumbs[location.pathname]?.consistsOf || [])].map((breadcrumb: string) => (
        <BreadcrumbItem
          key={breadcrumb}
          isCurrentPage={breadcrumb.includes(':') ? handleCheckBreadcrumb() : location.pathname === breadcrumb}
          fontSize={['xl']}
          sx={{ ...style.common.breadcrumbItem }}>
          {(breadcrumb.includes(':') ? handleCheckBreadcrumb() : location.pathname === breadcrumb) ? (
            <Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
              {(breadcrumb.includes(':') ? handleGenericBreadcrumbLabel() : breadcrumbs[breadcrumb].label) || ''}
            </Text>
          ) : (
            <BreadcrumbLink
              as={Link}
              to={breadcrumb}
              sx={{ ..._.merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}>
              {breadcrumbs[breadcrumb].label || ''}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))} */}
      <h1>Hello</h1>
    </CUIBreadcrumb>
  );
};

export default Breadcrumb;
