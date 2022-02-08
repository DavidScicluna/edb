import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import ClickableImage from '../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../components/Skeleton';
import { AssetImageProps } from './types';

const AssetImage = (props: AssetImageProps): ReactElement => {
  const { name, file_path, srcSize, isLoading = true, onClickImage } = props;

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
          boringType='marble'
          onLoad={() => setIsError.off()}
          onError={() => setIsError.on()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${file_path || ''}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${file_path || ''}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default AssetImage;
