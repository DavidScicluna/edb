import { ReactElement } from 'react';

import { ShowProps } from './types';

import Panel from '../../../../../../../../components/Panel';
import HorizontalTVShowPoster from '../../../../../../../TV/components/Poster/Horizontal';

const Show = ({ show, isLoading = true }: ShowProps): ReactElement => {
  return (
    <Panel isFullWidth>
      {{
        header: {
          title: `${show?.name ? show.name : 'TV Show Name'} Episode`
        },
        body: <HorizontalTVShowPoster key={show?.id} show={show} isLoading={isLoading} />
      }}
    </Panel>
  );
};

export default Show;
