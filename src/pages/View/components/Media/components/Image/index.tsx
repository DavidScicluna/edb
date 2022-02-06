import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import ClickableImage from '../../../../../../components/Clickable/Image';
import Image from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { MediaImageProps } from './types';

const width = ['185px', '205px', '230px'];

const MediaImage = (props: MediaImageProps): ReactElement => {
  const { alt = '', boringType, path, srcSize, isLoading = true, onClick } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      width={width}
      ratio={1 / 1}
      borderRadius='lg'
      isDisabled={isLoading || isError || _.isNil(path) || _.isEmpty(path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClick}
    >
      <Skeleton borderRadius='lg' isLoaded={!isLoading}>
        <Image
          width='100%'
          alt={alt}
          borderRadius='lg'
          boringType={boringType}
          onLoad={() => setIsError.off()}
          onError={() => setIsError.on()}
          thumbnailSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[0]}${path}`}
          fullSrc={`${process.env.REACT_APP_IMAGE_URL}/${srcSize[1]}${path}`}
        />
      </Skeleton>
    </ClickableImage>
  );
};

export default MediaImage;
