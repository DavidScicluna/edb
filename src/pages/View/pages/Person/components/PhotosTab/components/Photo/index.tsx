import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { handleReturnBoringTypeByMediaType } from '../../../../../../../../common/utils';
import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';
import { PhotoProps } from './types';

const Photo = (props: PhotoProps): ReactElement => {
  const { name, file_path, isLoading = true, onClickImage } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      ratio={1 / 1}
      borderRadius='lg'
      isDisabled={isLoading || isError || _.isNil(file_path) || _.isEmpty(file_path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClickImage ? () => onClickImage(file_path || '') : undefined}
    >
      <Skeleton isLoaded={!isLoading} borderRadius='lg'>
        <Image
          width='100%'
          alt={`${name ? `"${name}"` : ''} image`}
          borderRadius='lg'
          boringType={handleReturnBoringTypeByMediaType('person')}
          onLoad={() => setIsError.off()}
          onError={() => setIsError.on()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/w45${file_path || ''}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/original${file_path || ''}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default Photo;
