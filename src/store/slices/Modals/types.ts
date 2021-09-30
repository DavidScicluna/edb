import { MediaType } from '../../../common/types/types';
import { ButtonProps } from '../../../components/Clickable/Button/types';
import { GetMediaType } from '../User/types';

export interface ListModal {
  open: boolean;
  title: string;
  mediaType: MediaType;
  mediaItem?: GetMediaType<this['mediaType']>;
}

export type DescriptionModal = {
  open: boolean;
  mediaType: MediaType;
  mediaItem?: { id: number; title: string; description: string };
};

export type ConfirmModal = {
  open: boolean;
  title: string;
  description: string;
  stringifiedButtonProps?: string;
};

export type QuickViewModal = {
  open: boolean;
  mediaType: MediaType;
  mediaItem?: { id: number; title: string };
};

export type StateProps = {
  ui: {
    listsModal: ListModal;
    descriptionModal: DescriptionModal;
    confirmModal: ConfirmModal;
    quickViewModal: QuickViewModal;
    isDisplayModalOpen: boolean;
    isSplashscreenOpen: boolean;
  };
};
