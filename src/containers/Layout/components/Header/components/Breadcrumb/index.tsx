import React, { ReactElement } from 'react';

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

import { Breadcrumb as BreadcrumbType } from '../../../../../../common/types/types';
import { Theme } from '../../../../../../theme/types';
import useStyles from './styles';

const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: BreadcrumbType[] }): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();
  const style = useStyles(theme);

  const params = useParams();
  const location = useLocation();

  console.log(params);

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
      {breadcrumbs.map((breadcrumb) => (
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
