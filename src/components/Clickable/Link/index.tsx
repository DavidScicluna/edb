import { ReactElement } from 'react';
import { Link as RRDLink } from 'react-router-dom';

import { Link as CUILink, useTheme } from '@chakra-ui/react';

import _ from 'lodash';

import useStyles from './styles';
import { LinkProps } from './types';

import { Theme } from '../../../theme/types';

const Link = (props: LinkProps): ReactElement => {
	const theme = useTheme<Theme>();

	const { children, isDisabled = false, isFullWidth = false, sx, ...rest } = props;

	const style = useStyles(theme, isFullWidth);

	return (
		<CUILink
			{...rest}
			as={RRDLink}
			onClick={isDisabled ? (event) => event.preventDefault() : undefined}
			sx={{ ..._.merge(style, sx || {}) }}
		>
			{children}
		</CUILink>
	);
};

export default Link;
