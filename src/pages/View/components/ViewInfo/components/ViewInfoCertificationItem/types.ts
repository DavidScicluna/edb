import { Certification, MediaType } from '../../../../../../common/types';

export type ViewInfoCertificationItemMediaType = Exclude<MediaType, 'person' | 'company' | 'collection'>;

export type ViewInfoCertificationItemProps = Pick<Certification, 'certification' | 'meaning'> & {
	mediaType: ViewInfoCertificationItemMediaType;
};
