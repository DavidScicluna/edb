import { ReactElement } from 'react';

import { useBoolean } from '@chakra-ui/react';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import _ from 'lodash';

import { handleReturnBoringTypeByMediaType } from '../../../../../../common/utils';
import ClickableImage from '../../../../../../components/Clickable/Image';
import ImageC from '../../../../../../components/Image';
import Skeleton from '../../../../../../components/Skeleton';
import { AssetImageProps } from './types';

const AssetImage = (props: AssetImageProps): ReactElement => {
  const { alt, aspect_ratio, file_path, srcSize, isLoading = true, onClickImage } = props;

  const [isError, setIsError] = useBoolean();

  return (
    <ClickableImage
      width='100%'
      ratio={aspect_ratio}
      borderRadius='lg'
      isDisabled={isLoading || isError || _.isNil(file_path) || _.isEmpty(file_path)}
      renderIcon={({ color, fontSize }) => <SearchOutlinedIcon style={{ color, fontSize }} />}
      onClick={onClickImage ? () => onClickImage(file_path || '') : undefined}
    >
      <Skeleton borderRadius='lg' isLoaded={!isLoading}>
        <ImageC
          alt={`${alt ? `"${alt}"` : ''} image`}
          borderRadius='lg'
          boringType={handleReturnBoringTypeByMediaType('collection')}
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
