import React, { ReactElement } from 'react';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import IconButton from '../../../../../../components/Inputs/IconButton';

const Search = (): ReactElement => {
  return <IconButton aria-label='Open Search' icon={SearchOutlinedIcon} variant='icon' />;
};

export default Search;
