import { ReactElement } from 'react';

import _ from 'lodash';

import Panel from '../../../../../../../../components/Panel';
import HorizontalCollectionPoster from '../../../../../../../Search/components/All/components/Collections/components/Poster/Horizontal';
import { CollectionProps } from './types';

const Collection = ({ collection }: CollectionProps): ReactElement => {
  const handleReturnFormattedTitle = (name: string): string => {
    return _.compact(name.toLowerCase().replace('collection', '').split(' ')).join(' ');
  };

  return (
    <Panel isFullWidth>
      {{
        header: {
          title: `Part of the ${
            collection?.name
              ? `"${_.capitalize(handleReturnFormattedTitle(collection.name))}" Collection`
              : 'Collection'
          }`
        },
        body: <HorizontalCollectionPoster collection={collection} isLoading={false} />
      }}
    </Panel>
  );
};

export default Collection;
