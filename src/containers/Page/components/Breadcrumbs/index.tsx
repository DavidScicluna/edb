import { ReactElement } from 'react';

import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';

import {
  useTheme,
  useColorMode,
  useBreakpointValue,
  Breadcrumb as CUIBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Icon
} from '@chakra-ui/react';
import _ from 'lodash';

import Link from '../../../../components/Clickable/Link';
import SkeletonText from '../../../../components/Skeleton/Text';
import { Theme } from '../../../../theme/types';
import useStyles from './styles';
import { BreadcrumbsProps } from './types';

const Breadcrumbs = (props: BreadcrumbsProps): ReactElement => {
  const theme = useTheme<Theme>();
  const { colorMode } = useColorMode();

  const iconFontSize = useBreakpointValue({
    'base': theme.fontSizes.md,
    'sm': theme.fontSizes.md,
    'md': theme.fontSizes.lg,
    'lg': theme.fontSizes.lg,
    'xl': theme.fontSizes.lg,
    '2xl': theme.fontSizes.lg
  });

  const style = useStyles(theme);

  const { breadcrumbs } = props;

  return (
    <CUIBreadcrumb
      separator={
        <Icon
          as={ChevronRightOutlinedIcon}
          color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          sx={{ fontSize: `${iconFontSize} !important` }}
        />
      }
      spacing={1}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          key={breadcrumb.label}
          isCurrentPage={index === breadcrumbs.length - 1}
          fontSize={['sm', 'sm', 'md', 'md', 'md', 'md']}
          sx={{ ...style.common.breadcrumbItem }}
        >
          <SkeletonText offsetY={8} isLoaded={!breadcrumb.isLoading}>
            {index === breadcrumbs.length - 1 ? (
              <Text align='left' sx={{ ...style[colorMode].breadcrumbActive }}>
                {breadcrumb.label || ''}
              </Text>
            ) : (
              <BreadcrumbLink
                as={Link}
                to={{ ...breadcrumb.to }}
                sx={{ ..._.merge(style.common.breadcrumbLink, style[colorMode].breadcrumbLink) }}
              >
                {breadcrumb.label || ''}
              </BreadcrumbLink>
            )}
          </SkeletonText>
        </BreadcrumbItem>
      ))}
    </CUIBreadcrumb>
  );
};

export default Breadcrumbs;
