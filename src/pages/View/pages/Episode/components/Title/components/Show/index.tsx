import { ReactElement } from 'react';

import _ from 'lodash';

import { useSelector } from '../../../../../../../../common/hooks';
import Badge from '../../../../../../../../components/Badge';
import { ShowProps } from './types';

const Show = (props: ShowProps): ReactElement => {
  const color = useSelector((state) => state.user.ui.theme.color);

  const { name, season, episode, fontSize, isLoading = true } = props;

  return (
    <Badge color={color} size={fontSize} isLoading={isLoading} variant='outlined'>
      {_.compact([name, season ? `S${season}` : undefined, episode ? `E${episode}` : undefined]).join(' • ')}
    </Badge>
  );
};

export default Show;
