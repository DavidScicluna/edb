import { ReactElement } from 'react';

import { MediaType } from '../../../common/types/types';
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
  submitButton?: ReactElement;
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
