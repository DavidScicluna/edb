import React, { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import ClickableImage from '../../../../../../../../../../components/Clickable/Image';
import Image from '../../../../../../../../../../components/Image';
import Skeleton from '../../../../../../../../../../components/Skeleton';
import { PhotoProps } from './types';

const width = ['185px', '205px', '230px'];

const Photo = (props: PhotoProps): ReactElement => {
  const { name, file_path, isLoading = true, onClickImage } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      width={width}
      borderRadius='lg'
      isDisabled={isLoading || isError || _.isNil(file_path) || _.isEmpty(file_path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClickImage ? () => onClickImage(file_path || '') : undefined}
    >
      <Skeleton isLoaded={!isLoading} borderRadius='lg'>
        <Image
          alt={`${name ? `"${name}"` : ''} image`}
          borderRadius='lg'
          boringType='beam'
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
