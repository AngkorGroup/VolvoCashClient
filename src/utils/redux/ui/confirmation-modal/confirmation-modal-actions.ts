import { CLOSE_CONFIRMATION_MODAL } from 'utils/redux/actions';

export interface CloseConfirmationModal {
  type: typeof CLOSE_CONFIRMATION_MODAL;
}

export function closeConfirmationModal(): CloseConfirmationModal {
  return {
    type: CLOSE_CONFIRMATION_MODAL,
  };
}
